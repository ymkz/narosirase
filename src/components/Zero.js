import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Icon } from 'react-native-elements'

export default () => (
  <View style={styles.container}>
    <Icon name='library-books' size={64} color='#424242' />
    <Text style={styles.text}>Nothing to display!</Text>
  </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    color: '#424242',
    fontSize: 20,
    paddingVertical: 20
  }
})
