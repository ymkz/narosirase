import React from 'react'
import { AppLoading } from 'expo'
import { StyleSheet, View, ScrollView } from 'react-native'
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
import { patch } from '../Novel/modules'
import Header from './Header'
import Promoter from './Promoter'
import Title from './Title'
import Outline from './Outline'
import Indexes from './Indexes'
import Subtitle from './Subtitle'
import Comment from './Comment'
import Body from './Body'

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
          episodes={this.props.novel.episodes}
        />
        {this.state.loading ? (
          <AppLoading />
        ) : this.props.novel.index === 0 ? (
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
                <Outline novel={this.props.novel} />
                <Indexes
                  novel={this.props.novel}
                  promoteReading={this.promoteReading}
                />
              </View>
              <Promoter
                text="次へ"
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
              contentOffset={{
                y: isNovelIndex(this.props.novel)
                  ? 0
                  : constraints.promoterOffset
              }}
              scrollEventThrottle={16}
              onScroll={this.handleScroll}
              onResponderRelease={this.handleResponderRelease}
            >
              <Promoter
                text="前へ"
                canMove={this.state.canMovePrev || this.state.canMoveNext}
                prev
              />
              <View style={styles.novelContents}>
                <Subtitle subtitle={this.props.novel.view.subtitle} />
                <Comment comment={this.props.novel.view.prologue} prologue />
                <Body body={this.props.novel.view.body} />
                <Comment comment={this.props.novel.view.epilogue} />
              </View>
              <Promoter
                text="次へ"
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
  ({ novel }, { navigation: { state: { params: { novel: { ncode } } } } }) => ({
    novel: novel.filter(item => item.ncode === ncode)[0]
  })
)(ReaderContainer)

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: iOSColors.customGray,
    flex: 1
  },
  container: {
    backgroundColor: materialColors.whitePrimary,
    flex: 1
  },
  indexContents: {
    backgroundColor: iOSColors.white,
    paddingBottom: 64
  },
  novelContents: {
    backgroundColor: iOSColors.white,
    padding: 16
  }
})
