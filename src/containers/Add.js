import React, { Component } from 'react'
import { StyleSheet, View, Keyboard, Text } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements'
import { add, reset } from '../ducks/data'

export default class Main extends Component {
  constructor (props) {
    super(props)
    this.state = {
      text: undefined,
      disabled: true,
      error: false
    }
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
    fetch(`http://api.syosetu.com/novelapi/api?ncode=${this.state.text}&out=json`, {
      'Content-Type': 'application/json',
      'Accepted': 'application/json'
    }).then(response => {
      return response.json()
    }).then(json => {
      this.props.dispatch(add({
        title: json[1].title,
        writer: json[1].writer,
        ncode: json[1].ncode,
        ep_last: json[1].general_all_no,
        ep_now: 0
      }))
    })
    Actions.pop()
  }

  render () {
    return (
      <View style={styles.container}>
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
