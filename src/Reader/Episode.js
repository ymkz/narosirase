import React from 'react'
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native'
import { human, iOSColors, materialColors } from 'react-native-typography'

const EpisodeComponent = ({ subtitle, handlePress }) => (
  <View style={styles.container}>
    <TouchableOpacity onPress={handlePress} style={styles.inner}>
      <Text style={[human.subhead, styles.episode]}>{subtitle}</Text>
    </TouchableOpacity>
  </View>
)

export default EpisodeComponent

const styles = StyleSheet.create({
  container: {
    borderBottomColor: iOSColors.gray,
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  inner: {
    paddingHorizontal: 8,
    paddingVertical: 14
  },
  episode: {
    color: materialColors.blackPrimary,
    textAlignVertical: 'center'
  }
})
