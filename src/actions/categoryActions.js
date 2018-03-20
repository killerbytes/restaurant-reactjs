import { fetchCategories } from '../utils/api';

import {
  FETCH_CATEGORIES_FULFILLED
} from '../constants/actionTypes'



function shouldFetchCategories(state) {
  const { categories } = state
  if (!categories.items.length) {
    return true
  } else {
    return false
  }
}

export function fetchCategoriesIfNeeded() {
  return function (dispatch, getState) {
    if (shouldFetchCategories(getState())) {
      return dispatch(getCategories())
    } else {
      const { categories } = getState()
      return Promise.resolve(categories)
    }
  }
}

export function getCategories() {
  return function (dispatch) {

    return fetchCategories().then(res => {
      return dispatch({
        type: FETCH_CATEGORIES_FULFILLED,
        payload: res
      });
    })
  }
}
