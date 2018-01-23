import React from 'react'
import { AppLoading } from 'expo'
import { StyleSheet, View, ScrollView, Text } from 'react-native'
import {
  human,
  systemWeights,
  iOSColors,
  materialColors
} from 'react-native-typography'
import { connect } from 'react-redux'
import moment from 'moment'
import { canMovePrev, canMoveNext, fetchNovelContents } from '../functions'
import { patch } from '../Novel/modules'
import Header from './Header'
import Comment from './Comment'
import Title from './Title'
import Chapter from './Chapter'
import Episode from './Episode'

class ReaderContainer extends React.PureComponent {
  constructor() {
    super()
    this.state = {
      canMovePrev: false,
      canMoveNext: false,
      loading: false
    }
  }

  promoteReading = async index => {
    this.setState({ loading: true })
    const view = await fetchNovelContents(
      `https://ncode.syosetu.com/${this.props.novel.ncode}/${index}`
    )
    const payload = {
      ...this.props.novel,
      index,
      view
    }
    this.props.dispatch(patch(payload))
    this.setState({
      loading: false
    })
  }

  handleScroll = async ({ nativeEvent }) => {
    if (canMovePrev(nativeEvent) && this.props.novel.index !== 0) {
      this.setState({ canMovePrev: true })
    } else if (
      canMoveNext(nativeEvent) &&
      this.props.novel.index !== this.props.novel.episodes
    ) {
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
        <Header
          navigation={this.props.navigation}
          index={this.props.novel.index}
          all={this.props.novel.episodes}
        />
        {this.state.loading ? (
          <AppLoading />
        ) : this.props.novel.index === 0 ? (
          <ScrollView
            scrollEventThrottle={16}
            onScroll={this.handleScroll}
            onResponderRelease={this.handleResponderRelease}
            contentContainerStyle={styles.contentsContainer}
          >
            <Title
              title={this.props.novel.title}
              writer={this.props.novel.writer}
            />
            <View style={styles.indexContainer}>
              <Text
                style={[human.footnote, systemWeights.semibold, styles.index]}
              >
                目次
              </Text>
              <Text style={[human.caption1, systemWeights.thin, styles.info]}>
                {this.props.novel.episodes}話{' '}
                {moment(this.props.novel.lastPostedAt).format('YYYY/M/D')} 公開,
                {moment(this.props.novel.lastUpdatedAt).format('YYYY/M/D')} 更新
              </Text>
            </View>
            <View style={styles.chapters}>
              {this.props.novel.view.chapters.map(chapter => (
                <View key={chapter.chapter}>
                  <Chapter chapter={chapter.chapter} />
                  {chapter.episodes.map(episode => (
                    <Episode
                      key={episode.index}
                      subtitle={episode.subtitle}
                      handlePress={() => this.promoteReading(episode.index)}
                    />
                  ))}
                </View>
              ))}
            </View>
          </ScrollView>
        ) : (
          <ScrollView
            scrollEventThrottle={16}
            onScroll={this.handleScroll}
            onResponderRelease={this.handleResponderRelease}
            contentContainerStyle={styles.contentsContainer}
            style={styles.contents}
          >
            <View style={styles.subtitleContainer}>
              <Text style={[human.title3, styles.subtitle]}>
                {this.props.novel.view.subtitle}
              </Text>
            </View>
            <Comment comment={this.props.novel.view.prologue} prologue />
            <Text style={[human.subhead, styles.text]}>
              {this.props.novel.view.body}
            </Text>
            <Comment comment={this.props.novel.view.epilogue} />
          </ScrollView>
        )}
      </View>
    )
  }
}

export default connect(
  ({ novel }, { navigation: { state: { params: { novel: { ncode } } } } }) => ({
    novel: novel.filter(item => item.ncode === ncode)[0]
  })
)(ReaderContainer)

const styles = StyleSheet.create({
  container: {
    backgroundColor: materialColors.whitePrimary,
    flex: 1
  },
  contents: {
    paddingHorizontal: 16
  },
  contentsContainer: {
    paddingVertical: 64
  },
  indexContainer: {
    alignItems: 'center',
    borderBottomColor: iOSColors.gray,
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingBottom: 8
  },
  index: {
    color: materialColors.blackPrimary
  },
  info: {
    color: iOSColors.gray
  },
  subtitleContainer: {
    alignItems: 'center',
    paddingBottom: 64
  },
  subtitle: {
    color: materialColors.blackPrimary
  },
  text: {
    color: materialColors.blackPrimary,
    lineHeight: 20
  },
  chapters: {
    paddingLeft: 16
  }
})

// const images = $('img').map((i, e) => $(e).attr('src')).get().filter((v, i) => i > 1).map(v => `http://${v}`)
