import React from 'react'
import { AppLoading } from 'expo'
import { StyleSheet, View, ScrollView, Text } from 'react-native'
import { iOSColors, materialColors } from 'react-native-typography'
import { connect } from 'react-redux'
import { constraints } from '../constants'
import {
  canMovePrev,
  canMoveNext,
  isNovelIndex,
  isLastEpisode,
  fetchNovelContents
} from '../functions'
import { novelPatch } from '../Novel/modules'
import Header from './Header'
import Promoter from './Promoter'
import Title from './Title'
import Story from './Story'
import Outline from './Outline'
import Indexes from './Indexes'
import Subtitle from './Subtitle'
import Comment from './Comment'
import Body from './Body'

class ReaderContainer extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      canMovePrev: false,
      canMoveNext: false,
      scrollOffset: props.novel.scrollOffset
    }
  }

  promoteReading = async index => {
    this.setState({
      loading: true,
      scrollOffset: index === 0 ? 0 : constraints.scrollOffset
    })
    const reader = await fetchNovelContents(
      `https://ncode.syosetu.com/${this.props.novel.ncode}/${index}`
    )
    const payload = {
      ...this.props.novel,
      index,
      reader
    }
    this.props.dispatch(novelPatch(payload))
    this.setState({
      loading: false
    })
  }

  handleScroll = async ({ nativeEvent }) => {
    this.props.dispatch(
      novelPatch({
        ...this.props.novel,
        scrollOffset: nativeEvent.contentOffset.y
      })
    )
    if (canMovePrev(nativeEvent) && !isNovelIndex(this.props.novel)) {
      this.setState({ canMovePrev: true })
    } else if (canMoveNext(nativeEvent) && !isLastEpisode(this.props.novel)) {
      this.setState({ canMoveNext: true })
    } else {
      this.setState({ canMovePrev: false, canMoveNext: false })
    }
  }

  handleResponderRelease = async () => {
    if (this.state.canMovePrev) {
      this.promoteReading(this.props.novel.index - 1)
    }
    if (this.state.canMoveNext) {
      this.promoteReading(this.props.novel.index + 1)
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Header navigation={this.props.navigation} novel={this.props.novel} />
        {this.state.loading ? (
          <AppLoading />
        ) : this.props.novel.short ? (
          <View style={styles.shortWrapper}>
            <ScrollView scrollEventThrottle={16} onScroll={this.handleScroll}>
              <View style={styles.novelContents}>
                <Title
                  title={this.props.novel.title}
                  writer={this.props.novel.writer}
                />
                <Comment
                  comment={this.props.novel.reader.foreword}
                  setting={this.props.setting}
                  foreword
                />
                <Body
                  body={this.props.novel.reader.body}
                  setting={this.props.setting}
                />
                <Comment
                  comment={this.props.novel.reader.afterword}
                  setting={this.props.setting}
                />
              </View>
            </ScrollView>
          </View>
        ) : isNovelIndex(this.props.novel) ? (
          <View style={styles.wrapper}>
            <ScrollView
              scrollEventThrottle={16}
              onScroll={this.handleScroll}
              onResponderRelease={this.handleResponderRelease}
            >
              <View style={styles.indexContents}>
                <Title
                  title={this.props.novel.title}
                  writer={this.props.novel.writer}
                />
                <Story novel={this.props.novel} />
                <Text
                  onPress={() =>
                    this.promoteReading(this.props.novel.index + 1)
                  }
                  style={styles.start}
                >
                  読み始める
                </Text>
                <Outline novel={this.props.novel} />
                <Indexes
                  novel={this.props.novel}
                  promoteReading={this.promoteReading}
                />
              </View>
              <Promoter
                text="読み始める"
                canMove={this.state.canMoveNext || this.state.canMovePrev}
                handleMove={() =>
                  this.promoteReading(this.props.novel.index + 1)
                }
                next
              />
            </ScrollView>
          </View>
        ) : (
          <View style={styles.wrapper}>
            <ScrollView
              ref={ref => (this.scroller = ref)}
              contentOffset={{
                x: 0,
                y: this.state.scrollOffset
              }}
              scrollEventThrottle={16}
              onScroll={this.handleScroll}
              onResponderRelease={this.handleResponderRelease}
            >
              <Promoter
                text={this.props.novel.index <= 1 ? '目次へ' : '前のエピソード'}
                canMove={this.state.canMovePrev || this.state.canMoveNext}
                prev
              />
              <View style={styles.novelContents}>
                <Subtitle subtitle={this.props.novel.reader.subtitle} />
                <Comment
                  comment={this.props.novel.reader.foreword}
                  setting={this.props.setting}
                  foreword
                />
                <Body
                  body={this.props.novel.reader.body}
                  setting={this.props.setting}
                />
                <Comment
                  comment={this.props.novel.reader.afterword}
                  setting={this.props.setting}
                />
              </View>
              <Promoter
                text="次のエピソード"
                last={isLastEpisode(this.props.novel)}
                canMove={this.state.canMovePrev || this.state.canMoveNext}
                handleMove={() =>
                  this.promoteReading(this.props.novel.index + 1)
                }
                next
              />
            </ScrollView>
          </View>
        )}
      </View>
    )
  }
}

export default connect(
  (
    { novel, setting },
    { navigation: { state: { params: { novel: { ncode } } } } }
  ) => ({
    novel: novel.filter(item => item.ncode === ncode)[0],
    setting
  })
)(ReaderContainer)

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: iOSColors.customGray,
    flex: 1
  },
  shortWrapper: {
    backgroundColor: materialColors.whitePrimary,
    flex: 1
  },
  container: {
    backgroundColor: materialColors.whitePrimary,
    flex: 1
  },
  indexContents: {
    backgroundColor: materialColors.whitePrimary,
    paddingBottom: 64
  },
  novelContents: {
    backgroundColor: materialColors.whitePrimary,
    paddingBottom: 64,
    paddingHorizontal: 16
  },
  start: {
    color: iOSColors.blue,
    textAlign: 'center'
  }
})
