import * as api from '../utils/api';

import {
  FETCH_ROLES_FULFILLED,
  FAILURE
} from '../constants/actionTypes'



function shouldFetchRoles(state) {
  const { roles } = state
  if (!roles.items.length) return true
  if (roles.loading) return true
  return roles.didInvalidate
}

export function getRolesIfNeeded() {
  return function (dispatch, getState) {
    if (shouldFetchRoles(getState())) {
      return dispatch(getRoles())
    } else {
      const { roles } = getState()
      return Promise.resolve(roles)
    }
  }
}

export function getRoles() {
  return function (dispatch) {

    return api.getRoles().then(res => {
      return dispatch({
        type: FETCH_ROLES_FULFILLED,
        payload: res
      });
    })
      .catch(err => {
        const { error } = err.response.data
        dispatch({
          type: FAILURE,
          error
        })
      })
  }
}
