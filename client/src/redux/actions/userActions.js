import axios from 'axios';
import userConstants from '../constants/userConstants';

export const login = (loginCred) => async (dispatch) => {
  try {
    dispatch({ type: userConstants.USER_LOGIN_REQUEST });

    const { data } = await axios.post('/api/v1/users/login', loginCred);
    dispatch({ type: userConstants.USER_LOGIN_SUCCESS, payload: data });
  } catch (err) {
    dispatch({ type: userConstants.USER_LOGIN_FAIL });
  }
};

export const logout = (history) => (dispatch) => {
  dispatch({ type: userConstants.USER_LOGOUT });
  history.push('/');
};

export const register = (registerData, history) => async (dispatch) => {
  try {
    dispatch({ type: userConstants.USER_REGISTER_REQUEST });
    const { data } = await axios.post('/api/v1/users/register', registerData);
    dispatch({ type: userConstants.USER_REGISTER_SUCCESS });
    dispatch({ type: userConstants.USER_LOGIN_SUCCESS, payload: data });

    history.push('/');
  } catch (err) {
    dispatch({ type: userConstants.USER_REGISTER_FAIL });
  }
};
