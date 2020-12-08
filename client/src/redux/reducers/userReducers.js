import userConstants from '../constants/userConstants';

const initialState = {
  loading: false,
  token: null,
};
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case userConstants.USER_LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case userConstants.USER_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload.user,
        token: action.payload.token,
      };
    case userConstants.USER_LOGIN_FAIL:
      return { ...state, loading: false };
    case userConstants.USER_PROFILE_LOADING:
      return {
        ...state,
        loading: true,
      };
    case userConstants.USER_UPLOAD_PROFILE_PIC:
      return { ...state, loading: false, user: action.payload.user };
    case userConstants.USER_LOGOUT:
      return { ...state, user: null, loading: false, token: null };
    case userConstants.USER_REGISTER_REQUEST:
      return { ...state, loading: true };
    case userConstants.USER_REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case userConstants.USER_REGISTER_FAIL:
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default userReducer;
