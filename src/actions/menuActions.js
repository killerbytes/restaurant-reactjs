import { fetchMenu } from '../utils/api';

import {
  FETCH_MENU,
  FETCH_MENU_FULFILLED
} from '../constants/actionTypes'


function shouldFetchMenu(state) {
  const { menu } = state
  if (!menu.items.length) {
    return true
  } else {
    return false
  }
}

export function fetchMenuIfNeeded() {
  return function (dispatch, getState) {
    if (shouldFetchMenu(getState())) {
      return dispatch(getMenu())
    } else {
      const { menu } = getState()
      return Promise.resolve(menu)
    }
  }
}

export function getMenu() {
  return function (dispatch) {
    dispatch({ type: FETCH_MENU });
    return fetchMenu().then(res => {
      return dispatch({
        type: FETCH_MENU_FULFILLED,
        payload: res
      });
    })
  }
}
