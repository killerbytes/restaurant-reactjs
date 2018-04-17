import {
  USER_LOGOUT_SUCCESS,
  SET_TOKEN,
  FETCH_PROFILE_FULFILLED
} from '../constants/actionTypes'

const initialState = {
  loading: false,
  didInvalidate: false,
  me: null
}

export default function reducer(
  state = initialState,
  action
) {
  switch (action.type) {
    case USER_LOGOUT_SUCCESS: {
      return { initialState }
    }
    case SET_TOKEN: {
      return { ...state, ...action.payload.data };
    }
    case FETCH_PROFILE_FULFILLED: {
      return { ...state, me: action.payload.data }
    }
    default:
      return state;
  }
}
