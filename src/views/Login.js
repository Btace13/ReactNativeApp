import React from 'react'
import {
  View,
  Image,
  StyleSheet,
  ImageBackground,
  Dimensions
} from 'react-native'
import Hr from 'react-native-hr-component'
import { Item, Input, Icon, Button, Text } from 'native-base'
import firebase from 'firebase'
import validate from '../utils/validate'
import { LoginManager, AccessToken } from 'react-native-fbsdk'

class Login extends React.Component {
  constructor() {
    super()
    this.state = {
      errorMessage: '',
      viewMode:
        Dimensions.get('window').height > 500 ? 'portrait' : 'landscape',
      authMode: 'login',
      controls: {
        email: {
          value: '',
          valid: false,
          validationRules: {
            isEmail: true
          },
          touched: false
        },
        password: {
          value: '',
          valid: false,
          validationRules: {
            minLength: 6
          },
          touched: false
        },
        confirmPassword: {
          value: '',
          valid: false,
          validationRules: {
            equalTo: 'password'
          },
          touched: false
        }
      }
    }
    // LISTENING TO A CHANGE IN DIMENSTIONS OF THE SCREEN
    Dimensions.addEventListener('change', this.updateStyles)
  }
  // REMOVING STYLE CHANGE TRIGGER WHEN APP STARTS UP
  componentWillUnmount() {
    Dimensions.removeEventListener('change', this.updateStyles)
  }
  // UPDATE STYLES FUNCTION
  updateStyles = dims => {
    this.setState({
      viewMode: dims.window.height > 500 ? 'portrait' : 'landscape'
    })
  }
  // SIGN UP HANDALER FOR EMAIL AND PASSWORD
  handleSignUp = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(
        this.state.controls.email.value,
        this.state.controls.password.value
      )
      .then(() => {
        this.props.navigation.navigate('Main')
      })
      .catch(error => this.setState({ errorMessage: error.message }))
  }
  // LOGIN HANDALER FOR EMAIL AND PASSWORD
  handleLogin = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(
        this.state.controls.email.value,
        this.state.controls.password.value
      )
      .then(() => {
        this.props.navigation.navigate('Main')
      })
      .catch(error => this.setState({ errorMessage: error.message }))
  }
  // UPDATING THE STATE WITH USER IMPUT LOGIC
  updateInputState = (key, value) => {
    let connectedValue = {}
    if (this.state.controls[key].validationRules.equalTo) {
      const equalControl = this.state.controls[key].validationRules.equalTo
      const equalValue = this.state.controls[equalControl].value
      connectedValue = {
        ...connectedValue,
        equalTo: equalValue
      }
    }
    if (key === 'password') {
      connectedValue = {
        ...connectedValue,
        equalTo: value
      }
    }
    this.setState(prevState => {
      return {
        controls: {
          ...prevState.controls,
          confirmPassword: {
            ...prevState.controls.confirmPassword,
            valid:
              key === 'password'
                ? validate(
                    prevState.controls.confirmPassword.value,
                    prevState.controls.confirmPassword.validationRules,
                    connectedValue
                  )
                : prevState.controls.confirmPassword.valid
          },
          [key]: {
            ...prevState.controls[key],
            value: value,
            valid: validate(
              value,
              prevState.controls[key].validationRules,
              connectedValue
            )
          }
        }
      }
    })
  }

  // LOGIC TO SWITCHING BETWEEN AUTH MODES
  switchAuthModeHandler = () => {
    this.setState(prevState => {
      return {
        authMode: prevState.authMode === 'login' ? 'signup' : 'login'
      }
    })
  }
  // CREATES A USER USING THE FACEBOOK SDK AND CHANGES THE AUTH STATE OF FIREBASE
  onLoginFacebook = () => {
    LoginManager.logInWithReadPermissions(['public_profile', 'email'])
      .then(result => {
        if (result.isCancelled) {
          return Promise.reject(new Error('The user cancelled the request'))
        }
        console.log(
          `Login success with permissions: ${result.grantedPermissions.toString()}`
        )
        // get the access token
        return AccessToken.getCurrentAccessToken()
      })
      .then(data => {
        const credential = firebase.auth.FacebookAuthProvider.credential(
          data.accessToken
        )
        return firebase.auth().signInWithCredential(credential)
      })
      .then(currentUser => {
        console.log(
          `Facebook Login with user : ${JSON.stringify(currentUser.toJSON())}`
        )
      })
      .catch(error => {
        console.log(`Facebook login fail with error: ${error}`)
      })
  }
  render() {
    return (
      <ImageBackground
        source={require('../assets/register_back.png')}
        style={{ width: '100%', height: '100%' }}
      >
        <View style={styles.container}>
          <Image
            style={{ width: 100, height: 100, marginBottom: 10 }}
            source={require('../assets/GOSA.png')}
          />
          <View style={styles.inputContainer}>
            <Text style={styles.mainText}>
              {this.state.authMode.toUpperCase()}
            </Text>
            <Item style={{ marginBottom: 10 }}>
              <Icon style={{ color: '#777777' }} active name="mail" />
              <Input
                placeholder="Email"
                valid={this.state.controls.email.valid}
                touched={this.state.controls.email.touched}
                autoCorrect={false}
                keyboardType={'email-address'}
                onChangeText={val => this.updateInputState('email', val)}
                value={this.state.controls.email.value}
              />
            </Item>
            <Item style={{ marginBottom: 10 }}>
              <Icon style={{ color: '#777777' }} active name="lock" />
              <Input
                secureTextEntry={true}
                placeholder="Password"
                onChangeText={val => this.updateInputState('password', val)}
                value={this.state.controls.password.value}
                valid={this.state.controls.password.valid}
                touched={this.state.controls.password.touched}
              />
            </Item>
            {this.state.authMode === 'signup' ? (
              <Item>
                <Icon style={{ color: '#777777' }} active name="lock" />
                <Input
                  secureTextEntry={true}
                  placeholder="Confirm Password"
                  onChangeText={val =>
                    this.updateInputState('confirmPassword', val)
                  }
                  value={this.state.controls.confirmPassword.value}
                  valid={this.state.controls.confirmPassword.valid}
                  touched={this.state.controls.confirmPassword.touched}
                />
              </Item>
            ) : null}
            {this.state.errorMessage ? (
              <Text style={{ color: 'red', textAlign: 'center', marginTop: 5 }}>
                {this.state.errorMessage}
              </Text>
            ) : null}
            <Button
              onPress={
                this.state.authMode === 'login'
                  ? this.handleLogin
                  : this.handleSignUp
              }
              block
              small
              danger
              disabled={
                !this.state.controls.email.valid ||
                !this.state.controls.password.valid
              }
              style={{ marginTop: 20 }}
            >
              <Text>Sign In</Text>
            </Button>
          </View>
          {this.state.authMode === 'login' ? (
            <Text style={styles.smallText}>
              Don't have an account?{' '}
              <Text
                onPress={() => this.switchAuthModeHandler()}
                style={styles.smallTextLink}
              >
                Sign Up.
              </Text>
            </Text>
          ) : (
            <Text style={styles.smallText}>
              Already have an account?{' '}
              <Text
                onPress={() => this.switchAuthModeHandler()}
                style={styles.smallTextLink}
              >
                Sign In.
              </Text>
            </Text>
          )}
          <Hr
            lineColor="#eee"
            width={1}
            text="or"
            textStyles={{ color: '#ffffff' }}
            textPadding={18}
            hrPadding={40}
            hrStyles={{ marginTop: 20 }}
          />
          <View style={styles.socialButtons}>
            <Button iconLeft block onPress={this.onLoginFacebook}>
              <Icon name="logo-facebook" />
              <Text>Login with Facebook</Text>
            </Button>
            <Button iconLeft style={{ marginTop: 10 }} block danger>
              <Icon name="logo-google" />
              <Text>Sign in with Google+</Text>
            </Button>
          </View>
        </View>
      </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  inputContainer: {
    width: '75%',
    borderRadius: 20,
    backgroundColor: '#ffffff',
    padding: 30
  },
  mainText: {
    textAlign: 'center',
    color: '#aa4849',
    fontWeight: 'bold',
    fontSize: 25,
    marginBottom: 10
  },
  smallText: {
    color: 'rgba(255,255,255,.9)',
    fontSize: 15,
    marginTop: 8
  },
  smallTextLink: {
    color: 'rgba(255,255,255,1)',
    fontSize: 15,
    marginTop: 10,
    fontWeight: 'bold'
  },
  socialButtons: {
    width: '70%',
    marginTop: 20
  }
})

export default Login
