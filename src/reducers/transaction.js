import {
  SAVE_TRANSACTION,
  SAVE_TRANSACTION_FULFILLED,
  FETCH_TRANSACTION,
  FETCH_TRANSACTION_FULFILLED,
  FETCH_TRANSACTIONS,
  FETCH_TRANSACTIONS_FULFILLED
} from "../actions/transactionActions";

export default function reducer(
  state = {
    loading: false, items: [], item: { cart: { orders: [] } }
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
    case FETCH_TRANSACTION: {
      return { ...state, loading: true, item: {} };
    }
    case FETCH_TRANSACTION_FULFILLED: {
      return { ...state, loading: false, ...action.payload.data };
    }
    case FETCH_TRANSACTIONS: {
      return { ...state, loading: true, items: [] };
    }
    case FETCH_TRANSACTIONS_FULFILLED: {
      return { ...state, loading: false, ...action.payload.data };
    }

    default:
      return state;
  }
}
