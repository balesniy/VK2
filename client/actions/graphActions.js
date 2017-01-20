import {createActions} from 'redux-actions';

export const { getPhoto } = createActions({
  GET_PHOTO: (list) => {
    return new Promise((res, rej) => {
      VK.api('users.get', {
        user_ids: list.join(','),
        fields:   'photo_50'
      }, (r) => {
        if (r.response) {
          res(r.response);
        }
        else {
          rej(new Error('Ошибка'))
        }
      });
    })

  },
});