import { UPDATE_CARTS } from '../constants/actionTypes'

export function updateCarts(payload) {
  return function (dispatch) {
    dispatch({
      type: UPDATE_CARTS,
      payload
    });
  }
}

