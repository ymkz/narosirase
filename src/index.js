import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { colors } from './constants'

const App = () => (
  <View style={styles.container}>
    <Text>Open up App.js to start working on your app!</Text>
    <Text>Changes you make will automatically reload.</Text>
    <Text>Shake your phone to open the developer menu.</Text>
  </View>
)

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.snowWhite,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
