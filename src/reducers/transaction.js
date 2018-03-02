import {
  SAVE_TRANSACTION,
  SAVE_TRANSACTION_FULFILLED
} from "../constants/actionTypes";

export default function reducer(
  state = {
    loading: false, items: [], item: { cart: []}
  },
  action
) {

  switch (action.type) {
    case SAVE_TRANSACTION: {
      return { ...state, loading: true };
    }
    case SAVE_TRANSACTION_FULFILLED: {
      return { ...state, loading: false };
    }
    default:
      return state;
  }
}
