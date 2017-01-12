import {createActions} from 'redux-actions';

export const { loginUser } = createActions({
  LOGIN_USER: () => {
    return new Promise((res, rej) => {
      VK.Auth.login(({ session }) => {
        if (session) {
          res(session.user);
        }
        else {
          rej(new Error('Ошибка авторизации'))
        }
      }, 2); // запрос прав на доступ
    })

  },
});