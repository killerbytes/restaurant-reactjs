import {
  FETCH_TABLES,
  FETCH_TABLES_FULFILLED
} from "../constants/actionTypes";

export default function reducer(
  state = {
    loading: false, items: [],
  },
  action
) {
  switch (action.type) {
    case FETCH_TABLES: {
      return { ...state, loading: true, items: [] };
    }
    case FETCH_TABLES_FULFILLED: {
      return { ...state, loading: false, ...action.payload  };
    }
    default:
      return state;
  }
}
