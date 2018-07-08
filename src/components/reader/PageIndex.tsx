import * as React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import NovelAbstract from 'src/components/reader/NovelAbstract'
import NovelChapter from 'src/components/reader/NovelChapter'
import NovelEpisode from 'src/components/reader/NovelEpisode'
import NovelTitle from 'src/components/reader/NovelTitle'
import NovelUpdatedAt from 'src/components/reader/NovelUpdatedAt'
import { color } from 'src/constants'
import { NovelState } from 'src/modules/novels'

interface Props {
  novel: NovelState
  move: (page: number) => void
}

class PageIndex extends React.PureComponent<Props> {
  render() {
    const { novel, move } = this.props
    return (
      <View style={styles.container}>
        <NovelTitle novel={novel} />
        <NovelAbstract novel={novel} />
        <Text onPress={() => move(novel.page + 1)} style={styles.start}>
          読み始める
        </Text>
        <NovelUpdatedAt novel={novel} />
        <View style={styles.episodes}>
          {novel.index.chapters.map((chapter, chapterIndex) => (
            <View key={`${chapter.chapter}-${chapterIndex}`}>
              <NovelChapter chapter={chapter} />
              {chapter.episodes.map((episode, episodeIndex) => {
                return (
                  <NovelEpisode
                    key={`${episode.page}-${episodeIndex}`}
                    episode={episode}
                    move={move}
                  />
                )
              })}
            </View>
          ))}
        </View>
      </View>
    )
  }
}

export default PageIndex

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.white,
    flex: 1,
    paddingBottom: 64
  },
  start: {
    color: color.blue,
    textAlign: 'center'
  },
  episodes: {
    paddingLeft: 16
  }
})
