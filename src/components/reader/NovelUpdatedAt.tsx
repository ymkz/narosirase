import dayjs from 'dayjs'
import * as React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { color } from 'src/constants'
import { NovelState } from 'src/modules/novels'

interface Props {
  novel: NovelState
}

const UpdatedAt: React.SFC<Props> = ({ novel }) => {
  const lastPostedAt: string = dayjs(novel.lastPostedAt).format('YYYY/M/D')
  const lastUpdatedAt: string = dayjs(novel.lastUpdatedAt).format('YYYY/M/D')
  return (
    <View style={styles.container}>
      <Text style={styles.index}>目次</Text>
      <Text style={styles.timeinfo}>
        <Text>
          {novel.episodes}
          話&nbsp;
          {lastPostedAt}
          &nbsp;公開&nbsp;-&nbsp;
          {lastUpdatedAt}
          &nbsp;更新
        </Text>
      </Text>
    </View>
  )
}

export default UpdatedAt

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderBottomColor: color.darkGray,
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingBottom: 8,
    paddingTop: 32
  },
  index: {
    color: color.black,
    fontSize: 13
  },
  timeinfo: {
    color: color.lightBlack,
    fontSize: 12
  }
})
