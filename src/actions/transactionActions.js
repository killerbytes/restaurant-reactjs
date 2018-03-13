import { createTransaction, fetchTransaction, fetchTransactions } from '../utils/api';

export const SAVE_TRANSACTION = "SAVE_TRANSACTION"
export const SAVE_TRANSACTION_FULFILLED = "SAVE_TRANSACTION_FULFILLED"
export const FETCH_TRANSACTION = "FETCH_TRANSACTION"
export const FETCH_TRANSACTION_FULFILLED = "FETCH_TRANSACTION_FULFILLED"
export const FETCH_TRANSACTIONS = "FETCH_TRANSACTIONS"
export const FETCH_TRANSACTIONS_FULFILLED = "FETCH_TRANSACTIONS_FULFILLED"

export function getTransaction(id) {
  return function (dispatch) {

    return fetchTransaction(id)
      .then(res => {
        return dispatch({
          type: FETCH_TRANSACTION_FULFILLED,
          payload: res
        });
      })
      .catch(err => {
      })
  }
}

export function getTransactions() {
  return function (dispatch) {

    return fetchTransactions().then(res => {
      return dispatch({
        type: FETCH_TRANSACTIONS_FULFILLED,
        payload: res
      });
    })
  }
}

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

