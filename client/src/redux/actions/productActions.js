import productConstants from '../constants/productConstants';
import axios from 'axios';

import { apiEndPoints } from '../../helper/API';

export const getAllProducts = () => async (dispatch) => {
  try {
    dispatch({ type: productConstants.PRODUCT_LIST_REQUEST });
    const { data } = await axios.get(apiEndPoints.GET_ALL_PRODUCTS);
    dispatch({
      type: productConstants.PRODUCT_LIST_SUCCCESS,
      payload: data.data,
    });
  } catch (err) {
    dispatch({ type: productConstants.PRODUCT_LIST_FAIL });
  }
};

export const getOneProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: productConstants.PRODUCT_DETAILS_REQUEST });
    const url = `${apiEndPoints.GET_ONE_PRODUCT}/${id}`;
    const { data } = await axios.get(url);
    dispatch({
      type: productConstants.PRODUCT_DETAILS_SUCCESS,
      payload: data.data,
    });
  } catch (err) {
    dispatch({ type: productConstants.PRODUCT_DETAILS_FAIL });
  }
};

export const addReview = (id, review) => async (dispatch, getState) => {
  try {
    const {
      user: { token },
    } = getState();

    if (token) {
      axios.defaults.headers.common = { Authorization: `Bearer ${token}` };
    }
    const url = `${apiEndPoints.CREATE_REVIEW}/${id}/add-review`;

    const { data } = await axios.post(url, review);
    dispatch({
      type: productConstants.PRODUCT_ADD_REVIEW,
      payload: data.data,
    });
  } catch (err) {
    dispatch({ type: productConstants.PRODUCT_DETAILS_FAIL });
  }
};
