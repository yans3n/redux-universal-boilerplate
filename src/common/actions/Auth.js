import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  TEST_USERNAME,
  TEST_PASSWORD
} from '../constants/actions/Auth';

const fakeUser = {
  username: 'demo',
  token: 'ojn2jr3wrefj'
};

/**
 * @param  {string} username Username value for `login` request
 * @param  {string} password Password value for `login` request
 *
 * @return {function} Login async action
 */
export function login(username, password) {
  return async (dispatch) => {
    try {
      let validCredentials = username !== TEST_USERNAME && password !== TEST_PASSWORD;
      if (validCredentials) {
        throw new Error('Bad credentials');
      }

      dispatch({
        type: LOGIN_SUCCESS,
        result: fakeUser
      });
    } catch (error) {
      dispatch({
        type: LOGIN_FAILURE,
        error: error.message
      });
    }
  };
}

/**
 * @return {function} Logout async action
 */
export function logout() {
  return async (dispatch) => {
    try {
      dispatch({
        type: LOGOUT_SUCCESS
      });
    } catch (error) {
      dispatch({
        type: LOGOUT_FAILURE,
        error: error.message
      });
    }
  };
}
