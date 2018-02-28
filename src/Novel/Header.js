import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { human, systemWeights, iOSColors, materialColors } from 'react-native-typography'
import { MaterialIcons } from '@expo/vector-icons'
import { constraints } from '../constants'

const NovelHeaderComponent = ({ handleIndexChange, navigation, index, routes }) => (
  <View style={styles.container}>
    <View style={styles.content}>
      <View style={styles.titles}>
        <TouchableOpacity>
          <Text style={[human.largeTitle, systemWeights.bold, styles.title, styles.primary]}>
            {routes[index].title}
          </Text>
        </TouchableOpacity>
        <View style={styles.subs}>
          <TouchableOpacity
            onPress={() => handleIndexChange(routes[index > 1 ? 0 : index + 1].index)}
          >
            <Text style={[human.caption2, systemWeights.thin, styles.title, styles.second]}>
              {routes[index > 1 ? 0 : index + 1].title}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleIndexChange(routes[index < 1 ? index + 2 : index - 1].index)}
          >
            <Text style={[human.caption2, systemWeights.thin, styles.second]}>
              {routes[index < 1 ? index + 2 : index - 1].title}
            </Text>
          </TouchableOpacity>
        </View>
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
    borderBottomColor: iOSColors.midGray,
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: constraints.headerHeight,
    justifyContent: 'flex-end',
    paddingTop: constraints.statusBarHeight
  },
  content: {
    flexDirection: 'row',
    paddingBottom: 4,
    paddingHorizontal: 8
  },
  titles: {
    flex: 1,
    flexDirection: 'row'
  },
  title: {
    marginRight: 4
  },
  primary: {
    color: materialColors.blackPrimary
  },
  second: {
    color: materialColors.blackPrimary
  },
  subs: {
    flexDirection: 'row',
    paddingTop: 22
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
