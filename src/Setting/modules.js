import { createAction, createReducer } from 'redux-act'

export const changeFontSize = createAction('setting/change_font_size')
export const changeLineHeight = createAction('setting/change_line_height')
export const changeExpandComment = createAction('setting/change_expand_comment')

const initialState = {
  fontSize: 15,
  lineHeight: 20,
  expandComment: true
}

export default createReducer(
  {
    [changeFontSize]: (state, payload) => ({ ...state, fontSize: payload }),
    [changeLineHeight]: (state, payload) => ({ ...state, lineHeight: payload }),
    [changeExpandComment]: (state, payload) => ({
      ...state,
      expandComment: payload
    })
  },
  initialState
)
