import { RESET_ERRORS } from '../constants/actionTypes'

export function resetError() {
  return function (dispatch) {
    dispatch({
      type: RESET_ERRORS
    });
  }
}

// export function updateCarts(payload) {
//   return function (dispatch) {
//     dispatch({
//       type: UPDATE_CARTS,
//       payload
//     });
//   }
// }

