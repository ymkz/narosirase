import { createAction, createReducer } from 'redux-act'

export const alertShow = createAction('alert/show')
export const alertPatch = createAction('alert/patch')
export const alertHide = createAction('alert/hide')

const initialState = {
  visible: false,
  message: ''
}

export default createReducer(
  {
    [alertShow]: (state, payload) => ({
      ...state,
      visible: true,
      message: payload
    }),
    [alertPatch]: (state, payload) => ({ ...state, message: payload }),
    [alertHide]: state => ({ ...state, visible: false })
  },
  initialState
)
