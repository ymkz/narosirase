import * as React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import NovelAbstract from 'src/components/Reader/NovelAbstract'
import NovelChapter from 'src/components/Reader/NovelChapter'
import NovelEpisode from 'src/components/Reader/NovelEpisode'
import NovelTitle from 'src/components/Reader/NovelTitle'
import NovelUpdatedAt from 'src/components/Reader/NovelUpdatedAt'
import { color } from 'src/constants'
import { NovelState } from 'src/modules/novels'

interface Props {
  novel: NovelState
  move: (page: number) => void
}

const PageIndex: React.SFC<Props> = ({ novel, move }) => (
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
          {chapter.episodes.map((episode, episodeIndex) => (
            <NovelEpisode key={`${episode.page}-${episodeIndex}`} episode={episode} move={move} />
          ))}
        </View>
      ))}
    </View>
  </View>
)

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
