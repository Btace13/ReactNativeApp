import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { connect } from 'react-redux'
import Router from './src/router/Router'

import {
  addPlace,
  deletePlace,
  selectPlace,
  deselectPlace
} from './src/store/actions/index'

type Props = {}
class App extends Component<Props> {
  placeAddedHandler = placeName => {
    this.props.onAddPlace(placeName)
    console.log('Place Added!')
  }

  placeDeletedHandler = () => {
    this.props.onDeletePlace()
  }

  modalClosedHandler = () => {
    this.props.onDeselectPlace()
  }

  placeSelectedHandler = key => {
    this.props.onSelectPlace(key)
  }

  render() {
    return <Router />
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 26,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start'
  }
})

const mapStateToProps = state => {
  return {
    places: state.places.places,
    selectedPlace: state.places.selectedPlace
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAddPlace: name => dispatch(addPlace(name)),
    onDeletePlace: () => dispatch(deletePlace()),
    onSelectPlace: key => dispatch(selectPlace(key)),
    onDeselectPlace: () => dispatch(deselectPlace())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
