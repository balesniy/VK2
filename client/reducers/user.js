import {handleActions} from 'redux-actions';
import {loginUser} from '../actions/userActions'
export default handleActions({
  [loginUser]: (state, { payload }) => ({ ...payload }),
}, {})