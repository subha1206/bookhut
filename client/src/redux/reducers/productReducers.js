import productConstants from '../constants/productConstants';

const initialStateProduct = {
  products: [],
  loading: false,
  currentProduct: null,
};
const productReducer = (state = initialStateProduct, action) => {
  switch (action.type) {
    case productConstants.PRODUCT_LIST_REQUEST:
      return { ...state, loading: true };
    case productConstants.PRODUCT_LIST_SUCCCESS:
      return { ...state, products: action.payload, loading: false };
    case productConstants.PRODUCT_LIST_FAIL:
      return { ...state, loading: false };

    default:
      return state;
  }
};

const initialStateDetails = {
  product: null,
  loading: false,
};

const productDetailsReducers = (state = initialStateDetails, action) => {
  switch (action.type) {
    case productConstants.PRODUCT_DETAILS_REQUEST:
      return { ...state, loading: true };
    case productConstants.PRODUCT_DETAILS_SUCCESS:
      return { ...state, product: action.payload, loading: false };
    case productConstants.PRODUCT_DETAILS_FAIL:
      return { ...state, loading: false };
    case productConstants.PRODUCT_ADD_REVIEW:
      return { ...state, product: action.payload, loading: false };
    default:
      return state;
  }
};

export { productReducer, productDetailsReducers };
