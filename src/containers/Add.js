import React, { Component } from 'react'
import { StyleSheet, View, Keyboard, Text, PanResponder } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements'
import { add, reset } from '../ducks/data'
import { notify, hide } from '../ducks/notify'

export default class Main extends Component {
  constructor (props) {
    super(props)
    this.state = {
      text: undefined,
      disabled: true,
      error: false
    }
  }

  componentWillMount () {
    this.panResponder = PanResponder.create({
      onShouldBlockNativeResponder: (e, gesture) => true,
      onStartShouldSetPanResponder: (e, gesture) => true,
      onStartShouldSetPanResponderCapture: (e, gesture) => true,
      onPanResponderTerminationRequest: (e, gesture) => true,
      onPanResponderGrant: (e, gesture) => Keyboard.dismiss()
    })
  }

  handleChangeText = (text) => {
    if (text.length < 1) {
      this.setState({ error: true, disabled: true })
    } else {
      this.setState({ text: text, error: false, disabled: false })
    }
  }

  handleCancel = () => {
    Keyboard.dismiss()
    Actions.pop()
  }

  handleSubmit = () => {
    Keyboard.dismiss()
    this.setState({ disabled: true })
    if (this.props.data.filter(item => item.ncode === this.state.text).length > 0) {
      this.props.dispatch(notify('既に存在する小説です'))
      setTimeout(() => this.props.dispatch(hide()), 3000)
    } else {
      fetch(`http://api.syosetu.com/novelapi/api?ncode=${this.state.text}&out=json`, {
        'Content-Type': 'application/json',
        'Accepted': 'application/json'
      }).then(response => {
        return response.json()
      }).then(json => {
        const payload = {
          ncode: json[1].ncode,
          title: json[1].title,
          writer: json[1].writer,
          ep_last: json[1].general_all_no,
          ep_now: 0
        }
        this.props.dispatch(add(payload))
        this.props.dispatch(notify('新しい小説を追加しました'))
        setTimeout(() => this.props.dispatch(hide()), 3000)
      })
    }
    Actions.pop()
  }

  render () {
    return (
      <View style={styles.container} {...this.panResponder.panHandlers}>
        <View style={styles.header}>
          <Text style={styles.cancel} onPress={this.handleCancel}>Cancel</Text>
        </View>
        <View style={styles.form}>
          <FormLabel>NCODE</FormLabel>
          <FormInput onChangeText={this.handleChangeText} autoCapitalize='none' keyboardType='url' autoFocus />
          {this.state.error &&
            <FormValidationMessage>入力が正しくありません</FormValidationMessage>
          }
        </View>
        <Button title='追加' onPress={this.handleSubmit} disabled={this.state.disabled} style={styles.submit} />
        <Button title='reset' onPress={() => this.props.dispatch(reset())} style={styles.submit} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20
  },
  header: {
    height: 40,
    paddingRight: 20,
    alignItems: 'flex-end',
    justifyContent: 'center'
  },
  cancel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#757575'
  },
  form: {
    margin: 8
  },
  submit: {
    margin: 12
  }
})
