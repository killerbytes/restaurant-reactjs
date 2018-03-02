import {
  FETCH_CATEGORIES,
  FETCH_CATEGORIES_FULFILLED
} from "../constants/actionTypes";

export default function reducer(
  state = {
    loading: false, items: [],
  },
  action
) {
  switch (action.type) {
    case FETCH_CATEGORIES: {
      return { ...state, loading: true, items: [] };
    }
    case FETCH_CATEGORIES_FULFILLED: {
      return { ...state, loading: false, ...action.payload  };
    }
    default:
      return state;
  }
}
