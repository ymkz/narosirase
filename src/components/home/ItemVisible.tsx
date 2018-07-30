import * as React from 'react'
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { color } from 'src/constants'
import { currentPageInfo, isLastEpisode, lastUpdateInfo } from 'src/helpers'
import { NovelState } from 'src/modules/novels'

type Props = DraggableItem<NovelState>

const ItemVisible: React.SFC<Props> = ({ move, moveEnd, item }) => (
  <TouchableHighlight
    underlayColor={color.lightGray}
    onPress={() => Actions.READER(item.ncode)}
    onLongPress={move}
    onPressOut={moveEnd}
  >
    <View
      style={[
        styles.container,
        {
          borderRightWidth: 8,
          borderRightColor: isLastEpisode(item) ? color.transparent : color.blue
        }
      ]}
    >
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.writer}>{item.writer}</Text>
      <View style={styles.info}>
        <Text style={styles.currentPage}>{currentPageInfo(item)}</Text>
        <Text style={styles.lastUpdate}>{lastUpdateInfo(item)}</Text>
      </View>
    </View>
  </TouchableHighlight>
)

export default ItemVisible

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.white,
    paddingLeft: 16,
    paddingRight: 8,
    paddingVertical: 12
  },
  title: {
    color: color.black,
    fontSize: 15,
    fontWeight: 'bold'
  },
  writer: {
    color: color.lightBlack,
    fontSize: 14,
    marginTop: 4
  },
  info: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  currentPage: {
    color: color.lightBlack,
    fontSize: 13
  },
  lastUpdate: {
    color: color.lightBlack,
    fontSize: 10
  }
})
