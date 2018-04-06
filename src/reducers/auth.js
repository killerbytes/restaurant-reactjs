import {
  SET_TOKEN,
} from '../constants/actionTypes'

export default function reducer(
  state = {},
  action
) {
  switch (action.type) {
    case SET_TOKEN: {
      return { ...state, ...action.payload.data };
    }
    default:
      return state;
  }
}
