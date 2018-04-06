import * as api from '../utils/api';

import {
  FAILURE,
  INVALIDATE_TABLES,
  FETCH_TABLE_FULFILLED,
  FETCH_TABLES_FULFILLED,
  SAVE_TABLE_FULFILLED,
} from '../constants/actionTypes'


export function fetchTable(id) {
  return function (dispatch) {

    return api.fetchTable(id).then(res => {
      return dispatch({
        type: FETCH_TABLE_FULFILLED,
        payload: res
      });
    })
      .catch(err => {
        const { error } = err.response.data
        dispatch({ type: FAILURE, error })
      })

  }
}

export function createTable(category) {
  return function (dispatch) {
    return api.createTable(category).then(res => {
      dispatch({ type: INVALIDATE_TABLES })
      return dispatch({
        type: SAVE_TABLE_FULFILLED
      })
    })
      .catch(err => {
        const { error } = err.response.data
        dispatch({ type: FAILURE, error })
      })

  }
}

export function updateTable(id, category) {
  return function (dispatch) {
    return api.updateTable(id, category).then(res => {
      dispatch({ type: INVALIDATE_TABLES })
      return dispatch({
        type: SAVE_TABLE_FULFILLED,
        id
      })
    })
      .catch(err => {
        const { error } = err.response.data
        dispatch({ type: FAILURE, error })
      })

  }
}

export function deleteTable(id) {
  return function (dispatch) {
    return api.deleteTable(id).then(res => {
      dispatch({ type: INVALIDATE_TABLES })
      return dispatch({
        type: SAVE_TABLE_FULFILLED
      })
    })
      .catch(err => {
        dispatch({
          type: FAILURE,
          payload: err.response.data.error
        })
      })
  }
}



function shouldFetchTables(state) {
  const { tables } = state
  if (!tables.items.length) return true
  if (tables.loading) return true
  return tables.didInvalidate

}

export function fetchTablesIfNeeded() {
  return function (dispatch, getState) {
    if (shouldFetchTables(getState())) {
      return dispatch(getTables())
    } else {
      const { tables } = getState()
      return Promise.resolve(tables)
    }
  }
}

export function getTables() {
  return function (dispatch) {

    return api.fetchTables().then(res => {
      return dispatch({
        type: FETCH_TABLES_FULFILLED,
        payload: res
      });
    })
      .catch(err => {
        const { error } = err.response.data
        dispatch({ type: FAILURE, error })
      })
  }
}
