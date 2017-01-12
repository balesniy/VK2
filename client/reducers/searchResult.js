import {handleActions} from 'redux-actions';
import {handleSearch} from '../actions/searchActions'
export default handleActions({
  [handleSearch]: (state, { payload }) => ({ result: [...payload] }),
  SELECT_USER:    (state, { payload }) => {
    // const friends = [].concat(...payload.fof).filter(i => i.friends);

    return {
      //friends,
      result:     state.result.filter(i => i.id === payload.id),
    }
  }
}, {
  result:     [],
  //friends:    [],

})