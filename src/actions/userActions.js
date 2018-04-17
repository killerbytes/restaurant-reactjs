import * as api from '../utils/api';

import {
  FAILURE,
  INVALIDATE_USERS,
  FETCH_USER_FULFILLED,
  FETCH_USERS_FULFILLED,
  SAVE_USER_FULFILLED
} from '../constants/actionTypes'

export function fetchUser(id) {
  return function (dispatch) {

    return api.fetchUser(id).then(res => {
      return dispatch({
        type: FETCH_USER_FULFILLED,
        payload: res
      });
    })
      .catch(err => {
        const { error } = err.reponse.data
        dispatch({
          type: FAILURE,
          error
        })
      })
  }
}

export function createUser(category) {
  return function (dispatch) {
    return api.createUser(category).then(res => {
      dispatch({ type: INVALIDATE_USERS })
      return dispatch({
        type: SAVE_USER_FULFILLED
      })
    })
      .catch(err => {
        const { error } = err.response.data
        dispatch({ type: FAILURE, error })
      })

  }
}

export function updateUser(id, category) {
  return function (dispatch) {
    return api.updateUser(id, category).then(res => {
      dispatch({ type: INVALIDATE_USERS })
      return dispatch({
        type: SAVE_USER_FULFILLED,
        id
      })
    })
      .catch(err => {
        const { error } = err.response.data
        dispatch({ type: FAILURE, error })
      })

  }
}

export function deleteUser(id) {
  return function (dispatch) {
    return api.deleteUser(id).then(res => {
      dispatch({ type: INVALIDATE_USERS })
      return dispatch({
        type: SAVE_USER_FULFILLED
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



function shouldFetchUsers(state) {
  const { users } = state
  if (!users.items.length) return true
  if (users.loading) return true
  return users.didInvalidate

}

export function fetchUsersIfNeeded() {
  return function (dispatch, getState) {
    if (shouldFetchUsers(getState())) {
      return dispatch(getUsers())
    } else {
      const { users } = getState()
      return Promise.resolve(users)
    }
  }
}

export function getUsers() {
  return function (dispatch) {

    return api.fetchUsers().then(res => {
      return dispatch({
        type: FETCH_USERS_FULFILLED,
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
