import {
  INVALIDATE_CATEGORIES,
  FETCH_CATEGORY_FULFILLED,
  FETCH_CATEGORIES,
  FETCH_CATEGORIES_FULFILLED
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
    case INVALIDATE_CATEGORIES:
      return { ...state, didInvalidate: true };
    case FETCH_CATEGORY_FULFILLED: {
      return { ...state, loading: false, item: { [action.payload.data.id]: action.payload.data } };
    }
    case FETCH_CATEGORIES: {
      return { ...state, loading: true, didInvalidate: false, items: [] };
    }
    case FETCH_CATEGORIES_FULFILLED: {
      return { ...state, loading: false, didInvalidate: false, ...action.payload.data };
    }
    default:
      return state;
  }
}
