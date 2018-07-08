import * as React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { color } from 'src/constants'
import { Chapter } from 'src/modules/novels'

interface Props {
  chapter: Chapter
}

class NovelChapter extends React.PureComponent<Props> {
  render() {
    const { chapter } = this.props
    if (chapter) {
      return (
        <View style={styles.container}>
          <Text style={styles.chapter}>{chapter.chapter}</Text>
        </View>
      )
    } else {
      return null
    }
  }
}

export default NovelChapter

const styles = StyleSheet.create({
  container: {
    borderBottomColor: color.darkGray,
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 8,
    paddingBottom: 8,
    paddingTop: 32
  },
  chapter: {
    color: color.darkBlack,
    fontSize: 13,
    fontWeight: 'bold'
  }
})
