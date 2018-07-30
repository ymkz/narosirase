import { Entypo } from '@expo/vector-icons'
import * as React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { color, constraint } from 'src/constants'

const Header: React.SFC = () => (
  <View style={styles.container}>
    <View style={styles.header}>
      <Entypo name="chevron-down" size={28} color={color.darkBlack} onPress={Actions.pop} />
      <View style={styles.title}>
        <Text style={styles.text}>Setting</Text>
      </View>
    </View>
  </View>
)

export default Header

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.white,
    borderBottomColor: color.darkGray,
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingTop: constraint.statusBarHeight
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    height: constraint.headerHeight,
    paddingHorizontal: 12
  },
  title: {
    flex: 1,
    marginHorizontal: 12
  },
  text: {
    color: color.black,
    fontWeight: '900',
    fontSize: 24
  }
})
