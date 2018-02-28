import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { iOSColors } from 'react-native-typography'
import { Octicons } from '@expo/vector-icons'

class CommentComponent extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      open: props.setting.expandComment
    }
  }

  render() {
    if (!this.props.comment) return null
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => this.setState({ open: !this.state.open })}
          style={styles.collapse}
        >
          <Octicons
            name={this.state.open ? 'triangle-down' : 'triangle-right'}
            color={iOSColors.gray}
            size={16}
          />
          <Text style={styles.text}>{this.props.foreword ? 'まえがき' : 'あとがき'}</Text>
        </TouchableOpacity>
        {this.state.open && (
          <TouchableOpacity onPress={() => this.setState({ open: !this.state.open })}>
            <Text style={styles.comment}>{this.props.comment}</Text>
          </TouchableOpacity>
        )}
      </View>
    )
  }
}

export default CommentComponent

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16
  },
  collapse: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  text: {
    color: iOSColors.gray,
    paddingBottom: 1
  },
  comment: {
    color: iOSColors.gray,
    lineHeight: 20
  }
})
