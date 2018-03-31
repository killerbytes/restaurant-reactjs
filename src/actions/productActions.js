import { FETCH_PRODUCTS, FETCH_PRODUCTS_FULFILLED } from "../constants/actionTypes";
import * as api from '../utils/api'



function shouldFetchProducts(state) {
  const { product } = state
  if (!product.items.length) {
    return true
  } else {
    return false
  }
}

export function fetchProductsIfNeeded() {
  return function (dispatch, getState) {
    if (shouldFetchProducts(getState())) {
      return dispatch(fetchProductByCategories())
    } else {
      const { product } = getState()
      return Promise.resolve(product)
    }
  }
}

export function fetchProductByCategories() {
  return function (dispatch) {
    dispatch({ type: FETCH_PRODUCTS });
    return api.fetchProductByCategories().then(res => {
      return dispatch({
        type: FETCH_PRODUCTS_FULFILLED,
        payload: res
      });
    })
  }
}




