import { fetchOrders, createOrders, voidOrder } from '../utils/api';

export const FETCH_ORDERS = "FETCH_ORDERS"
export const FETCH_ORDERS_FULFILLED = "FETCH_ORDERS_FULFILLED"
export const SAVE_ORDERS_FULFILLED = "SAVE_ORDERS_FULFILLED"
export const UPDATE_ORDER_FULFILLED = "UPDATE_ORDER_FULFILLED"


export function getOrders() {
  return function (dispatch) {

    return fetchOrders().then(res => {
      return dispatch({
        type: FETCH_ORDERS_FULFILLED,
        payload: res
      });
    })
  }
}

export function saveOrders(orders, cart_id) {
  return function (dispatch) {

    return createOrders(orders, cart_id).then(res => {
      return dispatch({
        type: SAVE_ORDERS_FULFILLED,
        payload: res
      });
    })
  }
}

export function updateOrder(cart_id, order_id, quantity) {
  return function (dispatch) {

    return voidOrder(cart_id, order_id, quantity).then(res => {
      return dispatch({
        type: UPDATE_ORDER_FULFILLED,
        payload: res
      });
    })
  }
}
