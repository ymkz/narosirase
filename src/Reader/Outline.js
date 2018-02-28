import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { human, systemWeights, iOSColors, materialColors } from 'react-native-typography'
import moment from 'moment'

const OutlineComponent = ({ novel }) => (
  <View style={styles.container}>
    <Text style={[human.footnote, systemWeights.semibold, styles.index]}>目次</Text>
    <Text style={[human.caption1, systemWeights.thin, styles.timeinfo]}>
      {novel.episodes}話 {moment(novel.lastPostedAt).format('YYYY/M/D')} 公開,
      {moment(novel.lastUpdatedAt).format('YYYY/M/D')} 更新
    </Text>
  </View>
)

export default OutlineComponent

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderBottomColor: iOSColors.midGray,
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingBottom: 8,
    paddingTop: 32
  },
  index: {
    color: materialColors.blackPrimary
  },
  timeinfo: {
    color: iOSColors.gray
  }
})
