// @ts-ignore
import { DangerZone } from 'expo'
import * as React from 'react'
import { StyleSheet, View } from 'react-native'
import wave from 'src/resources/wave.json'

interface Props {
  height: number
}

class ItemRefreshing extends React.PureComponent<Props> {
  animation: React.RefObject<DangerZone.Lottie> = React.createRef()

  componentDidMount() {
    this.animation.current.play()
  }

  render() {
    const { height } = this.props
    return (
      <View style={[styles.container, { height }]}>
        <DangerZone.Lottie ref={this.animation} source={wave} loop />
      </View>
    )
  }
}

export default ItemRefreshing

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center'
  }
})
