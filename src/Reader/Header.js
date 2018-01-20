import React from 'react'
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native'
import { human, iOSColors, materialColors } from 'react-native-typography'
import { Entypo } from '@expo/vector-icons'
import { constraints } from '../constants'

const AdditionHeaderComponent = ({ navigation, index, all }) => (
  <View style={styles.container}>
    <TouchableOpacity
      style={styles.contents}
      onPress={() => navigation.goBack()}
    >
      <View style={styles.back}>
        <Entypo
          name="chevron-thin-left"
          size={14}
          color={materialColors.blackPrimary}
        />
        <Text style={[human.caption1, styles.text]}>Back</Text>
      </View>
      <View>
        <Text style={[human.caption1, styles.episode]}>
          {index} / {all}
        </Text>
      </View>
    </TouchableOpacity>
  </View>
)

export default AdditionHeaderComponent

const styles = StyleSheet.create({
  container: {
    backgroundColor: iOSColors.white,
    height: constraints.statusBarHeight * 2,
    paddingTop: constraints.statusBarHeight
  },
  contents: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 4
  },
  back: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  text: {
    color: materialColors.blackPrimary,
    marginBottom: 2
  },
  episode: {
    color: materialColors.blackPrimary
  }
})
