import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { iOSColors, materialColors } from 'react-native-typography'
import { Entypo } from '@expo/vector-icons'
import { constraints } from '../constants'

const PromoterComponent = ({ text, first, last, canMove, handleMove, prev, next }) => {
  if (first || last) return null
  return (
    <TouchableOpacity onPress={handleMove} style={styles.container}>
      {prev && (
        <Entypo
          name="chevron-thin-up"
          size={16}
          style={canMove ? styles.active : styles.inactive}
        />
      )}
      <Text style={canMove ? styles.active : styles.inactive}>{text}</Text>
      {next && (
        <Entypo
          name="chevron-thin-down"
          size={16}
          style={canMove ? styles.active : styles.inactive}
        />
      )}
    </TouchableOpacity>
  )
}

export default PromoterComponent

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: iOSColors.customGray,
    height: constraints.scrollOffset,
    justifyContent: 'center'
  },
  active: {
    color: materialColors.blackPrimary
  },
  inactive: {
    color: iOSColors.midGray
  }
})
