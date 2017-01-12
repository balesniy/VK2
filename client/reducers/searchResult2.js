import {handleActions} from 'redux-actions';
import {handleSearch2} from '../actions/searchActions2'
export default handleActions({
  [handleSearch2]: (state, { payload }) => ({ result: [...payload] }),
  SELECT_USER_2:    (state, { payload }) => {
    //const friends = [].concat(...payload.fof).filter(i => i.friends);
    return {
      //friends,
      result:     state.result.filter(i => i.id === payload.id),
    }
  }
}, {
  result:     [],
  //friends:    [],
})