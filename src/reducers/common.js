import {
  FAILURE,
  REDIRECT,
  SAVE_TABLE_FULFILLED,
  SAVE_CATEGORY_FULFILLED,
  SAVE_PRODUCT_FULFILLED,
  SAVE_TRANSACTION_FULFILLED,
  SAVE_USER_FULFILLED,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT_SUCCESS
} from "../constants/actionTypes";

export default function reducer(
  state = {
    loading: false, items: []
  },
  action
) {
  switch (action.type) {
    case REDIRECT:
      return { ...state, redirectTo: null };
    case FAILURE:
      let redirectTo = null
      switch (action.error.status) {
        case 401:
        case 404:
          localStorage.setItem('APP_INFO', null)
          redirectTo = `/login`
          break;
        default:
          redirectTo = null
      }

      return { ...state, redirectTo }
    case USER_LOGOUT_SUCCESS: {
      const redirectTo = `/login`
      return { ...state, redirectTo }
    }
    case USER_LOGIN_SUCCESS: {
      let redirectTo = null
      switch (action.payload.role) {
        case 'manager':
          redirectTo = '/products'
          break;
        case 'kitchen':
          redirectTo = '/kitchen'
          break;
        default:
          redirectTo = '/'
          break;
      }
      return { ...state, redirectTo }
    }
    case SAVE_USER_FULFILLED: {
      const redirectTo = `/users`
      return { ...state, redirectTo }
    }
    case SAVE_TABLE_FULFILLED: {
      const redirectTo = `/tables`
      return { ...state, redirectTo }
    }
    case SAVE_CATEGORY_FULFILLED: {
      const redirectTo = `/categories`
      return { ...state, redirectTo }
    }
    case SAVE_PRODUCT_FULFILLED: {
      const redirectTo = `/products`
      return { ...state, redirectTo }
    }
    case SAVE_TRANSACTION_FULFILLED: {
      const redirectTo = `/carts`
      return { ...state, redirectTo };
    }
    default:
      return state;
  }
}
