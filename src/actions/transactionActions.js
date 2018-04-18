import * as api from '../utils/api';

import {
  SAVE_TRANSACTION,
  SAVE_TRANSACTION_FULFILLED,
  FETCH_TRANSACTION_FULFILLED,
  FETCH_TRANSACTIONS_FULFILLED,
  FETCH_SALES_FULFILLED,
  FAILURE
} from '../constants/actionTypes'
import { endOfDay } from 'date-fns';

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
        const { error } = err.response.data
        dispatch({ type: FAILURE, error })
      })
  }
}

export function fetchTransactions(startDate, endDate) {
  return function (dispatch) {

    return api.fetchTransactions(startDate, endDate).then(res => {
      return dispatch({
        type: FETCH_TRANSACTIONS_FULFILLED,
        payload: res
      });
    })
      .catch(err => {
        const { error } = err.response.data
        dispatch({ type: FAILURE, error })
      })

  }
}

export function fetchSales(date) {
  return function (dispatch) {

    return api.fetchSales(date).then(res => {
      return dispatch({
        type: FETCH_SALES_FULFILLED,
        payload: res
      });
    })
      .catch(err => {
        const { error } = err.response.data
        dispatch({ type: FAILURE, error })
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
      })
      .catch(err => {
        const { error } = err.response.data
        dispatch({ type: FAILURE, error })
      })

  }
}

