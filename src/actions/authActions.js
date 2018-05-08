import * as api from '../utils/api';

import {
  FAILURE,
  FETCH_PROFILE_FULFILLED,
  SET_TOKEN,
  USER_LOGOUT_SUCCESS,
  USER_LOGIN_SUCCESS
} from '../constants/actionTypes'

export function authenticate(form) {
  return function (dispatch) {
    return api.authenticate(form).then(res => {
      localStorage.setItem('APP_INFO', JSON.stringify(res.data))
      dispatch({ type: SET_TOKEN, payload: res })
      return dispatch({ type: USER_LOGIN_SUCCESS, payload: res.data })
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

export function logout() {
  return function (dispatch) {
    localStorage.setItem('APP_INFO', null)
    return dispatch({ type: USER_LOGOUT_SUCCESS })

  }
}

export function getProfile() {
  return function (dispatch) {
    return api.getProfile().then(res => {
      return dispatch({
        type: FETCH_PROFILE_FULFILLED,
        payload: res
      });
    })
      .catch(err => {
        dispatch({
          type: FAILURE,
          error: err.response && err.response.data.error
        })
      })
  }
}


function shouldGetProfile(state) {
  const { auth } = state
  if (!auth.profile) return true
  if (auth.loading) return true
  return auth.didInvalidate
}

export function fetchProfileIfNeeded() {
  return function (dispatch, getState) {
    if (shouldGetProfile(getState())) {
      return dispatch(getProfile())
    } else {
      const { auth } = getState()
      return Promise.resolve(auth)
    }
  }
}
