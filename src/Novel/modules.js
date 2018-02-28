import { createAction, createReducer } from 'redux-act'

export const novelPurge = createAction('novel/purge')
export const novelAdd = createAction('novel/add')
export const novelPatch = createAction('novel/patch')
export const novelRemove = createAction('novel/remove')
export const novelHydrate = createAction('novel/hydrate')

const initialState = []

export default createReducer(
  {
    [novelPurge]: () => initialState,
    [novelAdd]: (state, payload) => [payload, ...state],
    [novelPatch]: (state, payload) =>
      state.map(item => (item.ncode === payload.ncode ? payload : item)),
    [novelRemove]: (state, payload) => state.filter(item => item.ncode !== payload.ncode),
    [novelHydrate]: (state, payload) =>
      [...state, ...payload].filter(
        (item, index, self) => self.map(v => v.ncode).indexOf(item.ncode) === index
      )
  },
  initialState
)
