import orderConstants from '../constants/orderConstants';
import axios from 'axios';

export const createOrder = (order, history) => async (dispatch, getState) => {
  try {
    dispatch({ type: orderConstants.ORDER_CREATE_REQUEST });
    const {
      user: { token },
    } = getState();

    if (token) {
      axios.defaults.headers.common = { Authorization: `Bearer ${token}` };
    }
    const { data } = await axios.post('/api/v1/orders', order);
    dispatch({ type: orderConstants.ORDER_CREATE_SUCCESS, payload: data.data });
  } catch (err) {
    dispatch({ type: orderConstants.ORDER_CREATE_FAIL });
  }
};

export const getOrderDetails = (orderId) => async (dispatch, getState) => {
  try {
    dispatch({ type: orderConstants.ORDER_DETAILS_REQUEST });
    const {
      user: { token },
    } = getState();

    if (token) {
      axios.defaults.headers.common = { Authorization: `Bearer ${token}` };
    }
    const { data } = await axios.get(`/api/v1/orders/${orderId}`);
    dispatch({
      type: orderConstants.ORDER_DETAILS_SUCCESS,
      payload: data.data,
    });
  } catch (err) {
    dispatch({ type: orderConstants.ORDER_DETAILS_FAIL });
  }
};

export const updatePayment = (orderId, paymentOpt) => async (
  dispatch,
  getState
) => {
  try {
    const {
      user: { token },
    } = getState();

    if (token) {
      axios.defaults.headers.common = { Authorization: `Bearer ${token}` };
    }
    const { data } = await axios.patch(`/api/v1/orders/${orderId}`, paymentOpt);
    console.log(data.data);
    dispatch({
      type: orderConstants.ORDER_PAYMENT_SUCCESS,
      payload: data.data,
    });
  } catch (err) {}
};

export const getAllMyOrders = () => async (dispatch, getState) => {
  try {
    dispatch({ type: orderConstants.GET_ALL_MY_ORDERS_REQUEST });
    const {
      user: { token },
    } = getState();

    if (token) {
      axios.defaults.headers.common = { Authorization: `Bearer ${token}` };
    }
    const { data } = await axios.get(`/api/v1/orders/myOrders`);
    dispatch({
      type: orderConstants.GET_ALL_MY_ORDERS_SUCCESS,
      payload: data.orders,
    });
  } catch (err) {}
};
