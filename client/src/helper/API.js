export const baseURL = `https://api-bookhut.herokuapp.com`;

export const apiEndPoints = {
  USER_LOGIN: `${baseURL}/api/v1/users/login`,
  USER_LOGOUT: `${baseURL}`,
  USER_REGISTER: `${baseURL}/api/v1/users/register`,
  USER_UPLOAD_PROFILE_PICTURE: `${baseURL}/api/v1/users/upload-photo`,
  USER_GET_ALL_ORDERS: `${baseURL}/api/v1/orders/myOrders`,

  GET_ALL_PRODUCTS: `${baseURL}/api/v1/products`,
  GET_ONE_PRODUCT: `${baseURL}/api/v1/products`,
  CREATE_REVIEW: `${baseURL}/api/v1/products`,

  ADD_TO_CART: `${baseURL}/api/v1/products/`,

  CREATE_ORDER: `${baseURL}/api/v1/orders`,
  GET_ORDER_DETAILS: `${baseURL}/api/v1/orders/`,
  UPDATE_ORDER_PAYMENT: `${baseURL}/api/v1/orders`,
  MAKE_PAYMENT: `${baseURL}/api/v1/orders`,

};
