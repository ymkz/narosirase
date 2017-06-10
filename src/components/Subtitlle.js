import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

export default ({ item }) => (
  <View style={styles.sub}>
    <Text style={styles.writer}>{item.writer}</Text>
    <Text style={styles.ep}>{item.ep_now}話 / 全{item.ep_last}話</Text>
  </View>
)

const styles = StyleSheet.create({
  sub: {
    paddingHorizontal: 10,
    paddingTop: 5
  },
  writer: {
    color: '#646464'
  },
  ep: {
    color: '#646464'
  }
})
