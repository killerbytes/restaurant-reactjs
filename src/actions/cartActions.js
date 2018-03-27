import * as api from '../utils/api';

import {
  FETCH_CART_FULFILLED,
  FETCH_CARTS_FULFILLED,
  SAVE_CART,
  SAVE_CART_FULFILLED,
  SAVE_CHANGE_CUSTOMER_FULFILLED,
} from '../constants/actionTypes'

import { fetchTablesIfNeeded } from './tableActions'


export function getCart(id) {
  return function (dispatch) {
    return api.fetchCart(id)
      .then(res => {
        return dispatch({
          type: FETCH_CART_FULFILLED,
          payload: res
        });
      })
      .catch(err => {
      })
  }
}

export function getCarts() {
  return function (dispatch) {

    return api.fetchCarts().then(res => {
      return dispatch({
        type: FETCH_CARTS_FULFILLED,
        payload: res
      });
    })
  }
}

export function moveCustomer(item) {
  return function (dispatch) {

    return api.changeCustomer(item).then(res => {
      dispatch(fetchTablesIfNeeded())
      dispatch(getCart(item.id))

      return dispatch({
        type: SAVE_CHANGE_CUSTOMER_FULFILLED,
        payload: res
      });
    })
  }
}

export function checkoutCart(id, status = true) {
  return function (dispatch) {
    return api.checkout(id, status).then(res => {
      return dispatch(getCart(id))
    })
  }
}


export function saveCart(cart) {
  return function (dispatch) {
    dispatch({ type: SAVE_CART })
    return api.createCart(cart).then(res => {
      return dispatch({
        type: SAVE_CART_FULFILLED,
        payload: res
      });
    })
  }
}

