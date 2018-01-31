import React from 'react'
import moment from 'moment'
import { StyleSheet, View, Text, TouchableHighlight } from 'react-native'
import { iOSColors, materialColors } from 'react-native-typography'
import { MaterialIcons } from '@expo/vector-icons'

const ItemComponent = ({ novel, navigation, handleActionSheet }) => (
  <TouchableHighlight
    underlayColor={iOSColors.customGray}
    onPress={() => navigation.navigate('Reader', { novel })}
    onLongPress={() => handleActionSheet(novel)}
  >
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>{novel.title}</Text>
        <Text style={styles.writer}>{novel.writer}</Text>
        <Text style={styles.info}>
          {novel.short
            ? '短編'
            : `${novel.index === 0 ? '目次' : `${novel.index}話`}／全${
                novel.episodes
              }話`}
          <Text style={styles.updated}>{` 更新：${moment(
            novel.lastUpdatedAt
          ).format('M月D日h時m分')}`}</Text>
        </Text>
      </View>
      {novel.index !== novel.episodes && (
        <View style={styles.new}>
          <MaterialIcons name="fiber-new" color="deepskyblue" size={28} />
        </View>
      )}
    </View>
  </TouchableHighlight>
)

export default ItemComponent

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row'
  },
  content: {
    flex: 1,
    padding: 12
  },
  title: {
    color: materialColors.blackPrimary,
    fontSize: 15.5,
    fontWeight: 'bold'
  },
  writer: {
    color: materialColors.blackSecondary,
    fontWeight: 'bold',
    paddingTop: 6
  },
  info: {
    color: materialColors.blackSecondary,
    fontWeight: 'bold'
  },
  updated: {
    color: materialColors.blackSecondary,
    fontSize: 10,
    fontWeight: 'normal',
    marginLeft: 10
  },
  new: {
    justifyContent: 'center',
    paddingRight: 12
  }
})
