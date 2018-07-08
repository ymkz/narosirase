import { AppLoading } from 'expo'
import * as React from 'react'
import { Modal, Router, Scene, Stack } from 'react-native-router-flux'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/es/integration/react'
import Add from 'src/components/add'
import Home from 'src/components/home'
import Reader from 'src/components/reader'
import Setting from 'src/components/setting'
import { persistor, store } from 'src/modules'

export default class App extends React.PureComponent {
  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={<AppLoading />}>
          <Router>
            <Modal key="ROOT" hideNavBar>
              <Stack hideNavBar>
                <Scene key="HOME" component={Home} />
                <Scene key="READER" component={Reader} />
              </Stack>
              <Stack hideNavBar>
                <Scene key="ADD" component={Add} />
                <Scene key="WEB" component={Add} />
              </Stack>
              <Scene key="SETTING" component={Setting} hideNavBar />
            </Modal>
          </Router>
        </PersistGate>
      </Provider>
    )
  }
}
