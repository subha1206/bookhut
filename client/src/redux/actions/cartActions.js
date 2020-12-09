import cartConstants from '../constants/cartConstants';
import axios from 'axios';
import { apiEndPoints } from '../../helper/API';

export const addToCart = (id, qty) => async (dispacth) => {
  const url = `${apiEndPoints.GET_ONE_PRODUCT}/${id}`;
  const { data } = await axios.get(url);
  console.log(data);

  dispacth({
    type: cartConstants.CART_ADD_ITEM,
    payload: {
      product: data.data._id,
      name: data.data.name,
      image: data.data.image,
      price: data.data.price,
      countInStock: data.data.countInStock,
      qty,
    },
  });
};

export const removeFromCart = (id) => async (dispacth) => {
  dispacth({
    type: cartConstants.CART_REMOVE_ITEM,
    payload: id,
  });
};
export const clearCart = () => async (dispacth) => {
  dispacth({
    type: cartConstants.CART_CLEAR_ALL,
  });
};

export const saveShippingAddress = (data, history) => (dispacth) => {
  dispacth({
    type: cartConstants.CART_SHIPPING_ADDRESS,
    payload: data,
  });
  history.push('/order');
};

export const savePaymentMethod = (payMethod, history) => (dispacth) => {
  dispacth({
    type: cartConstants.CART_PAYMENT_METHOD,
    payload: payMethod,
  });
  history.push('/order');
};
