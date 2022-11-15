import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import API from '../constants/API';

const ACCESS_TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

const Users = [
  {
    uid: 1,
    username: 'ui-react',
    role: 'admin',
    password: 'uireact',
    email: 'ui-react@imaginato.com',
  },
];

const MockAPI = () => {
  // This sets the mock adapter on the default instance
  const mock = new MockAdapter(axios);
  mock.onPost(API.login.post).reply((config: any) => {
    const user = JSON.parse(config.data);
    const validUser = Users.filter(
      (usr) => usr.username === user.username && usr.password === user.password,
    );

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (validUser.length === 1) {
          // You have to generate AccessToken by jwt. but this is fakeBackend so, right now its dummy
          const token = ACCESS_TOKEN;

          // JWT AccessToken
          const tokenObj = { accessToken: token }; // Token Obj
          const userObj = {
            uid: validUser[0].uid,
            username: validUser[0].username,
            role: validUser[0].role,
            email: validUser[0].email,
          };
          const validUserObj = { ...userObj, ...tokenObj }; // validUser Obj

          resolve([
            200,
            {
              success: true,
              results: validUserObj,
            },
          ]);
        } else {
          reject(
            new Error(
              'Username and password are invalid. Please enter correct username and password',
            ),
          );
        }
      });
    });
  });

  mock.onPost(API.register.post).reply((config: any) => {
    const user = JSON.parse(config.data);
    const uidObj = {
      uid: 2,
      role: 'admin',
    };
    const userObj = { ...user, ...uidObj };
    Users.push(userObj);
    return new Promise((resolve, reject) => {
      if (resolve) {
        setTimeout(() => {
          resolve([
            200,
            {
              success: true,
              results: userObj,
            },
          ]);
        });
      } else {
        reject(
          new Error(
            'Email and password are invalid. Please enter correct email and password',
          ),
        );
      }
    });
  });
};

export default MockAPI;
