import { BlurView } from 'expo'
import * as React from 'react'
import { StyleSheet, Text } from 'react-native'

interface Props {
  refreshing: boolean
}

const ListRefreshing: React.SFC<Props> = ({ refreshing }) => {
  if (refreshing) {
    return (
      <BlurView tint="light" intensity={50} style={styles.container}>
        <Text>loading</Text>
      </BlurView>
    )
  } else {
    return null
  }
}

export default ListRefreshing

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
    ...StyleSheet.absoluteFillObject
  }
})
