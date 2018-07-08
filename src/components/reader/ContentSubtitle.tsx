import * as React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { color } from 'src/constants'

interface Props {
  subtitle: string
}

class ContentSubtitle extends React.PureComponent<Props> {
  render() {
    const { subtitle } = this.props
    return (
      <View style={styles.container}>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
    )
  }
}

export default ContentSubtitle

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 64
  },
  subtitle: {
    color: color.black,
    fontWeight: 'bold'
  }
})
