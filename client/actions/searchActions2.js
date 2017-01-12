import {createActions} from 'redux-actions';

export const { handleSearch2 } = createActions({
  HANDLE_SEARCH_2: (q) => {
    return new Promise((res, rej) => {
      VK.Api.call('execute.quickSearch', { q }, ({ response, error }) => {
        if (response) {
          res(response)
        }
        else {
          rej(error)
        }
      });
    })
  },
});

export function selectUser2(id, friends) {
  return function (dispatch) {
    const pages = [...Array(Math.ceil(friends / 20))].map((_, i) => i);
    Promise.all(pages.map(page => getFriends(id, page))).then((fof) => dispatch({
      type:    'SELECT_USER_2',
      payload: {id, fof}
    }));
  }
}

function getFriends(id, page) {
  return new Promise((res, rej) => {
    setTimeout(() => VK.Api.call('execute.getFriendsOf20Friends', {
      id,
      page
    }, ({ response, error }) => {
      if (response) {
        res(response)
      }
      else {
        rej(error)
      }
    }), page * 400)
  });

}


