import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { human, iOSColors, materialColors } from 'react-native-typography'

const TitleComponent = ({ title, writer }) => (
  <View style={styles.container}>
    <Text style={[human.headline, styles.title]}>{title}</Text>
    <Text style={[human.footnote, styles.writer]}>{writer}</Text>
  </View>
)

export default TitleComponent

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 64,
    paddingHorizontal: 32
  },
  title: {
    color: materialColors.blackPrimary,
    textAlign: 'center'
  },
  writer: {
    color: iOSColors.gray,
    textAlign: 'center'
  }
})
