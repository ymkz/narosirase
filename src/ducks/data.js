import { createAction, createReducer } from 'redux-act'

export const add = createAction('ADD')
export const patch = createAction('PATCH')
export const remove = createAction('REMOVE')
export const refresh = createAction('REFRESH')
export const reset = createAction('RESET')

const initialState = []

export default createReducer({
  [add]: (state, payload) => state.filter(item => item.ncode === payload.ncode).length > 0 ? state : [payload, ...state],
  [patch]: (state, payload) => state.map(item => item.ncode === payload.ncode ? payload : item),
  [remove]: (state, payload) => [...state.data.filter(item => item.ncode !== payload)],
  [refresh]: (state, payload) => state.map(item => item.ncode === payload.ncode ? payload : item),
  [reset]: state => initialState
}, initialState)
