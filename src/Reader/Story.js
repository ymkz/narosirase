import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { human, materialColors } from 'react-native-typography'

const StoryComponent = ({ novel }) => (
  <View style={styles.container}>
    <Text style={[human.footnote, styles.story]}>{novel.story}</Text>
  </View>
)

export default StoryComponent

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingBottom: 32
  },
  story: {
    color: materialColors.blackPrimary
  }
})
