import * as api from '../utils/api';
import {
  FETCH_ORDERS_FULFILLED,
  SAVE_ORDERS_FULFILLED,
  UPDATE_ORDER_FULFILLED,
  FAILURE
} from '../constants/actionTypes'

import { getCart } from '../actions/cartActions'


export function getOrders() {
  return function (dispatch) {

    return api.fetchOrders().then(res => {
      return dispatch({
        type: FETCH_ORDERS_FULFILLED,
        payload: res
      });
    })
      .catch(err => {
        const { error } = err.response.data
        dispatch({ type: FAILURE, error })
      })

  }
}

export function saveOrders(orders, cart_id) {
  return function (dispatch) {

    return api.createOrders(orders, cart_id).then(res => {
      dispatch(getCart(cart_id))
      return dispatch({
        type: SAVE_ORDERS_FULFILLED,
        payload: res
      });
    })
      .catch(err => {
        const { error } = err.response.data
        dispatch({ type: FAILURE, error })
      })

  }
}

export function saveOrderVoid(cart_id, order_id, quantity) {
  return function (dispatch) {

    return api.createOrderVoid(cart_id, order_id, quantity).then(res => {
      dispatch(getCart(cart_id))
      return dispatch({
        type: UPDATE_ORDER_FULFILLED,
        payload: res
      });
    })
      .catch(err => {
        const { error } = err.response.data
        dispatch({ type: FAILURE, error })
      })

  }
}

export function saveOrderStatus(cart_id, order_ids, status) {
  return function (dispatch) {
    return api.updateOrderStatus(cart_id, order_ids, status)
      .catch(err => {
        const { error } = err.response.data
        dispatch({ type: FAILURE, error })
      })

  }
}
