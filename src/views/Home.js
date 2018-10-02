import React, { Component } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import { Header, Item, Input, Icon, Button } from 'native-base'

export default class Home extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Header searchBar rounded>
          <Item>
            <Icon name="ios-search" />
            <Input placeholder="Search" />
          </Item>
          <Button transparent>
            <Text>Search</Text>
          </Button>
        </Header>
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
