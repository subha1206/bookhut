import axios from 'axios';
import userConstants from '../constants/userConstants';

import { apiEndPoints } from '../../helper/API';
export const login = (loginCred) => async (dispatch) => {
  try {
    dispatch({ type: userConstants.USER_LOGIN_REQUEST });

    const { data } = await axios.post(apiEndPoints.USER_LOGIN, loginCred);
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
    const { data } = await axios.post(apiEndPoints.USER_REGISTER, registerData);
    dispatch({ type: userConstants.USER_REGISTER_SUCCESS });
    dispatch({ type: userConstants.USER_LOGIN_SUCCESS, payload: data });

    history.push('/');
  } catch (err) {
    dispatch({ type: userConstants.USER_REGISTER_FAIL });
  }
};

export const uploadProfilePic = (formData) => async (dispatch, getState) => {
  try {
    dispatch({ type: userConstants.USER_PROFILE_LOADING });
    const {
      user: { token },
    } = getState();

    if (token) {
      axios.defaults.headers.common = { Authorization: `Bearer ${token}` };
    }
    const { data } = await axios.post(
      apiEndPoints.USER_UPLOAD_PROFILE_PICTURE,
      formData
    );
    dispatch({ type: userConstants.USER_UPLOAD_PROFILE_PIC, payload: data });
  } catch (err) {}
};
