import {
  SAVE_TRANSACTION_FAILED
} from "../constants/actionTypes";

export default function reducer(
  state = {
    message: ""
  },
  action
) {

  switch (action.type) {
    case SAVE_TRANSACTION_FAILED: {
      return { ...state, message: action.payload };
    }
    default:
      return state;
  }
}
