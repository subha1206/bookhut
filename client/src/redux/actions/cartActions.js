import cartConstants from '../constants/cartConstants';
import axios from 'axios';

export const addToCart = (id, qty) => async (dispacth, getState) => {
  const { data } = await axios.get(`/api/v1/products/${id}`);

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

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (id) => async (dispacth, getState) => {
  dispacth({
    type: cartConstants.CART_REMOVE_ITEM,
    payload: id,
  });
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};
