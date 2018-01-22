import React from 'react'
import { StyleSheet, View, Text, TouchableHighlight } from 'react-native'
import {
  human,
  systemWeights,
  iOSColors,
  materialColors
} from 'react-native-typography'
import { MaterialIcons } from '@expo/vector-icons'
import { constraints } from '../constants'

const Box = ({ destructive, last, icon, text, onPress }) => (
  <TouchableHighlight
    onPress={onPress}
    underlayColor={iOSColors.customGray}
    style={[
      styles.container,
      destructive && styles.destructive,
      last && styles.last
    ]}
  >
    <View style={styles.box}>
      <MaterialIcons
        name={icon}
        size={36}
        color={destructive ? iOSColors.pink : materialColors.blackPrimary}
      />
      <Text style={[human.caption2, systemWeights.thin]}>{text}</Text>
    </View>
  </TouchableHighlight>
)

export default Box

const styles = StyleSheet.create({
  container: {
    borderColor: iOSColors.gray,
    borderRadius: 8,
    borderWidth: 1,
    marginRight: constraints.deviceWidth / 25,
    height: constraints.deviceWidth / 5,
    width: constraints.deviceWidth / 5
  },
  destructive: {
    borderColor: iOSColors.pink
  },
  box: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  },
  last: {
    marginRight: 0
  }
})
