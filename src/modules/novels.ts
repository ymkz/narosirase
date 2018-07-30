import { Status } from 'src/modules/status'
import { actionCreatorFactory } from 'typescript-fsa'
import { reducerWithInitialState } from 'typescript-fsa-reducers'

const actionCreator = actionCreatorFactory('novels')

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

export interface NovelEpisode {
  page: number
  subtitle: string
}

export interface NovelChapter {
  chapter: string
  episodes: NovelEpisode[]
}

export interface NovelIndex {
  chapters: NovelChapter[]
}

export interface NovelContent {
  subtitle: string
  body: string
  foreword: string
  afterword: string
  images: string[]
}

export interface NovelState extends NovelData {
  index: NovelIndex
  contents: NovelContent
  scrollOffset: number
  status: Status
  page: number
}

export const novelsInitialState: NovelState[] = []

export const novelsAction = {
  resetNovel: actionCreator('RESET'),
  addNovel: actionCreator<NovelState>('ADD'),
  sortNovel: actionCreator<NovelState[]>('SORT'),
  patchNovel: actionCreator<NovelState>('PATCH'),
  removeNovel: actionCreator<NovelState>('REMOVE'),
  hydrateNovel: actionCreator<NovelState[]>('HYDRATE')
}

export type NovelsAction = typeof novelsAction

export const novelsReducer = reducerWithInitialState(novelsInitialState)
  .case(novelsAction.resetNovel, () => novelsInitialState)
  .case(novelsAction.sortNovel, (_, payload) => payload)
  .case(novelsAction.addNovel, (state, payload) => {
    if (!state.find(novel => novel.ncode === payload.ncode)) {
      return [payload, ...state]
    } else {
      return state
    }
  })
  .case(novelsAction.patchNovel, (state, payload) =>
    state.map(novel => (novel.ncode === payload.ncode ? payload : novel))
  )
  .case(novelsAction.removeNovel, (state, payload) => {
    return state.filter(item => item.ncode !== payload.ncode)
  })
  .case(novelsAction.hydrateNovel, (state, payload) =>
    [...state, ...payload].filter(
      (item, index, self) => self.map(novel => novel.ncode).indexOf(item.ncode) === index
    )
  )
  .build()
