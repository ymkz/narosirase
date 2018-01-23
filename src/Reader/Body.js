import React from 'react'
import { StyleSheet, Text } from 'react-native'
import { human, materialColors } from 'react-native-typography'

const BodyComponent = ({ body }) => (
  <Text style={[human.subhead, styles.text]}>{body}</Text>
)

export default BodyComponent

const styles = StyleSheet.create({
  text: {
    color: materialColors.blackPrimary,
    lineHeight: 20
  }
})
