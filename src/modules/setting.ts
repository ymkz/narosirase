import { actionCreatorFactory } from 'typescript-fsa'
import { reducerWithInitialState } from 'typescript-fsa-reducers'

export interface SettingState {
  fontSize: number
  lineHeight: number
  expandWord: boolean
}

const actionCreator = actionCreatorFactory('setting')
const initialState: SettingState = {
  fontSize: 14,
  lineHeight: 20,
  expandWord: true
}

export const settingActions = {
  changeFontSize: actionCreator<number>('FONT_SIZE'),
  changeLineHeight: actionCreator<number>('LINE_HEIGHT'),
  changeExpandWord: actionCreator<boolean>('EXPAND_WORD')
}

export default reducerWithInitialState(initialState)
  .case(settingActions.changeFontSize, (state, payload) => ({
    ...state,
    fontSize: payload
  }))
  .case(settingActions.changeLineHeight, (state, payload) => ({
    ...state,
    lineHeight: payload
  }))
  .case(settingActions.changeExpandWord, (state, payload) => ({
    ...state,
    expandWord: payload
  }))
