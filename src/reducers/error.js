import {
  SHOW_ERRORS,
  RESET_ERRORS,
  SAVE_TRANSACTION_FAILED
} from "../constants/actionTypes";

const initialState = null
export default function reducer(
  state = initialState,
  action
) {

  switch (action.type) {
    case RESET_ERRORS:
      return { state };
    case SAVE_TRANSACTION_FAILED:
    case SHOW_ERRORS: {
      return { ...state, ...action.payload };
    }
    default:
      return state;
  }
}
