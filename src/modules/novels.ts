import { actionCreatorFactory } from 'typescript-fsa'
import { reducerWithInitialState } from 'typescript-fsa-reducers'

export enum Status {
  reading = 'reading',
  pending = 'pending',
  archive = 'archive'
}

export interface NovelData {
  ncode: string
  title: string
  userid: number
  writer: string
  isShort: boolean
  isStop: boolean
  isEnd: boolean
  abstract: string
  genre: string
  keywords: string[]
  publishedAt: string
  lastPostedAt: string
  lastUpdatedAt: string
  time: string
  episodes: number
}

export interface Episode {
  page: number
  subtitle: string
}

export interface Chapter {
  chapter: string
  episodes: Episode[]
}

export interface Index {
  chapters: Chapter[]
}

export interface Content {
  subtitle: string
  body: string
  foreword: string
  afterword: string
  images: string[]
}

export interface NovelState extends NovelData {
  index: Index
  contents: Content
  scrollOffset: number
  status: Status
  page: number
}

const actionCreator = actionCreatorFactory('novels')
const initialState: NovelState[] = []

export const novelActions = {
  novelPurge: actionCreator('PURGE'),
  novelAdd: actionCreator<NovelState>('Add'),
  novelPatch: actionCreator<NovelState>('PATCH'),
  novelRemove: actionCreator<NovelState>('REMOVE'),
  novelHydrate: actionCreator<NovelState[]>('HYDRATE')
}

export default reducerWithInitialState(initialState)
  .case(novelActions.novelPurge, () => initialState)
  .case(novelActions.novelAdd, (state, payload) => {
    if (!state.find(novel => novel.ncode === payload.ncode)) {
      return [payload, ...state]
    } else {
      return state
    }
  })
  .case(novelActions.novelPatch, (state, payload) => {
    return state.map(item => (item.ncode === payload.ncode ? payload : item))
  })
  .case(novelActions.novelRemove, (state, payload) => {
    return state.filter(item => item.ncode !== payload.ncode)
  })
  .case(novelActions.novelHydrate, (state, payload) => {
    return [...state, ...payload].filter(
      (item, index, self) =>
        self.map(novel => novel.ncode).indexOf(item.ncode) === index
    )
  })
