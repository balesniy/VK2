import {handleActions} from 'redux-actions';

function getState({ graph, payload }) {
  const friends = [].concat(...payload.fof).filter(i => i.friends);
  return [
    ...graph,
    {
      id:      payload.id,
      group:   0,
      _friends: friends.map(({ friends, id }) => ({
        id,
        group:    1,
        _friends: friends.map(id => ({
          id,
          group: 2
        }))
      }))
    }
  ]
}

export default handleActions({
  SELECT_USER:   (graph, { payload }) => getState({
    graph,
    payload
  }, []),
  SELECT_USER_2: (graph, { payload }) => getState({
    graph,
    payload
  }),
}, [])

