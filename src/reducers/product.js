import {
  INVALIDATE_PRODUCTS,
  FETCH_PRODUCT,
  FETCH_PRODUCT_FULFILLED,
  FETCH_PRODUCTS,
  FETCH_PRODUCTS_FULFILLED
} from "../constants/actionTypes";

export default function reducer(
  state = {
    loading: false,
    items: [],
    didInvalidate: false,
  },
  action
) {
  switch (action.type) {
    case INVALIDATE_PRODUCTS:
      return { ...state, didInvalidate: true };
    case FETCH_PRODUCT: {
      return { ...state, loading: true };
    }
    case FETCH_PRODUCT_FULFILLED: {
      return { ...state, loading: false, item: { [action.payload.data.id]: action.payload.data } };
    }
    case FETCH_PRODUCTS: {
      return { ...state, loading: true, didInvalidate: false, items: [] };
    }
    case FETCH_PRODUCTS_FULFILLED: {
      return { ...state, loading: false, didInvalidate: false, ...action.payload.data };
    }
    default:
      return state;
  }
}
