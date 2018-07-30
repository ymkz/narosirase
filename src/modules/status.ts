import { actionCreatorFactory } from 'typescript-fsa'
import { reducerWithInitialState } from 'typescript-fsa-reducers'

const actionCreator = actionCreatorFactory('status')

export enum Status {
  reading = 'reading',
  pending = 'pending',
  archive = 'archive'
}

export const statusInitialState: Status = Status.reading

export const statusAction = {
  patchStatus: actionCreator<Status>('PATCH_STATUS')
}

export type StatusAction = typeof statusAction

export const statusReducer = reducerWithInitialState(statusInitialState)
  .case(statusAction.patchStatus, (_, payload) => payload)
  .build()
