import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { human, materialColors } from 'react-native-typography'

const TitleComponent = ({ title }) => (
  <View style={styles.container}>
    <Text style={[human.headline, styles.title]}>{title}</Text>
  </View>
)

export default TitleComponent

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 64
  },
  title: {
    color: materialColors.blackPrimary
  }
})
