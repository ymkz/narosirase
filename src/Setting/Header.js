import React from 'react'
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native'
import {
  human,
  systemWeights,
  iOSColors,
  materialColors
} from 'react-native-typography'
import { Entypo } from '@expo/vector-icons'
import { constraints } from '../constants'

const SettingHeaderComponent = ({ navigation }) => (
  <View style={styles.container}>
    <TouchableOpacity
      style={styles.actions}
      onPress={() => navigation.goBack()}
    >
      <Entypo
        name="chevron-thin-left"
        size={20}
        color={materialColors.blackPrimary}
      />
      <Text style={[human.callout, styles.text]}>Back</Text>
    </TouchableOpacity>
    <View style={styles.contents}>
      <Text style={[human.largeTitle, systemWeights.bold, styles.primary]}>
        Setting
      </Text>
    </View>
  </View>
)

export default SettingHeaderComponent

const styles = StyleSheet.create({
  container: {
    backgroundColor: iOSColors.white,
    height: constraints.headerHeight,
    justifyContent: 'flex-end',
    paddingTop: constraints.statusBarHeight
  },
  actions: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 4
  },
  text: {
    color: materialColors.blackPrimary,
    marginBottom: 2
  },
  contents: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 8
  },
  primary: {
    color: materialColors.blackPrimary
  }
})
