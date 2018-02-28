import React from 'react'
import { StyleSheet, StatusBar, FlatList, RefreshControl } from 'react-native'
import { connect } from 'react-redux'
import { option, patchDelay, alertDelay } from '../constants'
import { sleep, novelObjectMapper } from '../functions'
import { alertShow, alertPatch, alertHide } from '../Alert/modules'
import { novelPatch } from './modules'
import Empty from './Empty'
import Separator from './Separator'
import Item from './Item'

class NovelsComponent extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      refreshing: false
    }
  }

  handleRefresh = async () => {
    this.setState({ refreshing: true })
    StatusBar.setBarStyle('light-content', true)
    this.props.dispatch(alertShow('更新を開始しました'))
    for (let i = 0; i < this.props.novel.length; i++) {
      await sleep(patchDelay)
      this.props.dispatch(alertPatch(`${i + 1} / ${this.props.novel.length}`))
      const url = `http://api.syosetu.com/novelapi/api?ncode=${this.props.novel[i].ncode}&out=json`
      const response = await fetch(url, option).catch(() => this.setState({ refreshing: false }))
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
    StatusBar.setBarStyle('dark-content', true)
  }

  render() {
    return (
      <FlatList
        data={this.props.novel}
        ItemSeparatorComponent={Separator}
        keyExtractor={({ ncode }) => ncode}
        ListEmptyComponent={Empty}
        refreshing={this.state.refreshing}
        refreshControl={
          <RefreshControl refreshing={this.state.refreshing} onRefresh={this.handleRefresh} />
        }
        renderItem={({ item }) => (
          <Item
            novel={item}
            navigation={this.props.navigation}
            handleActionSheet={this.props.handleActionSheet}
            dispatch={this.props.dispatch}
          />
        )}
        style={styles.flatlist}
      />
    )
  }
}

export default connect(({ novel }, { route }) => ({
  novel: novel.filter(item => item.status === route.key)
}))(NovelsComponent)

const styles = StyleSheet.create({
  flatlist: {
    flex: 1
  }
})
