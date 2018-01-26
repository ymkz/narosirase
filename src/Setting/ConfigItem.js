import React from 'react'
import { StyleSheet, View, Text, TouchableHighlight } from 'react-native'
import { iOSColors, materialColors } from 'react-native-typography'
import { MaterialIcons } from '@expo/vector-icons'

const ConfigItemComponent = ({ size, name, handler }) => (
  <TouchableHighlight
    underlayColor={iOSColors.customGray}
    onPress={handler}
    style={styles.container}
  >
    <View style={styles.row}>
      <MaterialIcons
        name={name}
        size={16}
        color={materialColors.blackPrimary}
      />
      <Text style={styles.point}>{size} pt</Text>
    </View>
  </TouchableHighlight>
)

export default ConfigItemComponent

const styles = StyleSheet.create({
  container: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: 16
  },
  point: {
    color: materialColors.blackPrimary,
    paddingLeft: 16
  }
})
