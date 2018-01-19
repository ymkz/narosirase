import { createStore, applyMiddleware } from 'redux'
import { persistStore, persistCombineReducers } from 'redux-persist'
import storage from 'redux-persist/es/storage'
import { reducer as nav } from './navigation'
import alert from './Alert/modules'

const reducer = persistCombineReducers(
  {
    key: 'root',
    storage: storage,
    blacklist: ['nav']
  },
  {
    nav,
    alert
  }
)

export const store = createStore(reducer, undefined, applyMiddleware())
export const persistor = persistStore(store)
