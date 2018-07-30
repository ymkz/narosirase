import * as React from 'react'
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StatusBar,
  StyleSheet,
  View
} from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import Loading from 'src/components/Reader/Loading'
import Mover from 'src/components/Reader/Mover'
import PageContent from 'src/components/Reader/PageContent'
import PageIndex from 'src/components/Reader/PageIndex'
import PageShort from 'src/components/Reader/PageShort'
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
import { Store } from 'src/modules'
import { novelsAction, NovelsAction, NovelState } from 'src/modules/novels'
import { SettingState } from 'src/modules/setting'

interface Owns {
  data: string
}

interface Props {
  novel: NovelState
  setting: SettingState
  action: NovelsAction
}

interface State {
  loading: boolean
  canMoveToPrev: boolean
  canMoveToNext: boolean
  scrollOffset: number
}

class Reader extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      loading: false,
      canMoveToPrev: false,
      canMoveToNext: false,
      scrollOffset: props.novel.scrollOffset
    }
  }

  move = async (page: number) => {
    const { novel, action } = this.props
    this.setState({
      loading: true,
      canMoveToPrev: false,
      canMoveToNext: false,
      scrollOffset: !page || novel.isShort ? 0 : constraint.scrollOffset
    })

    if (page) {
      const contents = await scrapeNovelContents(`https://${narou.novel}/${novel.ncode}/${page}`)
      const payload = {
        ...novel,
        page,
        contents
      }
      action.patchNovel(payload)
    } else {
      const index = await scrapeIndexPage(`https://${narou.novel}/${novel.ncode}`)
      const payload = {
        ...novel,
        page,
        index
      }
      action.patchNovel(payload)
    }

    this.setState({ loading: false })
  }

  handleScroll = (event?: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (event) {
      const { novel, action } = this.props

      if (event.nativeEvent.contentOffset.y > 0) {
        action.patchNovel({
          ...novel,
          scrollOffset: event.nativeEvent.contentOffset.y
        })
      } else {
        action.patchNovel({
          ...novel,
          scrollOffset: 0
        })
      }

      if (ableToMovePrev(event.nativeEvent) && !isShortStory(novel) && !isIndexPage(novel)) {
        this.setState({ canMoveToPrev: true })
      } else if (
        ableToMoveNext(event.nativeEvent) &&
        !isShortStory(novel) &&
        !isLastEpisode(novel)
      ) {
        this.setState({ canMoveToNext: true })
      } else {
        this.setState({ canMoveToPrev: false, canMoveToNext: false })
      }
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
      <View
        style={[
          styles.container,
          { paddingTop: setting.hideStatusbar ? 0 : constraint.statusBarHeight }
        ]}
      >
        <StatusBar hidden={setting.hideStatusbar} />
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

const mapStateToProps = (state: Store, props: Owns) => ({
  novel: state.novels.find(novel => novel.ncode === props.data) as NovelState,
  setting: state.setting
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  action: bindActionCreators({ ...novelsAction }, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Reader)

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.lightGray,
    flex: 1
  },
  scrollView: {
    flex: 1
  }
})
