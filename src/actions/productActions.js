import { INVALIDATE_PRODUCTS, FETCH_PRODUCT, FETCH_PRODUCT_FULFILLED, FETCH_PRODUCTS, FETCH_PRODUCTS_FULFILLED, SAVE_PRODUCT_FULFILLED } from "../constants/actionTypes";
import * as api from '../utils/api'

export function createProduct(product) {
  return function (dispatch) {
    return api.createProduct(product).then(res => {
      dispatch({ type: INVALIDATE_PRODUCTS })
      return dispatch({
        type: SAVE_PRODUCT_FULFILLED
      })
    })
  }
}

export function updateProduct(id, product) {
  return function (dispatch) {
    return api.updateProduct(id, product).then(res => {
      dispatch({ type: INVALIDATE_PRODUCTS })
      return dispatch({
        type: SAVE_PRODUCT_FULFILLED,
        id
      })
    })
  }
}

export function deleteProduct(id) {
  return function (dispatch) {
    return api.deleteProduct(id).then(res => {
      dispatch({ type: INVALIDATE_PRODUCTS })
      return dispatch({
        type: SAVE_PRODUCT_FULFILLED
      })
    })
  }
}

function shouldFetchProducts(state) {
  const { product } = state
  if (!product.items.length) return true
  if (product.loading) return true
  return product.didInvalidate
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
      .catch(err => {
        console.log(err)
      })
  }
}

export function fetchProduct(id) {
  return function (dispatch) {
    dispatch({ type: FETCH_PRODUCT });
    return api.fetchProduct(id).then(res => {
      return dispatch({
        type: FETCH_PRODUCT_FULFILLED,
        payload: res
      });
    })
  }
}




