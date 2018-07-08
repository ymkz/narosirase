import { connect } from 'react-redux'
import { createStore } from 'redux'
import { persistCombineReducers, persistStore } from 'redux-persist'
import storage from 'redux-persist/es/storage'
import novels, { novelActions, NovelState } from 'src/modules/novels'
import setting, { settingActions, SettingState } from 'src/modules/setting'

const reducer = persistCombineReducers(
  {
    key: 'root',
    storage,
    whitelist: ['novels', 'setting']
  },
  {
    novels,
    setting
  }
)

const actions = {
  novelActions,
  settingActions
}

export type RootAction = typeof actions
export interface RootState {
  novels: NovelState[]
  setting: SettingState
}

export const store = createStore(reducer)
export const persistor = persistStore(store)
export const connector = <
  Props extends {} = {},
  Actions extends {} = {},
  Owns extends {} = {}
>(
  mapStateToProps: (state: RootState, props?: Owns) => Props,
  mapDispatchToProps?: (action: RootAction) => Actions
) => {
  return connect(
    mapStateToProps,
    mapDispatchToProps ? mapDispatchToProps(actions) : {}
  )
}
