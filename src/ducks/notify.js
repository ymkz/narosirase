import { createAction, createReducer } from 'redux-act'

export const notify = createAction('NOTIFY')
export const hide = createAction('HIDE')

const initialState = {
  visible: false,
  message: ''
}

export default createReducer({
  [notify]: (state, payload) => Object.assign({}, state, {
    visible: true,
    message: payload
  }),
  [hide]: state => initialState
}, initialState)
