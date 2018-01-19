import React from 'react'
import { AppLoading } from 'expo'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/es/integration/react'
import { store, persistor } from './store'
import Navigation from './navigation'

const App = () => (
  <Provider store={store}>
    <PersistGate persistor={persistor} loading={<AppLoading />}>
      <Navigation />
    </PersistGate>
  </Provider>
)

export default App
