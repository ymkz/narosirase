import * as React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { color } from 'src/constants'
import { NovelChapter } from 'src/modules/novels'

interface Props {
  chapter: NovelChapter
}

const Chapter: React.SFC<Props> = ({ chapter }) => {
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

export default Chapter

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
