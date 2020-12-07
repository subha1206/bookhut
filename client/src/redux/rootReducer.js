import { combineReducers } from 'redux';
import {
  productReducer,
  productDetailsReducers,
} from './reducers/productReducers';

import cartReducer from './reducers/cartReducers';
import userReducer from './reducers/userReducers';
import orderReducer from './reducers/orderReducers';

const rootReducer = combineReducers({
  product: productReducer,
  productDetails: productDetailsReducers,
  cart: cartReducer,
  user: userReducer,
  order: orderReducer,
});

export default rootReducer;
