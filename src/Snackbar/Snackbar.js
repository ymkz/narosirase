import React from 'react'
import {
  Animated,
  Dimensions,
  Easing,
  InteractionManager,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View
} from 'react-native'
import ReactTimeout from 'react-timeout'

const DEFAULT_TIMEOUT = 3000
const DEFAULT_ANIMATION_DURATION = 200
const DEFAULT_BOTTOM = 128

const styles = StyleSheet.create({
  wrapper: {
    bottom: -DEFAULT_BOTTOM,
    left: 0,
    position: 'absolute',
    width: Dimensions.get('window').width
  },
  container: {
    padding: 16
  },
  message: {
    fontSize: 16
  }
})

class Snackbar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      transformOffsetY: new Animated.Value(0),
      transformOpacity: new Animated.Value(0)
    }
  }

  static defaultProps = {
    timeout: DEFAULT_TIMEOUT,
    animationDuration: DEFAULT_ANIMATION_DURATION,
    backgroundColor: '#607d8b',
    color: '#ffffff',
    containerStyle: {},
    messageStyle: {}
  }

  componentDidMount() {
    this.start()
  }

  start = () => {
    Animated.parallel([
      Animated.timing(this.state.transformOpacity, {
        toValue: 1,
        duration: this.props.animationDuration,
        easing: Easing.inOut(Easing.quad),
        useNativeDriver: true
      }),
      Animated.timing(this.state.transformOffsetY, {
        toValue: -DEFAULT_BOTTOM,
        duration: this.props.animationDuration,
        easing: Easing.inOut(Easing.quad),
        useNativeDriver: true
      })
    ]).start(() => {
      InteractionManager.runAfterInteractions(() => {
        this.props.setTimeout(() => {
          this.finish()
        }, this.props.timeout)
      })
    })
  }

  finish = () => {
    Animated.parallel([
      Animated.timing(this.state.transformOpacity, {
        toValue: 0,
        duration: this.props.animationDuration,
        easing: Easing.inOut(Easing.quad),
        useNativeDriver: true
      }),
      Animated.timing(this.state.transformOffsetY, {
        toValue: DEFAULT_BOTTOM,
        duration: this.props.animationDuration,
        easing: Easing.inOut(Easing.quad),
        useNativeDriver: true
      })
    ]).start(() => this.props.dismiss())
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={this.finish}>
        <Animated.View
          style={[
            styles.wrapper,
            {
              opacity: this.state.transformOpacity,
              transform: [{ translateY: this.state.transformOffsetY }]
            }
          ]}
        >
          <View style={[styles.container, { backgroundColor: this.props.backgroundColor }]}>
            <Text style={[styles.message, { color: this.props.color }]}>{this.props.message}</Text>
          </View>
        </Animated.View>
      </TouchableWithoutFeedback>
    )
  }
}

export default ReactTimeout(Snackbar)
