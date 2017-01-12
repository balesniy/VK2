import {combineReducers} from 'redux'
import user from './user'
import searchResult from './searchResult'
import searchResult2 from './searchResult2'
import graph from './graph'

export default combineReducers({
  user,
  searchResult,
  searchResult2,
  graph
})