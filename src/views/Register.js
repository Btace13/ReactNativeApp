import React from 'react'
import { View, Image, StyleSheet, ImageBackground } from 'react-native'
import Hr from 'react-native-hr-component'
import { Item, Input, Icon, Button, Text } from 'native-base'

class Register extends React.Component {
  render() {
    return (
      <ImageBackground
        source={require('../assets/register_back.png')}
        style={{ width: '100%', height: '100%' }}
      >
        <View style={styles.container}>
          <Image
            style={{ width: 100, height: 100, marginBottom: 25 }}
            source={require('../assets/GOSA.png')}
          />
          <View style={styles.inputContainer}>
            <Text style={styles.mainText}>Register</Text>
            <Item style={{ marginBottom: 10 }}>
              <Icon style={{ color: '#777777' }} active name="mail" />
              <Input placeholder="Email" />
            </Item>
            <Item>
              <Icon style={{ color: '#777777' }} active name="lock" />
              <Input secureTextEntry={true} placeholder="Password" />
            </Item>
            <Item>
              <Icon style={{ color: '#777777' }} active name="lock" />
              <Input secureTextEntry={true} placeholder="Confirm Password" />
            </Item>
            <Button
              onPress={() => this.props.navigation.navigate('Details')}
              block
              small
              danger
              style={{ marginTop: 30 }}
            >
              <Text>Sign Up</Text>
            </Button>
          </View>
          <Text style={styles.smallText}>
            Already have an account?{' '}
            <Text
              onPress={() => this.props.navigation.navigate('Login')}
              style={styles.smallTextLink}
            >
              Sign In.
            </Text>
          </Text>
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
  lineText: {
    color: '#ffffff'
  },
  socialButtons: {
    width: '70%',
    marginTop: 20
  }
})

export default Register
