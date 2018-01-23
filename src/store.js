import { createStore, applyMiddleware } from 'redux'
import { persistStore, persistCombineReducers } from 'redux-persist'
import storage from 'redux-persist/es/storage'
import { reducer as nav } from './navigation'
import alert from './Alert/modules'
import novel from './Novel/modules'
import setting from './Setting/modules'

const reducer = persistCombineReducers(
  {
    key: 'root',
    storage: storage,
    whitelist: ['novel', 'setting']
  },
  {
    alert,
    nav,
    novel,
    setting
  }
)

export const store = createStore(reducer, undefined, applyMiddleware())
export const persistor = persistStore(store)
