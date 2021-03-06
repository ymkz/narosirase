// @ts-ignore
import { DangerZone } from 'expo'
import * as React from 'react'
import { StyleSheet, View } from 'react-native'
import { color } from 'src/constants'
import loading from 'src/json/loading.json'

class Loading extends React.Component {
  animation: React.RefObject<DangerZone.Lottie> = React.createRef()

  componentDidMount() {
    this.animation.current.play()
  }

  render() {
    return (
      <View style={styles.container}>
        <DangerZone.Lottie ref={this.animation} source={loading} loop={true} />
      </View>
    )
  }
}

export default Loading

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.white,
    flex: 1,
    padding: 196
  }
})
