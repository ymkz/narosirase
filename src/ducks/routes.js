import { createReducer } from 'redux-act'
import { ActionConst } from 'react-native-router-flux'

const initialState = {
  scene: {}
}

export default createReducer({
  [ActionConst.FOCUS]: (state, payload) => Object.assign({}, state, {
    scene: payload
  })
}, initialState)
