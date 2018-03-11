import { createTransaction } from '../utils/api';

export const SAVE_TRANSACTION = "SAVE_TRANSACTION"
export const SAVE_TRANSACTION_FULFILLED = "SAVE_TRANSACTION_FULFILLED"


export function saveTransaction(transaction) {
  return function (dispatch) {
    dispatch({ type: SAVE_TRANSACTION })
    return createTransaction(transaction).then(res => {
      return dispatch({
        type: SAVE_TRANSACTION_FULFILLED,
        payload: res
      });
    })
  }
}

