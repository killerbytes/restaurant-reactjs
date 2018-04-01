import {
  INVALIDATE_TABLES,
  FETCH_TABLE_FULFILLED,
  FETCH_TABLES,
  FETCH_TABLES_FULFILLED
} from "../constants/actionTypes";

export default function reducer(
  state = {
    loading: false,
    items: [],
    didInvalidate: false
  },
  action
) {
  switch (action.type) {
    case INVALIDATE_TABLES:
      return { ...state, didInvalidate: true };
    case FETCH_TABLE_FULFILLED: {
      return { ...state, loading: false, item: { [action.payload.data.id]: action.payload.data } };
    }
    case FETCH_TABLES: {
      return { ...state, loading: true, didInvalidate: false, items: [] };
    }
    case FETCH_TABLES_FULFILLED: {
      return { ...state, loading: false, didInvalidate: false, ...action.payload.data };
    }
    default:
      return state;
  }
}
