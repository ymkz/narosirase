import * as React from 'react'
import { StyleSheet, View } from 'react-native'
import { color } from 'src/constants'

const Separator = () => <View style={styles.separator} />

export default Separator

const styles = StyleSheet.create({
  separator: {
    borderTopColor: color.lightGray,
    borderTopWidth: StyleSheet.hairlineWidth,
    marginVertical: 8
  }
})
