import {
  FETCH_MENU,
  FETCH_MENU_FULFILLED
} from "../constants/actionTypes";

export default function reducer(
  state = {
    loading: false, items: []
  },
  action
) {
  switch (action.type) {
    case FETCH_MENU: {
      return { ...state, loading: true, items: [] };
    }
    case FETCH_MENU_FULFILLED: {
      return { ...state, loading: false, ...action.payload.data };
    }
    default:
      return state;
  }
}
