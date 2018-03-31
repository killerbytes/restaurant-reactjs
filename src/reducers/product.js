import {
  FETCH_PRODUCTS,
  FETCH_PRODUCTS_FULFILLED
} from "../constants/actionTypes";

export default function reducer(
  state = {
    loading: false, items: [],
  },
  action
) {
  switch (action.type) {
    case FETCH_PRODUCTS: {
      return { ...state, loading: true, items: [] };
    }
    case FETCH_PRODUCTS_FULFILLED: {
      return { ...state, loading: false, ...action.payload.data };
    }
    default:
      return state;
  }
}
