import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { human, systemWeights, materialColors } from 'react-native-typography'
import { Constants } from 'expo'
import { MaterialIcons } from '@expo/vector-icons'
import { constraints } from '../constants'

const NovelHeaderComponent = ({ navigation }) => (
  <View style={styles.container}>
    <View style={styles.content}>
      <View style={styles.titles}>
        <TouchableOpacity>
          <Text
            style={[
              human.largeTitle,
              systemWeights.bold,
              styles.title,
              styles.primary
            ]}
          >
            Reading
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.icons}>
        <MaterialIcons
          name="add"
          size={32}
          style={styles.add}
          onPress={() => navigation.navigate('Addition')}
        />
        <MaterialIcons
          name="settings"
          size={28}
          style={styles.setting}
          onPress={() => navigation.navigate('Setting')}
        />
      </View>
    </View>
  </View>
)

export default NovelHeaderComponent

const styles = StyleSheet.create({
  container: {
    backgroundColor: materialColors.whitePrimary,
    height: constraints.headerHeight,
    justifyContent: 'flex-end',
    paddingTop: Constants.statusBarHeight
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 4,
    paddingHorizontal: 8
  },
  titles: {
    flexDirection: 'row'
  },
  title: {
    marginRight: 4
  },
  primary: {
    color: materialColors.blackPrimary
  },
  icons: {
    flexDirection: 'row'
  },
  add: {
    color: materialColors.blackPrimary,
    paddingTop: 6
  },
  setting: {
    color: materialColors.blackPrimary,
    marginLeft: 8,
    paddingTop: 8
  }
})
