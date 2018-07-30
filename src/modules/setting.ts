import { actionCreatorFactory } from 'typescript-fsa'
import { reducerWithInitialState } from 'typescript-fsa-reducers'

const actionCreator = actionCreatorFactory('setting')

export interface SettingState {
  fontSize: number
  lineHeight: number
  expandWord: boolean
  hideStatusbar: boolean
  backOnAdd: boolean
}

const initialState: SettingState = {
  fontSize: 14,
  lineHeight: 20,
  expandWord: true,
  hideStatusbar: true,
  backOnAdd: true
}

export const settingAction = {
  changeFontSize: actionCreator<number>('FONT_SIZE'),
  changeLineHeight: actionCreator<number>('LINE_HEIGHT'),
  changeExpandWord: actionCreator<boolean>('EXPAND_WORD'),
  changeHideStatusbar: actionCreator<boolean>('HIDE_STATUSBAR'),
  changeBackOnAdd: actionCreator<boolean>('BACK_ON_ADD')
}

export type SettingAction = typeof settingAction

export const settingReducer = reducerWithInitialState(initialState)
  .case(settingAction.changeFontSize, (state, payload) => ({
    ...state,
    fontSize: payload
  }))
  .case(settingAction.changeLineHeight, (state, payload) => ({
    ...state,
    lineHeight: payload
  }))
  .case(settingAction.changeExpandWord, (state, payload) => ({
    ...state,
    expandWord: payload
  }))
  .case(settingAction.changeHideStatusbar, (state, payload) => ({
    ...state,
    hideStatusbar: payload
  }))
  .case(settingAction.changeBackOnAdd, (state, payload) => ({
    ...state,
    backOnAdd: payload
  }))
  .build()
