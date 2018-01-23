import React from 'react'
import { StyleSheet, View } from 'react-native'
import { iOSColors } from 'react-native-typography'

const ItemSeparatorComponent = () => <View style={styles.separator} />

export default ItemSeparatorComponent

const styles = StyleSheet.create({
  separator: {
    borderTopColor: iOSColors.lightGray,
    borderTopWidth: StyleSheet.hairlineWidth
  }
})
