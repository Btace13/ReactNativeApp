import React, { Component } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import { Header, Item, Input, Icon, Button, Toast } from 'native-base'

export default class Home extends Component {
  componentDidMount() {
    Toast.show({
      text: 'Welcome!',
      type: 'success',
      position: 'bottom',
      duration: 2500
    })
  }
  render() {
    return (
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.container}
          region={{
            latitude: 29.420694,
            longitude: -98.483756,
            latitudeDelta: 0.005,
            longitudeDelta: 0.0021
          }}
          mapType={'standard'}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%'
  }
})
