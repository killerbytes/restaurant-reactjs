import * as api from '../utils/api';

import {
  SAVE_TRANSACTION,
  SAVE_TRANSACTION_FULFILLED,
  SAVE_TRANSACTION_FAILED,
  FETCH_TRANSACTION_FULFILLED,
  FETCH_TRANSACTIONS_FULFILLED,
  FETCH_SALES,
  FETCH_SALES_FULFILLED
} from '../constants/actionTypes'

export function fetchTransaction(id) {
  return function (dispatch) {

    return api.fetchTransaction(id)
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

export function fetchTransactions() {
  return function (dispatch) {

    return api.fetchTransactions().then(res => {
      return dispatch({
        type: FETCH_TRANSACTIONS_FULFILLED,
        payload: res
      });
    })
  }
}

export function fetchSales() {
  return function (dispatch) {

    return api.fetchSales().then(res => {
      return dispatch({
        type: FETCH_SALES_FULFILLED,
        payload: res
      });
    })
  }
}

export function createTransaction(transaction) {
  return function (dispatch) {
    dispatch({ type: SAVE_TRANSACTION })
    return api.createTransaction(transaction)
      .then(res => {
        return dispatch({
          type: SAVE_TRANSACTION_FULFILLED,
          payload: res
        });
      }, err => {
        return dispatch({
          type: SAVE_TRANSACTION_FAILED,
          payload: err.message || 'Something went wrong'
        })
      })
  }
}

