import React from 'react'
import { StyleSheet, FlatList, RefreshControl } from 'react-native'
import { connect } from 'react-redux'
import { option, patchDelay } from '../constants'
import { sleep, novelObjectMapper } from '../functions'
import Snackbar from '../Snackbar'
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
    for (let i = 0; i < this.props.novel.length; i++) {
      await sleep(patchDelay)
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
    Snackbar.show('更新が完了しました')
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
