import React, { Component } from 'react'
import { AsyncStorage, ActivityIndicator } from 'react-native'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider, connect } from 'react-redux'
import { persistStore, autoRehydrate } from 'redux-persist'
import { Router, Scene } from 'react-native-router-flux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'

import reducers from './src/ducks'

import Main from './src/containers/Main'
import Add from './src/containers/Add'
import Web from './src/components/Web'

const RouterWithRedux = connect()(Router)
const store = compose(
  applyMiddleware(thunk, logger),
  autoRehydrate()
)(createStore)(reducers)

export default class App extends Component {
  constructor () {
    super()
    this.state = {
      hydrated: false
    }
  }

  componentWillMount () {
    persistStore(store, { storage: AsyncStorage }, () => {
      this.setState({ hydrated: true })
    })
  }

  render () {
    if (this.state.hydrated) {
      return (
        <Provider store={store}>
          <RouterWithRedux>
            <Scene key='root'>
              <Scene key='main' title='小説リスト' component={Main} />
              <Scene key='add' title='追加' component={Add} direction='vertical' hideNavBar />
              <Scene key='web' title='ウェブ' component={Web} hideNavBar />
            </Scene>
          </RouterWithRedux>
        </Provider>
      )
    } else {
      return (
        <ActivityIndicator animating={!this.state.hydrated} size='large' style={{ paddingTop: 200 }} />
      )
    }
  }
}
