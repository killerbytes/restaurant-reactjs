import { fetchCategories } from '../utils/api';

export const FETCH_CATEGORIES = "FETCH_CATEGORIES"
export const FETCH_CATEGORIES_FULFILLED = "FETCH_CATEGORIES_FULFILLED"



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
