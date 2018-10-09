'use strict';

import React, { Component } from 'react';

import {StyleSheet} from 'react-native';

import {
  ViroARScene,
  ViroCamera,
  ViroText
} from 'react-viro';

export default class ARScreen extends React.Component {
    render() {
      return (
        <ViroARScene onTrackingUpdated={this._trackingUpdated}>
            <ViroText text="Hello!" position={[-1, 0, -1]} />
        </ViroARScene>
      )
    }
}