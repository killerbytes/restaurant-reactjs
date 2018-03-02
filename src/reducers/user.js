import { 
  LOGOUT_USER, 
  SET_TOKEN, 
  FETCH_USER_FULFILLED } from '../constants/actionTypes'

export default function reducer(
  state = {
    fetching: false,
    token: localStorage.getItem('app') || null,
    me: null
  },
  action
) {
  switch (action.type) {
    case LOGOUT_USER: {
      return { ...state, token: null, me: null };
    }
    case SET_TOKEN: {
      return { ...state, token: action.payload };
    }
    case FETCH_USER_FULFILLED: {
      return { ...state, me: action.payload };
    }
    default:
      return state;
  }
}
