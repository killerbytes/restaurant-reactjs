import {
  RESET_ERRORS,
  SAVE_TRANSACTION_FAILED,
  FAILURE
} from "../constants/actionTypes";

const initialState = null
export default function reducer(
  state = initialState,
  action
) {

  switch (action.type) {
    case FAILURE: 
      return {...state, ...action.error}
    case RESET_ERRORS:
      return { state };
    case SAVE_TRANSACTION_FAILED:
    default:
      return state;
  }
}
