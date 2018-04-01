import * as api from '../utils/api';

import {
  INVALIDATE_CATEGORIES,
  FETCH_CATEGORIES_FULFILLED,
  FETCH_CATEGORY_FULFILLED,
  SAVE_CATEGORY_FULFILLED
} from '../constants/actionTypes'

export function fetchCategory(id) {
  return function (dispatch) {

    return api.fetchCategory(id).then(res => {
      return dispatch({
        type: FETCH_CATEGORY_FULFILLED,
        payload: res
      });
    })
  }
}

export function createCategory(category) {
  return function (dispatch) {
    return api.createCategory(category).then(res => {
      dispatch({ type: INVALIDATE_CATEGORIES })
      return dispatch({
        type: SAVE_CATEGORY_FULFILLED
      })
    })
  }
}

export function updateCategory(id, category) {
  return function (dispatch) {
    return api.updateCategory(id, category).then(res => {
      dispatch({ type: INVALIDATE_CATEGORIES })
      return dispatch({
        type: SAVE_CATEGORY_FULFILLED,
        id
      })
    })
  }
}

export function deleteCategory(id) {
  return function (dispatch) {
    return api.deleteCategory(id).then(res => {
      dispatch({ type: INVALIDATE_CATEGORIES })
      return dispatch({
        type: SAVE_CATEGORY_FULFILLED
      })
    })
  }
}



function shouldFetchCategories(state) {
  const { categories } = state
  if (!categories.items.length) return true
  if (categories.loading) return true
  return categories.didInvalidate
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

    return api.fetchCategories().then(res => {
      return dispatch({
        type: FETCH_CATEGORIES_FULFILLED,
        payload: res
      });
    })
  }
}
