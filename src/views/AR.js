import React from 'react'
import { View } from 'react-native'
import { Button, Text } from 'native-base'

import {
    ViroARSceneNavigator
} from 'react-viro'

import initialScene from '../ARScenes/ARScene'

export default class ARScreen extends React.Component {
  render() {
    return (
      <ViroARSceneNavigator apiKey="EECA36F1-4F2C-4518-BE74-09D48BADB30F"
        initialScene = {{scene: initialScene}}
      />
    )
  }
}
