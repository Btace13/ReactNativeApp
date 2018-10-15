import React from 'react'
import { View, Text } from 'react-native'
import {
  createSwitchNavigator,
  createBottomTabNavigator,
  createDrawerNavigator
} from 'react-navigation'
import Login from '../views/Login'
import { Icon } from 'native-base'
import Home from '../views/Home'
import Loading from '../views/Loading'
import Profile from '../views/Profile'
import Events from '../views/Events'
import Groups from '../views/Groups'

import ARScreen from '../views/AR'

// PROFILE DRAWER NAVIGATOR
const ProfileScreen = createDrawerNavigator({
  Home: {
    screen: Profile
  }
})

// MAIN TAB NAVIGATOR
const MainTabNavigator = createBottomTabNavigator(
  {
    Map: Home,
    Aug: { screen: ARScreen, tabBarLabel: '360' },
    Profile,
    Events,
    Groups
  },
  {
    // THIS IS CREATING THE ICONS FOR THE MAIN TABS
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: () => {
        const { routeName } = navigation.state
        let iconName
        if (routeName === 'Map') {
          iconName = 'map'
        } else if (routeName === 'Aug') {
          iconName = 'globe'
        } else if (routeName === 'Profile') {
          iconName = 'person'
        } else if (routeName === 'Events') {
          iconName = 'calendar'
        } else if (routeName === 'Groups') {
          iconName = 'people'
        }
        return (
          <Icon
            style={{ color: '#444444', fontSize: 30 }}
            active
            name={iconName}
          />
        )
      }
    })
  }
)

// AUTH SWITCH NAVIGATOR
const AuthStack = createSwitchNavigator({
  Login
})

// MAIN SWITCH NAVIGATOR
export default createSwitchNavigator({
  AuthLoading: Loading,
  AuthStack,
  Main: MainTabNavigator
})

// ROUTE CONFIG NEEDS TO OUTPUT A FUNCTION DON'T FORGET!
