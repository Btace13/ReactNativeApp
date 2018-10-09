import React from 'react'
import { View } from 'react-native'
import { Text } from 'native-base'
export default class DetailsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Events</Text>
      </View>
    )
  }
}
