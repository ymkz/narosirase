import { createAction, createReducer } from 'redux-act'

export const changeFontSize = createAction('setting/change_font_size')
export const changeLineHeight = createAction('setting/change_line_height')

const initialState = {
  fontSize: 15,
  lineHeight: 20
}

export default createReducer(
  {
    [changeFontSize]: (state, payload) => ({ ...state, payload }),
    [changeLineHeight]: (state, payload) => ({ ...state, payload })
  },
  initialState
)
