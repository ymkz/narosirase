import React from 'react'
import { StyleSheet, View } from 'react-native'
import Chapter from './Chapter'
import Episode from './Episode'

const IndexesComponent = ({ novel, promoteReading }) => (
  <View style={styles.container}>
    {novel.reader.chapters.map(chapter => (
      <View key={chapter.chapter}>
        <Chapter chapter={chapter.chapter} />
        {chapter.episodes.map(episode => (
          <Episode
            key={episode.index}
            subtitle={episode.subtitle}
            handlePress={() => promoteReading(episode.index)}
          />
        ))}
      </View>
    ))}
  </View>
)

export default IndexesComponent

const styles = StyleSheet.create({
  container: {
    paddingLeft: 16
  }
})
