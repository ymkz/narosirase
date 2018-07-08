import * as React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { color } from 'src/constants'
import { Episode } from 'src/modules/novels'

interface Props {
  episode: Episode
  move: (page: number) => void
}

class NovelEpisode extends React.PureComponent<Props> {
  render() {
    const { episode, move } = this.props
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => move(episode.page)}
          style={styles.inner}
        >
          <Text style={styles.episode}>{episode.subtitle}</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default NovelEpisode

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
