import {
  FETCH_CART,
  FETCH_CART_FULFILLED,
  FETCH_CARTS,
  FETCH_CARTS_FULFILLED,
  SAVE_CART,
  SAVE_CART_FULFILLED
} from "../constants/actionTypes";

export default function reducer(
  state = {
    loading: false, items: [], item: { orders: [], customer: {}}
  },
  action
) {

  switch (action.type) {
    case FETCH_CART: {
      return { ...state, loading: true, item: {} };
    }
    case FETCH_CART_FULFILLED: {
      return { ...state, loading: false, ...action.payload  };
    }
    case FETCH_CARTS: {
      return { ...state, loading: true, items: [] };
    }
    case FETCH_CARTS_FULFILLED: {
      return { ...state, loading: false, ...action.payload  };
    }
    case SAVE_CART: {
      return { ...state, loading: true };
    }
    case SAVE_CART_FULFILLED: {
      return { ...state, loading: false };
    }
    default:
      return state;
  }
}
