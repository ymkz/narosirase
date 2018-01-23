import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { human, materialColors } from 'react-native-typography'

const SubtitleComponent = ({ subtitle }) => (
  <View style={styles.container}>
    <Text style={[human.body, styles.subtitle]}>{subtitle}</Text>
  </View>
)

export default SubtitleComponent

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 64
  },
  subtitle: {
    color: materialColors.blackPrimary
  }
})
