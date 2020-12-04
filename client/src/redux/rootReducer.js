import { combineReducers } from 'redux';
import {
  productReducer,
  productDetailsReducers,
} from './reducers/productReducers';

import cartReducer from './reducers/cartReducers';

const rootReducer = combineReducers({
  product: productReducer,
  productDetails: productDetailsReducers,
  cart: cartReducer,
});

export default rootReducer;
