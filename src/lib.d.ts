declare module '*.json'
declare module '*.png'
declare module 'url'
declare module 'rn-snackbar'
declare module 'react-native-cheerio'
declare module 'react-native-draggable-flatlist'
declare module 'redux-persist/es/integration/react'

interface DraggableItem<T> {
  index: number
  isActive: boolean
  item: T
  move: () => void
  moveEnd: () => void
}

interface DraggableMoveEnd<T> {
  data: T[]
  from: number
  row: T
  to: number
}

type SharedAction = 'sharedAction' | 'dismissedAction'

interface ShareResult {
  action: SharedAction
  activityType?: string
}
