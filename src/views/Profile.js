import React from 'react'
import firebase from 'firebase'
import { View, Text } from 'react-native'
export default class DetailsScreen extends React.Component {
  constructor() {
    super()
    this.state = {
      user: firebase.auth().currentUser
    }
  }
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>{this.state.user.email}</Text>
        <Text>{this.state.user.uid}</Text>
      </View>
    )
  }
}
