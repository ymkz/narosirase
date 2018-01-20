import React from 'react'
import { StyleSheet, View } from 'react-native'
import { addNavigationHelpers, StackNavigator } from 'react-navigation'
import { materialColors } from 'react-native-typography'
import { connect } from 'react-redux'
import Alert from './Alert'
import Setting from './Setting'
import Addition from './Addition'
import Reader from './Reader'

const Navigation = StackNavigator(
  {
    Setting: {
      screen: Setting
    },
    Addition: {
      screen: Addition,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    Reader: {
      screen: Reader
    }
  },
  {
    headerMode: 'none'
  }
)

const RootContainer = ({ dispatch, nav: state }) => (
  <View style={styles.container}>
    <Alert />
    <Navigation navigation={addNavigationHelpers({ dispatch, state })} />
  </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: materialColors.whitePrimary
  }
})

export const reducer = (state, action) =>
  Navigation.router.getStateForAction(action, state) || state

export default connect(({ nav }) => ({ nav }))(RootContainer)
