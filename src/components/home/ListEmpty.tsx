// @ts-ignore
import { DangerZone } from 'expo'
import * as React from 'react'
import { StyleSheet, View } from 'react-native'
import empty from 'src/resources/empty.json'

class ListEmpty extends React.PureComponent {
  animation: React.RefObject<DangerZone.Lottie> = React.createRef()

  componentDidMount() {
    this.animation.current.play()
  }

  render() {
    return (
      <View style={styles.container}>
        <DangerZone.Lottie ref={this.animation} source={empty} loop />
      </View>
    )
  }
}

export default ListEmpty

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 64,
    padding: 128
  }
})
