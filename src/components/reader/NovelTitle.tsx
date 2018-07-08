import * as React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { color } from 'src/constants'
import { NovelState } from 'src/modules/novels'

interface Props {
  novel: NovelState
}

class Title extends React.PureComponent<Props> {
  render() {
    const { novel } = this.props
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{novel.title}</Text>
        <View style={styles.wrapper}>
          <Text style={styles.writer}>{novel.writer}</Text>
        </View>
      </View>
    )
  }
}

export default Title

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 128,
    paddingHorizontal: 32
  },
  title: {
    color: color.black,
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 12
  },
  writer: {
    color: color.lightBlack,
    fontSize: 13,
    textAlign: 'center'
  }
})
