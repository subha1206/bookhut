import productConstants from '../constants/productConstants';
import axios from 'axios';

export const getAllProducts = () => async (dispatch) => {
  try {
    dispatch({ type: productConstants.PRODUCT_LIST_REQUEST });
    const { data } = await axios.get('/api/v1/products');
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
    const { data } = await axios.get(`/api/v1/products/${id}`);
    dispatch({
      type: productConstants.PRODUCT_DETAILS_SUCCESS,
      payload: data.data,
    });
  } catch (err) {
    dispatch({ type: productConstants.PRODUCT_DETAILS_FAIL });
  }
};
