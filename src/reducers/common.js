import {
  REDIRECT,
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
    case SAVE_TRANSACTION_FULFILLED: {
      const redirectUrl = `/admin/carts`
      return { ...state, redirectTo: redirectUrl };
    }
    default:
      return state;
  }
}
