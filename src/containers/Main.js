import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import ActionButton from 'react-native-action-button'
import Zero from '../components/Zero'
import Novel from '../components/Novel'
import StatusBarAlert from 'react-native-statusbar-alert'

class Main extends Component {
  render () {
    return (
      <View style={styles.container}>
        <StatusBarAlert
          visible={this.props.notify.visible}
          message={this.props.notify.message}
          backgroundColor='#607D8B'
          color='white'
        />
        {this.props.data.length === 0
          ? <Zero />
          : <Novel data={this.props.data} dispatch={this.props.dispatch} />
        }
        <ActionButton buttonColor='rgba(231, 76, 60, 1)' onPress={() => Actions.add(this.props.dispatch)} />
      </View>
    )
  }
}

function mapStateToProps ({ data, notify }) {
  return {
    data,
    notify
  }
}

export default connect(mapStateToProps)(Main)

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
