import * as React from 'react'
import {
  LayoutChangeEvent,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native'
import { Actions } from 'react-native-router-flux'
import ItemRefreshing from 'src/components/home/ItemRefreshing'
import { color, constraint } from 'src/constants'
import { currentPageInfo, isLastEpisode, lastUpdateInfo } from 'src/helpers'
import { NovelState } from 'src/modules/novels'

interface Props {
  novel: NovelState
  refreshing: boolean
}

class ItemVisible extends React.PureComponent<Props> {
  height: number = constraint.initialItemHeight

  handleLayout = (e: LayoutChangeEvent) => {
    this.height = e.nativeEvent.layout.height
  }

  handlePress = () => {
    if (this.props.refreshing) {
      return null
    } else {
      Actions.READER(this.props.novel.ncode)
    }
  }

  render() {
    const { novel, refreshing } = this.props
    return (
      <TouchableHighlight
        underlayColor={color.lightGray}
        onPress={this.handlePress}
      >
        <View
          onLayout={this.handleLayout}
          style={[
            styles.container,
            {
              borderRightWidth: 8,
              borderRightColor: isLastEpisode(novel)
                ? color.transparent
                : color.blue
            }
          ]}
        >
          {refreshing ? (
            <ItemRefreshing height={this.height - 24} /> // container.paddingVertical
          ) : (
            <React.Fragment>
              <Text style={styles.title}>{novel.title}</Text>
              <Text style={styles.writer}>{novel.writer}</Text>
              <View style={styles.info}>
                <Text style={styles.currentPage}>{currentPageInfo(novel)}</Text>
                <Text style={styles.lastUpdate}>{lastUpdateInfo(novel)}</Text>
              </View>
            </React.Fragment>
          )}
        </View>
      </TouchableHighlight>
    )
  }
}

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
