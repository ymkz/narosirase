import { createAction, createReducer } from 'redux-act'

export const add = createAction('ADD')
export const patch = createAction('PATCH')
export const remove = createAction('REMOVE')
export const refresh = createAction('REFRESH')
export const reset = createAction('RESET')

const initialState = {
  data: []
}

export default createReducer({
  [add]: (state, payload) => Object.assign({}, state, {
    data: [...state.data, payload]
  }),
  [patch]: (state, payload) => Object.assign({}, state, {
    data: [...state.data.filter(item => item.ncode !== payload.ncode), payload]
  }),
  [remove]: (state, payload) => Object.assign({}, state, {
    data: [...state.data.filter(item => item.ncode !== payload.ncode)]
  }),
  [refresh]: (state, payload) => Object.assign({}, state, {
    data: [...state.data.filter(item => item.ncode !== payload.ncode), payload]
  }),
  [reset]: state => initialState
}, initialState)
