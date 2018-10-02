import React from 'react'
import { View, Text } from 'react-native'
import {
  createSwitchNavigator,
  createBottomTabNavigator
} from 'react-navigation'
import Login from '../views/Login'
import Register from '../views/Register'
import { Icon } from 'native-base'
import Home from '../views/Home'
import Test from '../views/Test'

class DetailsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
      </View>
    )
  }
}

// MAIN TAB NAVIGATOR
const MainTabNavigator = createBottomTabNavigator(
  {
    Map: Home,
    Aug: { screen: DetailsScreen, tabBarLabel: '360' },
    Profile: DetailsScreen,
    Events: Test,
    Groups: DetailsScreen
  },
  {
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

        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
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

// REGISTER SCREEN
const RegisterScreen = createSwitchNavigator({
  Register: Register,
  Details: Login
})

// MAIN SWITCH NAVIGATOR
export default createSwitchNavigator({
  Login: Login,
  Register: RegisterScreen,
  Details: MainTabNavigator
})

// ROUTE CONFIG NEEDS TO OUTPUT A FUNCTION DON'T FORGET!
