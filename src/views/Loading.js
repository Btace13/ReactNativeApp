// Loading.js
import React from 'react'
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'
import firebase from 'firebase'

export default class Loading extends React.Component {
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.props.navigation.navigate(user ? 'Main' : 'AuthStack')
    })
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={{ marginBottom: 20 }}>Loading</Text>
        <ActivityIndicator size="large" />
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
