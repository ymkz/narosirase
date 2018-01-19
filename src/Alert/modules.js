import { createAction, createReducer } from 'redux-act'

export const show = createAction('alert/show')
export const patch = createAction('alert/patch')
export const hide = createAction('alert/hide')

const initialState = {
  visible: false,
  message: ''
}

export default createReducer(
  {
    [show]: state => ({ ...state, visible: true }),
    [patch]: (state, payload) => ({ ...state, message: payload }),
    [hide]: state => ({ ...state, visible: false })
  },
  initialState
)
