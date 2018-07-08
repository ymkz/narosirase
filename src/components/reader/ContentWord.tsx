import { Entypo } from '@expo/vector-icons'
import * as React from 'react'
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import { color } from 'src/constants'

interface Props {
  word: string
  pre?: boolean
  post?: boolean
  expandWord: boolean
}

interface State {
  open: boolean
}

class ContentWord extends React.PureComponent<Props, State> {
  state = {
    open: this.props.expandWord
  }

  handlePress = () => {
    this.setState({ open: !this.state.open })
  }

  render() {
    const { word, pre } = this.props
    const { open } = this.state

    if (word) {
      return (
        <View style={styles.container}>
          <TouchableWithoutFeedback onPress={this.handlePress}>
            <View style={styles.collapse}>
              <Entypo
                name={open ? 'chevron-small-down' : 'chevron-small-right'}
                color={color.darkGray}
                size={16}
              />
              <Text style={styles.text}>{pre ? 'まえがき' : 'あとがき'}</Text>
            </View>
          </TouchableWithoutFeedback>
          {open && (
            <TouchableWithoutFeedback onPress={this.handlePress}>
              <View>
                <Text style={styles.word}>{word}</Text>
              </View>
            </TouchableWithoutFeedback>
          )}
        </View>
      )
    } else {
      return null
    }
  }
}

export default ContentWord

const styles = StyleSheet.create({
  container: {
    paddingVertical: 32
  },
  collapse: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  text: {
    color: color.lightBlack
  },
  word: {
    color: color.lightBlack,
    lineHeight: 20
  }
})
