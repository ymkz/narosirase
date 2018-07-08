import * as React from 'react'
import { RefreshControl, StyleSheet, View } from 'react-native'
import { SwipeListView } from 'react-native-swipe-list-view'
import Header from 'src/components/home/Header'
import ItemHidden from 'src/components/home/ItemHidden'
import ItemVisible from 'src/components/home/ItemVisible'
import ListEmpty from 'src/components/home/ListEmpty'
import ListSeparator from 'src/components/home/ListSeparator'
import { color, constraint, narou } from 'src/constants'
import {
  responseToNovelData,
  scrapeIndexPage,
  sleep,
  snackbar
} from 'src/helpers'
import { connector, RootAction, RootState } from 'src/modules'
import { novelActions, NovelState, Status } from 'src/modules/novels'

interface Props {
  novels: NovelState[]
  novelPatch: typeof novelActions.novelPatch
  novelRemove: typeof novelActions.novelRemove
}

interface State {
  status: Status
  refreshing: boolean
  refreshingItem: NovelState
}

class Home extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      status: Status.reading,
      refreshing: false,
      refreshingItem: null
    }
  }

  handleChangeStatus = (status: Status) => {
    this.setState({ status })
  }

  handleRefresh = async () => {
    this.setState({ refreshing: true })
    const novels = this.props.novels.filter(
      novel => novel.status === this.state.status
    )

    for (const novel of novels) {
      this.setState({ refreshingItem: novel })
      await sleep(narou.wait)
      const api = `${narou.api}ncode=${novel.ncode}&out=json`
      const url = `https://${narou.novel}/${novel.ncode}`
      try {
        const response = await fetch(api)
        const json = await response.json()
        const data = responseToNovelData(json[1])
        const index = await scrapeIndexPage(url)
        const payload = {
          ...novel,
          ...data,
          index
        }
        this.props.novelPatch(payload)
      } catch (error) {
        snackbar.error('小説の更新情報取得時にエラーが発生しました')
      }
    }

    this.setState({ refreshing: false, refreshingItem: null })
    snackbar.success('小説を更新しました')
  }

  render() {
    const { novels, novelPatch, novelRemove } = this.props
    const { status, refreshing, refreshingItem } = this.state
    return (
      <View style={styles.container}>
        <Header status={status} handleChangeStatus={this.handleChangeStatus} />
        <SwipeListView
          useFlatList
          data={novels.filter(novel => novel.status === status)}
          ListEmptyComponent={ListEmpty}
          ItemSeparatorComponent={ListSeparator}
          keyExtractor={({ ncode }) => ncode}
          rightOpenValue={-constraint.deviceWidth}
          leftOpenValue={constraint.deviceWidth}
          swipeToOpenPercent={16}
          refreshControl={
            novels.length ? (
              <RefreshControl
                refreshing={refreshing}
                onRefresh={this.handleRefresh}
              />
            ) : null
          }
          renderItem={({ item }: { item: NovelState }) => (
            <ItemVisible
              novel={item}
              refreshing={
                refreshing &&
                refreshingItem &&
                refreshingItem.ncode === item.ncode
              }
            />
          )}
          renderHiddenItem={({ item }: { item: NovelState }) => (
            <ItemHidden
              novel={item}
              novelPatch={novelPatch}
              novelRemove={novelRemove}
            />
          )}
        />
      </View>
    )
  }
}

const mapStateToProps = (state: RootState) => ({
  novels: state.novels
})

const mapDispatchToProps = (action: RootAction) => ({
  novelPatch: action.novelActions.novelPatch,
  novelRemove: action.novelActions.novelRemove
})

export default connector(mapStateToProps, mapDispatchToProps)(Home)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white
  }
})
