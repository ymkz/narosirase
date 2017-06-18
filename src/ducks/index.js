import { combineReducers } from 'redux'
import routes from './routes'
import data from './data'
import notify from './notify'

export default combineReducers({
  routes,
  data,
  notify
})
