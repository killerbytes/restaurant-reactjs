import {
  FETCH_SALES,
  FETCH_SALES_FULFILLED
} from "../constants/actionTypes";

export default function reducer(
  state = {
    loading: false, items: []
  },
  action
) {

  switch (action.type) {
    case FETCH_SALES: {
      return { ...state, loading: true, items: [] };
    }
    case FETCH_SALES_FULFILLED: {
      return { ...state, loading: false, ...action.payload.data };
    }

    default:
      return state;
  }
}
