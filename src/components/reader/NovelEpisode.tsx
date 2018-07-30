import * as React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { color } from 'src/constants'
import { NovelEpisode } from 'src/modules/novels'

interface Props {
  episode: NovelEpisode
  move: (page: number) => void
}

const Episode: React.SFC<Props> = ({ episode, move }) => (
  <View style={styles.container}>
    <TouchableOpacity onPress={() => move(episode.page)} style={styles.inner}>
      <Text style={styles.episode}>{episode.subtitle}</Text>
    </TouchableOpacity>
  </View>
)

export default Episode

const styles = StyleSheet.create({
  container: {
    borderBottomColor: color.darkGray,
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  inner: {
    paddingHorizontal: 8,
    paddingVertical: 14
  },
  episode: {
    color: color.black,
    fontSize: 14,
    textAlignVertical: 'center'
  }
})
