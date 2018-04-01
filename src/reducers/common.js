import {
  REDIRECT,
  SAVE_CATEGORY_FULFILLED,
  SAVE_PRODUCT_FULFILLED,
  SAVE_TRANSACTION_FULFILLED
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
    case SAVE_CATEGORY_FULFILLED: {
      const redirectTo = `/categories`
      return { ...state, redirectTo }
    }
    case SAVE_PRODUCT_FULFILLED: {
      const redirectTo = `/products`
      return { ...state, redirectTo }
    }
    case SAVE_TRANSACTION_FULFILLED: {
      const redirectTo = `/admin/carts`
      return { ...state, redirectTo };
    }
    default:
      return state;
  }
}
