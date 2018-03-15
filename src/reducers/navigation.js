import {
  FETCH_CARTS_FULFILLED
} from "../actions/cartActions";

export default function reducer(
  state = {
    carts: {
      items: []
    }
  },
  action
) {

  switch (action.type) {
    case FETCH_CARTS_FULFILLED: {
      return { ...state, carts: action.payload.data };
    }
    default:
      return state;
  }
}
