import orderConstants from '../constants/orderConstants';

const initialState = {
  order: null,
  success: false,
  loading: false,
  orderItems: [],
  shippingAddress: {},
  myOrders: [],
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case orderConstants.ORDER_CREATE_REQUEST:
      return { ...state, loading: true };
    case orderConstants.ORDER_CREATE_SUCCESS:
      return { ...state, order: action.payload, success: true, loading: false };
    case orderConstants.ORDER_CREATE_FAIL:
      return { ...state, loading: false, success: false };
    case orderConstants.ORDER_DETAILS_REQUEST:
      return { ...state, loading: true };
    case orderConstants.ORDER_DETAILS_SUCCESS:
      return {
        ...state,
        orderItems: action.payload.orderItems,
        shippingAddress: action.payload.shippingAddress,
        order: action.payload,
        success: false,
        loading: false,
      };
    case orderConstants.ORDER_DETAILS_FAIL:
      return { ...state, loading: false, success: false };
    case orderConstants.ORDER_PAYMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        success: false,
        order: action.payload,
      };
    case orderConstants.ORDER_PAYMENT_FAIL:
      return { ...state, loading: false, success: false };
    case orderConstants.GET_ALL_MY_ORDERS_REQUEST:
      return { ...state, loading: true, success: false };
    case orderConstants.GET_ALL_MY_ORDERS_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        myOrders: action.payload,
      };
    case orderConstants.GET_ALL_MY_ORDERS_FAIL:
      return { ...state, loading: false, success: false };
    default:
      return state;
  }
};

export default orderReducer;
