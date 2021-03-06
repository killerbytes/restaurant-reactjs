import {
  INVALIDATE_USERS,
  FETCH_USERS,
  FETCH_USER_FULFILLED,
  FETCH_USERS_FULFILLED
} from '../constants/actionTypes'

export default function reducer(
  state = {
    fetching: false,
    token: localStorage.getItem('app') || null,
    me: null,
    items: [],
    didInvalidate: false
  },
  action
) {
  switch (action.type) {
    case INVALIDATE_USERS:
      return { ...state, didInvalidate: true };
    case FETCH_USER_FULFILLED: {
      return { ...state, item: { [action.payload.data.id]: action.payload.data } };
    }
    case FETCH_USERS: {
      return { ...state, didInvalidate: false, items: [] };
    }
    case FETCH_USERS_FULFILLED: {
      return { ...state, didInvalidate: false, ...action.payload.data };
    }
    default:
      return state;
  }
}
