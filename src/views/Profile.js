import React from 'react'
import firebase from 'firebase'
import { View } from 'react-native'
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
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>User Email: {this.state.user.email}</Text>
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
