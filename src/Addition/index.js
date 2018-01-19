import React from 'react'
import { StyleSheet, View, WebView, Keyboard } from 'react-native'
import GestureRecognizer from 'react-native-swipe-gestures'
import { materialColors } from 'react-native-typography'
import { parse } from 'uri-js'
import Header from './Header'
import Searchbar from './Searchbar'
// uri: 'https://www.google.co.jp/search?q='

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
    this.setState({ input: url, valid: RegExp('ncode.syosetu.com').test(url) })
  }

  handleSubmit = () => {
    if (!this.state.valid) {
      return false
    } else {
      const parsedURL = parse(this.state.input)
      const pathnames = parsedURL.path.split('/')
      const ncode = pathnames[1]
      const ep = Number(pathnames[2]) || 0
      console.log(`ncode: ${ncode}, ep: ${ep}`)
      this.props.navigation.goBack()
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          navigation={this.props.navigation}
          valid={this.state.valid}
          handleSubmit={this.handleSubmit}
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

export default AdditionContainer

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: materialColors.whitePrimary
  }
})
