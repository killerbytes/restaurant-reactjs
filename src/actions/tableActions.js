import { fetchTables } from '../utils/api';

export const FETCH_TABLES = "FETCH_TABLES"
export const FETCH_TABLES_FULFILLED = "FETCH_TABLES_FULFILLED"


function shouldFetchTables(state) {
  const { tables } = state
  if (!tables.items.length) {
    return true
  } else {
    return false
  }
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

    return fetchTables().then(res => {
      return dispatch({
        type: FETCH_TABLES_FULFILLED,
        payload: res
      });
    })
  }
}
