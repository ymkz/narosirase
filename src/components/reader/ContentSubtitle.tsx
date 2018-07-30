import * as React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { color } from 'src/constants'

interface Props {
  subtitle: string
}

const ContentSubtitle: React.SFC<Props> = ({ subtitle }) => (
  <View style={styles.container}>
    <Text style={styles.subtitle}>{subtitle}</Text>
  </View>
)

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
