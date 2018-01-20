import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { human, systemWeights, iOSColors } from 'react-native-typography'
import { constraints } from '../constants'

const SeparatorComponent = ({ text }) => (
  <View style={styles.container}>
    <View style={styles.separator} />
    <Text style={[human.caption2, systemWeights.thin, styles.text]}>
      {text}
    </Text>
    <View style={styles.separator} />
  </View>
)

export default SeparatorComponent

const styles = StyleSheet.create({
  container: {
    height: constraints.separatorHeight,
    paddingHorizontal: constraints.separatorpadding,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  separator: {
    borderTopColor: iOSColors.midGray,
    borderTopWidth: StyleSheet.hairlineWidth,
    flex: 1
  },
  text: {
    color: iOSColors.gray,
    paddingHorizontal: 8,
    textAlign: 'center'
  }
})
