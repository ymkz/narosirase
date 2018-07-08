import * as React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { color } from 'src/constants'
import { NovelState } from 'src/modules/novels'

interface Props {
  novel: NovelState
}

class NovelAbstract extends React.PureComponent<Props> {
  render() {
    const { novel } = this.props
    return (
      <View style={styles.container}>
        <Text style={styles.abstract}>{novel.abstract}</Text>
      </View>
    )
  }
}

export default NovelAbstract

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingBottom: 32
  },
  abstract: {
    color: color.black,
    fontSize: 13,
    lineHeight: 15
  }
})
