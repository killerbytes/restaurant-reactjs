import {
  FETCH_ROLES,
  FETCH_ROLES_FULFILLED
} from "../constants/actionTypes";

export default function reducer(
  state = {
    loading: false, items: [],
  },
  action
) {
  switch (action.type) {
    case FETCH_ROLES: {
      return { ...state, loading: true, items: [] };
    }
    case FETCH_ROLES_FULFILLED: {
      return { ...state, loading: false, ...action.payload.data };
    }
    default:
      return state;
  }
}
