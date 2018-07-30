import { AppLoading } from 'expo'
import * as React from 'react'
import { Modal, Router, Scene, Stack } from 'react-native-router-flux'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/es/integration/react'
import Add from 'src/components/Add'
import Home from 'src/components/Home'
import Reader from 'src/components/Reader'
import Setting from 'src/components/Setting'
import { persistor, store } from 'src/modules'

const App: React.SFC = () => (
  <Provider store={store}>
    <PersistGate persistor={persistor} loading={<AppLoading />}>
      <Router>
        <Modal key="ROOT" hideNavBar={true}>
          <Stack hideNavBar={true}>
            <Scene key="HOME" component={Home} initial={true} />
            <Scene key="READER" component={Reader} />
          </Stack>
          <Stack hideNavBar={true}>
            <Scene key="ADD" component={Add} />
            <Scene key="WEB" component={Add} />
          </Stack>
          <Scene key="SETTING" component={Setting} hideNavBar={true} />
        </Modal>
      </Router>
    </PersistGate>
  </Provider>
)

export default App
