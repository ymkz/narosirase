import React from 'react'
import { StyleSheet, View, WebView, Keyboard } from 'react-native'
import GestureRecognizer from 'react-native-swipe-gestures'
import { materialColors } from 'react-native-typography'
import { connect } from 'react-redux'
import { parse } from 'uri-js'
import { option, status } from '../constants'
import {
  errorHandler,
  novelObjectMapper,
  fetchNovelContents
} from '../functions'
import { novelAdd } from '../Novel/modules'
import Header from './Header'
import Searchbar from './Searchbar'

class AdditionContainer extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      input: '',
      editing: false,
      valid: false,
      uri: 'http://yomou.syosetu.com/rank/genretop'
    }
  }

  handleChangeTextInput = input => {
    this.setState({ input })
  }

  handleFocus = () => {
    this.setState({ editing: true })
  }

  handleBlur = () => {
    this.setState({ editing: false })
    Keyboard.dismiss()
  }

  handleSubmitEditing = () => {
    this.setState({ uri: this.state.input })
  }

  handleNavigationStateChange = ({ url }) => {
    this.setState({
      input: url,
      valid: RegExp('ncode.syosetu.com').test(url)
    })
  }

  handleAddition = async () => {
    if (!this.state.valid) {
      return false
    } else {
      const pathnames = parse(this.state.input).path.split('/')
      const ncode = pathnames[1]
      const index = Number(pathnames[2]) || 0
      const url = `http://api.syosetu.com/novelapi/api?ncode=${ncode}&out=json`
      const response = await fetch(url, option).catch(errorHandler)
      const json = await response.json()
      const data = novelObjectMapper(json[1])
      const reader = await fetchNovelContents(
        `https://ncode.syosetu.com/${ncode}/${index}`
      )
      const payload = {
        ...data,
        index,
        reader,
        status: status.reading
      }
      this.props.dispatch(novelAdd(payload))
      this.props.navigation.goBack()
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          navigation={this.props.navigation}
          valid={this.state.valid}
          handleSubmit={this.handleAddition}
        />
        <Searchbar
          value={this.state.input}
          editing={this.state.editing}
          handleChangeTextInput={this.handleChangeTextInput}
          handleFocus={this.handleFocus}
          handleBlur={this.handleBlur}
          handleSubmitEditing={this.handleSubmitEditing}
        />
        <GestureRecognizer
          onSwipeRight={() => this.web.goBack()}
          onSwipeLeft={() => this.web.goForward()}
          style={styles.container}
        >
          <WebView
            ref={ref => (this.web = ref)}
            source={{ uri: this.state.uri }}
            onNavigationStateChange={this.handleNavigationStateChange}
            style={styles.webview}
          />
        </GestureRecognizer>
      </View>
    )
  }
}

export default connect(({ novel }) => ({ novel }))(AdditionContainer)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: materialColors.whitePrimary
  }
})
