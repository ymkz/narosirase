import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { human, iOSColors } from 'react-native-typography'

const ChapterComponent = ({ chapter }) => {
  if (!chapter) return null
  return (
    <View style={styles.container}>
      <Text style={[human.footnote, styles.chapter]}>{chapter}</Text>
    </View>
  )
}

export default ChapterComponent

const styles = StyleSheet.create({
  container: {
    borderBottomColor: iOSColors.midGray,
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 8,
    paddingBottom: 8,
    paddingTop: 32
  },
  chapter: {
    color: iOSColors.gray
  }
})
