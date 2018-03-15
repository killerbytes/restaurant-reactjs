export const UPDATE_CARTS = "UPDATE_CARTS"

export function updateCarts(payload) {
  return function (dispatch) {
    dispatch({
      type: UPDATE_CARTS,
      payload
    });
  }
}

