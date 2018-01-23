import React from 'react'
import { StyleSheet, View, FlatList, RefreshControl } from 'react-native'
import { materialColors } from 'react-native-typography'
import { ActionSheet } from 'react-native-cell-components'
import { connect } from 'react-redux'
import {
  constraints,
  status,
  option,
  patchDelay,
  alertDelay
} from '../constants'
import { sleep, novelObjectMapper } from '../functions'
import { alertShow, alertPatch, alertHide } from '../Alert/modules'
import { novelPatch, novelRemove } from './modules'
import Header from './Header'
import Empty from './Empty'
import Separator from './Separator'
import Item from './Item'
import Box from './Box'

class SettingContainer extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      refreshing: false,
      novel: null
    }
  }

  handleRefresh = async () => {
    this.setState({ refreshing: true })
    this.props.dispatch(alertShow('更新を開始しました'))
    for (let i = 0; i < this.props.novel.length; i++) {
      await sleep(patchDelay)
      this.props.dispatch(alertPatch(`${i + 1} / ${this.props.novel.length}`))
      const url = `http://api.syosetu.com/novelapi/api?ncode=${
        this.props.novel[i].ncode
      }&out=json`
      const response = await fetch(url, option).catch(() =>
        this.setState({ refreshing: false })
      )
      const json = await response.json()
      const data = novelObjectMapper(json[1])
      const payload = {
        ...this.props.novel[i],
        ...data
      }
      this.props.dispatch(novelPatch(payload))
    }
    this.setState({ refreshing: false })
    this.props.dispatch(alertPatch('更新が完了しました'))
    await sleep(alertDelay)
    this.props.dispatch(alertHide())
  }

  handleActionSheet = novel => {
    this.setState({ novel })
    this.actionSheet.open()
  }

  handleToReading = () => {
    this.props.dispatch(
      novelPatch({ ...this.state.novel, status: status.reading })
    )
    this.actionSheet.close()
  }

  handleToPending = () => {
    this.props.dispatch(
      novelPatch({ ...this.state.novel, status: status.reading })
    )
    this.actionSheet.close()
  }

  handleToArchive = () => {
    this.props.dispatch(
      novelPatch({ ...this.state.novel, status: status.reading })
    )
    this.actionSheet.close()
  }

  handleRemove = () => {
    this.props.dispatch(novelRemove(this.state.novel))
    this.actionSheet.close()
  }

  render() {
    return (
      <View style={styles.container}>
        <Header navigation={this.props.navigation} />
        <FlatList
          data={this.props.novel}
          ItemSeparatorComponent={Separator}
          keyExtractor={({ ncode }) => ncode}
          ListEmptyComponent={Empty}
          refreshing={this.state.refreshing}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.handleRefresh}
            />
          }
          renderItem={({ item }) => (
            <Item
              novel={item}
              navigation={this.props.navigation}
              handleActionSheet={this.handleActionSheet}
              dispatch={this.props.dispatch}
            />
          )}
          style={styles.flatListContainer}
        />
        <ActionSheet
          ref={ref => (this.actionSheet = ref)}
          mode="list"
          onClose={() => this.setState({ novel: null })}
        >
          <View style={styles.actionSheetContainer}>
            <Box
              icon="chrome-reader-mode"
              text="reading"
              onPress={this.handleToReading}
            />
            <Box
              icon="watch-later"
              text="pending"
              onPress={this.handleToPending}
            />
            <Box icon="archive" text="archive" onPress={this.handleToArchive} />
            <Box
              destructive
              last
              icon="delete-forever"
              text="delete"
              onPress={this.handleRemove}
            />
          </View>
        </ActionSheet>
      </View>
    )
  }
}

export default connect(({ novel }) => ({ novel }))(SettingContainer)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: materialColors.whitePrimary
  },
  flatListContainer: {
    flex: 1
  },
  actionSheetContainer: {
    backgroundColor: materialColors.whitePrimary,
    flexDirection: 'row',
    padding: constraints.deviceWidth / 25
  }
})
