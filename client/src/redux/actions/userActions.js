import axios from 'axios';
import userConstants from '../constants/userConstants';

import { apiEndPoints } from '../../helper/API';
import notify from '../../helper/notify';
export const login = (loginCred) => async (dispatch) => {
  try {
    dispatch({ type: userConstants.USER_LOGIN_REQUEST });

    const { data } = await axios.post(apiEndPoints.USER_LOGIN, loginCred);
    if (data.status === 'success') {
      notify(data.status, 'Logged in successfully');
    }
    dispatch({ type: userConstants.USER_LOGIN_SUCCESS, payload: data });
  } catch (err) {
    notify(err.response.data.status, err.response.data.message);
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
    if (data.status === 'success') {
      notify(data.status, 'Account created successfully');
    }
    dispatch({ type: userConstants.USER_REGISTER_SUCCESS });
    dispatch({ type: userConstants.USER_LOGIN_SUCCESS, payload: data });

    history.push('/');
  } catch (err) {
    notify(err.response.data.status, err.response.data.message);
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
    if (data.status === 'success') {
      notify(data.status, 'Profile picture uploaded successfully');
    }
    dispatch({ type: userConstants.USER_UPLOAD_PROFILE_PIC, payload: data });
  } catch (err) {
    notify(err.response.data.status, err.response.data.message);
  }
};
