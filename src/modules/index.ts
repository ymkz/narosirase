import { createStore } from 'redux'
import { persistCombineReducers, PersistConfig, persistStore } from 'redux-persist'
import storage from 'redux-persist/es/storage'
import { novelsReducer, NovelState } from 'src/modules/novels'
import { settingReducer, SettingState } from 'src/modules/setting'
import { Status, statusReducer } from 'src/modules/status'

const config: PersistConfig = {
  key: 'root',
  storage,
  whitelist: ['novels', 'setting', 'status']
}

const reducers = {
  novels: novelsReducer,
  setting: settingReducer,
  status: statusReducer
}

const persistedReducers = persistCombineReducers(config, reducers)

export interface Store {
  novels: NovelState[]
  setting: SettingState
  status: Status
}

export const store = createStore(persistedReducers)

export const persistor = persistStore(store)
