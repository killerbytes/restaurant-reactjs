import {
  FETCH_ORDERS,
  FETCH_ORDERS_FULFILLED
} from "../actions/orderActions";

export default function reducer(
  state = {
    loading: false, items: [],
  },
  action
) {
  switch (action.type) {
    case FETCH_ORDERS: {
      return { ...state, loading: true, items: [] };
    }
    case FETCH_ORDERS_FULFILLED: {
      return { ...state, loading: false, ...action.payload.data };
    }
    default:
      return state;
  }
}
