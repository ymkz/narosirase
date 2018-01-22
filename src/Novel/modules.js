import { createAction, createReducer } from 'redux-act'

export const purge = createAction('novel/purge')
export const add = createAction('novel/add')
export const patch = createAction('novel/patch')
export const remove = createAction('novel/remove')
export const hydrate = createAction('novel/hydrate')

const initialState = []

export default createReducer(
  {
    [purge]: () => initialState,
    [add]: (state, payload) => [payload, ...state],
    [patch]: (state, payload) =>
      state.map(item => (item.ncode === payload.ncode ? payload : item)),
    [remove]: (state, payload) =>
      state.filter(item => item.ncode !== payload.ncode),
    [hydrate]: (state, payload) =>
      [...state, ...payload].filter(
        (item, index, self) =>
          self.map(v => v.ncode).indexOf(item.ncode) === index
      )
  },
  initialState
)
