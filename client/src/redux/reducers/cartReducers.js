import cartConstants from '../constants/cartConstants';

const initialState = {
  cartItems: [],
  shippingAddress: {},
  payMethod: '',
};
const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case cartConstants.CART_ADD_ITEM:
      const item = action.payload;

      const alreadyExits = state.cartItems.find(
        (el) => el.product === item.product
      );

      if (alreadyExits) {
        return {
          ...state,
          cartItems: state.cartItems.map((el) =>
            el.product === alreadyExits.product ? item : el
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
    case cartConstants.CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item.product !== action.payload
        ),
      };
    case cartConstants.CART_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload,
      };
    case cartConstants.CART_PAYMENT_METHOD:
      return {
        ...state,
        payMethod: action.payload,
      };
    case cartConstants.CART_CLEAR_ALL:
      return {
        ...state,
        cartItems: [],
      };

    default:
      return state;
  }
};

export default cartReducer;
