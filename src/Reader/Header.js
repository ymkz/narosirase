import React from 'react'
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native'
import { human, materialColors } from 'react-native-typography'
import { Entypo } from '@expo/vector-icons'
import { constraints } from '../constants'

const AdditionHeaderComponent = ({ navigation, index, episodes }) => (
  <View style={styles.container}>
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <View style={styles.back}>
        <Entypo
          name="chevron-thin-left"
          size={14}
          color={materialColors.blackPrimary}
        />
        <Text style={[human.caption1, styles.text]}>Back</Text>
      </View>
    </TouchableOpacity>
    <View>
      <Text style={[human.caption1, styles.episode]}>
        {index} / {episodes}
      </Text>
    </View>
  </View>
)

export default AdditionHeaderComponent

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: materialColors.whitePrimary,
    flexDirection: 'row',
    height: constraints.statusBarHeight * 2,
    justifyContent: 'space-between',
    paddingHorizontal: 4,
    paddingTop: constraints.statusBarHeight
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
