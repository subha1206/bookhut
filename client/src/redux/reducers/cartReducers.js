import cartConstants from '../constants/cartConstants';

const initialState = {
  cartItems: [],
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

    default:
      return state;
  }
};

export default cartReducer;
