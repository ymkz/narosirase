import React from 'react'
import { AppLoading } from 'expo'
import { StyleSheet, View, ScrollView, Text } from 'react-native'
import { human, materialColors } from 'react-native-typography'
import { canMovePrev, canMoveNext, fetchNovelContents } from '../functions'
import Header from './Header'
import Separator from './Separator'
import Title from './Title'
import Chapter from './Chapter'
import Episode from './Episode'

class ReaderContainer extends React.Component {
  constructor() {
    super()
    this.state = {
      canMovePrev: false,
      canMoveNext: false,
      loading: false,
      index: 0,
      data: null
    }
  }

  async componentDidMount() {
    this.handleUpdate(this.state.index)
  }

  handleScroll = async ({ nativeEvent }) => {
    if (canMovePrev(nativeEvent) && this.state.index !== 0) {
      this.setState({ canMovePrev: true })
    } else if (canMoveNext(nativeEvent) /* && this.state.index !== last */) {
      this.setState({ canMoveNext: true })
    } else {
      this.setState({ canMovePrev: false, canMoveNext: false })
    }
  }

  handleUpdate = async index => {
    this.setState({ loading: true })
    const data = await fetchNovelContents(
      `https://ncode.syosetu.com/n7500bd/${index}`
    )
    this.setState({
      data,
      index,
      loading: false
    })
  }

  handleResponderRelease = async () => {
    if (this.state.canMovePrev) {
      this.handleUpdate(this.state.index - 1)
    }
    if (this.state.canMoveNext) {
      this.handleUpdate(this.state.index + 1)
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          navigation={this.props.navigation}
          index={this.state.index}
          all={24}
        />
        {this.state.loading || !this.state.data ? (
          <AppLoading />
        ) : this.state.data.index === 0 ? (
          <ScrollView
            scrollEventThrottle={16}
            onScroll={this.handleScroll}
            onResponderRelease={this.handleResponderRelease}
            contentContainerStyle={styles.contentsContainer}
          >
            <Title title={this.state.data.title} />
            <View style={styles.chapters}>
              {this.state.data.chapters.map(chapter => (
                <View key={chapter.chapter}>
                  <Chapter chapter={chapter.chapter} />
                  {chapter.episodes.map(episode => (
                    <Episode
                      key={episode.index}
                      subtitle={episode.subtitle}
                      handlePress={() => this.handleUpdate(episode.index)}
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
                {this.state.data.subtitle}
              </Text>
            </View>
            <Text style={[human.subhead, styles.text]}>
              {this.state.data.prologue}
            </Text>
            <Separator text="まえがき" />
            <Text style={[human.subhead, styles.text]}>
              {this.state.data.body}
            </Text>
            <Separator text="あとがき" />
            <Text style={[human.subhead, styles.text]}>
              {this.state.data.epilogue}
            </Text>
          </ScrollView>
        )}
      </View>
    )
  }
}

export default ReaderContainer

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
  subtitleContainer: {
    alignItems: 'center',
    paddingBottom: 64
  },
  subtitle: {
    color: materialColors.blackPrimary
  },
  text: {
    color: materialColors.blackPrimary,
    lineHeight: 24
  },
  chapters: {
    paddingLeft: 16
  }
})

// const images = $('img').map((i, e) => $(e).attr('src')).get().filter((v, i) => i > 1).map(v => `http://${v}`)
