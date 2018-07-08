import * as React from 'react'
import { StyleSheet, View } from 'react-native'
import { color } from 'src/constants'

class ListSeparator extends React.PureComponent {
  render() {
    return <View style={styles.separator} />
  }
}

export default ListSeparator

const styles = StyleSheet.create({
  separator: {
    borderTopColor: color.lightGray,
    borderTopWidth: StyleSheet.hairlineWidth
  }
})
