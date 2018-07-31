import * as React from 'react'
import { RefreshControl, StyleSheet, View } from 'react-native'
import DraggableFlatList from 'react-native-draggable-flatlist'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import Header from 'src/components/Home/Header'
import ItemVisible from 'src/components/Home/ItemVisible'
import ListEmpty from 'src/components/Home/ListEmpty'
import ListRefreshing from 'src/components/Home/ListRefreshing'
import ListSeparator from 'src/components/Home/ListSeparator'
import { color, narou } from 'src/constants'
import { responseToNovelData, scrapeIndexPage, sleep, snackbar } from 'src/helpers'
import { Store } from 'src/modules'
import { NovelData, NovelIndex, novelsAction, NovelsAction, NovelState } from 'src/modules/novels'
import { Status, statusAction, StatusAction } from 'src/modules/status'

interface Props {
  novels: NovelState[]
  status: Status
  action: NovelsAction & StatusAction
}

interface State {
  refreshing: boolean
}

class Home extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      refreshing: false
    }
  }

  handleChangeStatus = (status: Status) => {
    this.props.action.patchStatus(status)
  }

  handleRefresh = async () => {
    if (!this.props.novels) {
      return
    }

    this.setState({ refreshing: true })
    const novels: NovelState[] = this.props.novels.filter(
      (novel: NovelState) => novel.status === this.props.status
    )

    for (const novel of novels) {
      await sleep(narou.wait)

      const api: string = `${narou.api}ncode=${novel.ncode}&out=json`
      const url: string = `https://${narou.novel}/${novel.ncode}`

      try {
        const response = await fetch(api)
        const json = await response.json()
        const data: NovelData = responseToNovelData(json[1])
        const index: NovelIndex = await scrapeIndexPage(url)
        const payload: NovelState = {
          ...novel,
          ...data,
          index
        }
        this.props.action.patchNovel(payload)
      } catch (error) {
        snackbar.error('小説の更新情報取得時にエラーが発生しました')
      }
    }

    this.setState({ refreshing: false })
    snackbar.success('小説を更新しました')
  }

  handleMoveEnd = (props: DraggableMoveEnd<NovelState>) => {
    this.props.action.sortNovel(props.data)
  }

  render() {
    const { novels, status } = this.props
    const { refreshing } = this.state
    return (
      <View style={styles.container}>
        <ListRefreshing refreshing={refreshing} />
        <Header status={status} handleChangeStatus={this.handleChangeStatus} />
        <DraggableFlatList
          data={novels.filter(novel => novel.status === status)}
          ListEmptyComponent={ListEmpty}
          ItemSeparatorComponent={ListSeparator}
          refreshing={refreshing}
          renderItem={ItemVisible}
          onRefresh={this.handleRefresh}
          onMoveEnd={this.handleMoveEnd}
        />
      </View>
    )
  }
}

const mapStateToProps = (state: Store) => ({
  novels: state.novels,
  status: state.status
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  action: bindActionCreators({ ...novelsAction, ...statusAction }, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.white,
    flex: 1
  }
})
