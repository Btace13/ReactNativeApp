import React, { Component } from 'react'
import Router from './src/router/Router'
import firebase from 'firebase'

// Initialize Firebase
var config = {
  apiKey: 'AIzaSyAQ2rPa_zq9blb7gT3aG6lMwZCUDyI5dP8',
  authDomain: 'reactnativeproject-e4359.firebaseapp.com',
  databaseURL: 'https://reactnativeproject-e4359.firebaseio.com',
  projectId: 'reactnativeproject-e4359',
  storageBucket: 'reactnativeproject-e4359.appspot.com',
  messagingSenderId: '551930559782'
}
firebase.initializeApp(config)

type Props = {}
export default class App extends Component<Props> {
  render() {
    return <Router />
  }
}
