import React from 'react'
import firebase from 'firebase'
import { View, Image } from 'react-native'
import { Button, Text } from 'native-base'
import { LoginManager } from 'react-native-fbsdk'

export default class DetailsScreen extends React.Component {
  constructor() {
    super()
    this.state = {
      user: firebase.auth().currentUser
    }
  }
  handleSignOut = () => {
    firebase
      .auth()
      .signOut()
      .then(
        function() {
          // Sign-out successful.
          console.log('signed out')
        },
        function(error) {
          // An error happened.
          alert(error)
        }
      )
    LoginManager.logOut()
  }
  componentDidMount() {
    const test = firebase.firestore().collection('users')
    console.log(test)
  }
  render() {
    // this.props.navigation.openDrawer()
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {this.state.user.photoURL ? (
          <Image
            style={{ width: 40, height: 40 }}
            source={{ uri: this.state.user.photoURL }}
          />
        ) : (
          <Image
            style={{ width: 40, height: 40 }}
            source={{
              uri: 'http://simpleicon.com/wp-content/uploads/user1.png'
            }}
          />
        )}
        <Text>
          Name:{' '}
          {this.state.user.displayName
            ? this.state.user.displayName
            : 'Not set'}
        </Text>
        <Text>Email: {this.state.user.email}</Text>
        <Text>Unique ID: {this.state.user.uid}</Text>
        <Button
          full
          danger
          style={{ marginTop: 40 }}
          onPress={this.handleSignOut}
        >
          <Text>Sign Out</Text>
        </Button>
      </View>
    )
  }
}
