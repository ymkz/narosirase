import * as React from 'react'
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StatusBar,
  StyleSheet,
  View
} from 'react-native'
import Loading from 'src/components/reader/Loading'
import Mover from 'src/components/reader/Mover'
import PageContent from 'src/components/reader/PageContent'
import PageIndex from 'src/components/reader/PageIndex'
import PageShort from 'src/components/reader/PageShort'
import { color, constraint, narou } from 'src/constants'
import {
  ableToMoveNext,
  ableToMovePrev,
  isIndexPage,
  isLastEpisode,
  isShortStory,
  scrapeIndexPage,
  scrapeNovelContents
} from 'src/helpers'
import { connector, RootAction, RootState } from 'src/modules'
import { novelActions, NovelState } from 'src/modules/novels'
import { SettingState } from 'src/modules/setting'

interface Owns {
  data: string
}

interface Props {
  novel: NovelState
  setting: SettingState
  novelPatch: typeof novelActions.novelPatch
}

interface State {
  loading: boolean
  canMoveToPrev: boolean
  canMoveToNext: boolean
  scrollOffset: number
}

class Reader extends React.PureComponent<Props, State> {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      canMoveToPrev: false,
      canMoveToNext: false,
      scrollOffset: props.novel.scrollOffset
    }
  }

  move = async (page: number) => {
    const { novel, novelPatch } = this.props
    this.setState({
      loading: true,
      canMoveToPrev: false,
      canMoveToNext: false,
      scrollOffset: !page || novel.isShort ? 0 : constraint.scrollOffset
    })

    if (page) {
      const contents = await scrapeNovelContents(
        `https://${narou.novel}/${novel.ncode}/${page}`
      )
      const payload = {
        ...novel,
        page,
        contents
      }
      novelPatch(payload)
    } else {
      const index = await scrapeIndexPage(
        `https://${narou.novel}/${novel.ncode}`
      )
      const payload = {
        ...novel,
        page,
        index
      }
      novelPatch(payload)
    }

    this.setState({ loading: false })
  }

  handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { novel, novelPatch } = this.props

    if (e.nativeEvent.contentOffset.y > 0) {
      novelPatch({
        ...novel,
        scrollOffset: e.nativeEvent.contentOffset.y
      })
    } else {
      novelPatch({
        ...novel,
        scrollOffset: 0
      })
    }

    if (
      ableToMovePrev(e.nativeEvent) &&
      !isShortStory(novel) &&
      !isIndexPage(novel)
    ) {
      this.setState({ canMoveToPrev: true })
    } else if (
      ableToMoveNext(e.nativeEvent) &&
      !isShortStory(novel) &&
      !isLastEpisode(novel)
    ) {
      this.setState({ canMoveToNext: true })
    } else {
      this.setState({
        canMoveToPrev: false,
        canMoveToNext: false
      })
    }
  }

  handleResponderRelease = () => {
    if (this.state.canMoveToPrev) {
      this.move(this.props.novel.page - 1)
    }

    if (this.state.canMoveToNext) {
      this.move(this.props.novel.page + 1)
    }
  }

  render() {
    const { novel, setting } = this.props
    const { loading, canMoveToPrev, canMoveToNext, scrollOffset } = this.state
    return (
      <View style={styles.container}>
        <StatusBar hidden />
        {loading ? (
          <Loading />
        ) : (
          <ScrollView
            scrollEventThrottle={32}
            contentOffset={{ x: 0, y: scrollOffset }}
            onScroll={this.handleScroll}
            onResponderRelease={this.handleResponderRelease}
            style={styles.scrollView}
          >
            <Mover
              canMove={canMoveToPrev}
              visible={!isShortStory(novel) && !isIndexPage(novel)}
              prev={!isIndexPage(novel)}
              move={() => this.move(novel.page - 1)}
            />
            {isShortStory(novel) ? (
              <PageShort novel={novel} setting={setting} />
            ) : isIndexPage(novel) ? (
              <PageIndex novel={novel} move={this.move} />
            ) : (
              <PageContent novel={novel} setting={setting} />
            )}
            <Mover
              canMove={canMoveToNext}
              visible={!isShortStory(novel) && !isLastEpisode(novel)}
              next={!isLastEpisode(novel)}
              move={() => this.move(novel.page + 1)}
            />
          </ScrollView>
        )}
      </View>
    )
  }
}

const mapStateToProps = (state: RootState, props: Owns) => ({
  novel: state.novels.find(novel => novel.ncode === props.data),
  setting: state.setting
})

const mapDispatchToProps = (action: RootAction) => ({
  novelPatch: action.novelActions.novelPatch
})

export default connector(mapStateToProps, mapDispatchToProps)(Reader)

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.lightGray,
    flex: 1
  },
  scrollView: {
    flex: 1
  }
})
