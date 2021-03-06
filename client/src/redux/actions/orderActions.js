import orderConstants from '../constants/orderConstants';
import axios from 'axios';
import { apiEndPoints } from '../../helper/API';
import notify from '../../helper/notify';

export const createOrder = (order, history) => async (dispatch, getState) => {
  try {
    dispatch({ type: orderConstants.ORDER_CREATE_REQUEST });
    const {
      user: { token },
    } = getState();

    if (token) {
      axios.defaults.headers.common = { Authorization: `Bearer ${token}` };
    }
    const { data } = await axios.post(apiEndPoints.CREATE_ORDER, order);
    if (data.status === 'success') {
      notify(data.status, 'Order placed successfully');
    }
    dispatch({ type: orderConstants.ORDER_CREATE_SUCCESS, payload: data.data });
  } catch (err) {
    notify(err.response.data.status, err.response.data.message);
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
    const url = `${apiEndPoints.GET_ORDER_DETAILS}/${orderId}`;
    const { data } = await axios.get(url);
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
    const url = `${apiEndPoints.UPDATE_ORDER_PAYMENT}/${orderId}`;

    const { data } = await axios.patch(url, paymentOpt);
    if (data.status === 'success') {
      notify(data.status, 'Your payment has been successfull');
    }
    dispatch({
      type: orderConstants.ORDER_PAYMENT_SUCCESS,
      payload: data.data,
    });
  } catch (err) {
    notify('fail', 'Payment failed');
  }
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
    const { data } = await axios.get(apiEndPoints.USER_GET_ALL_ORDERS);
    dispatch({
      type: orderConstants.GET_ALL_MY_ORDERS_SUCCESS,
      payload: data.orders,
    });
  } catch (err) {}
};
