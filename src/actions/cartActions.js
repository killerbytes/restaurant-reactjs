import { fetchCart, fetchCarts, createCart, changeCustomer, checkout } from '../utils/api';

export const FETCH_CART = "FETCH_CART"
export const FETCH_CART_FULFILLED = "FETCH_CART_FULFILLED"
export const FETCH_CARTS = "FETCH_CARTS"
export const FETCH_CARTS_FULFILLED = "FETCH_CARTS_FULFILLED"
export const SAVE_CART = "SAVE_CART"
export const SAVE_CART_FULFILLED = "SAVE_CART_FULFILLED"
export const SAVE_CHANGE_CUSTOMER_FULFILLED = "SAVE_CHANGE_CUSTOMER_FULFILLED"
export const CHECKOUT_CART_FULFILLED = "CHECKOUT_CART_FULFILLED"



export function getCart(id) {
  return function (dispatch) {

    return fetchCart(id)
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

    return fetchCarts().then(res => {
      return dispatch({
        type: FETCH_CARTS_FULFILLED,
        payload: res
      });
    })
  }
}

export function moveCustomer(item) {
  return function (dispatch) {

    return changeCustomer(item).then(res => {
      return dispatch({
        type: SAVE_CHANGE_CUSTOMER_FULFILLED,
        payload: res
      });
    })
  }
}

export function checkoutCart(id) {
  return function (dispatch) {
    return checkout(id).then(res => {
      return dispatch({
        type: CHECKOUT_CART_FULFILLED,
        payload: res
      })
    })
  }
}


export function saveCart(cart) {
  return function (dispatch) {
    dispatch({ type: SAVE_CART })
    return createCart(cart).then(res => {
      return dispatch({
        type: SAVE_CART_FULFILLED,
        payload: res
      });
    })
  }
}

