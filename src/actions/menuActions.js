import {FETCH_MENU, FETCH_MENU_FULFILLED} from "../constants/actionTypes";
import { getMenu } from '../utils/api';


function shouldFetchMenu(state){
  const {menu} = state
  if(!menu.items.length){
    return true
  }else{
    return false
  }
}

export function fetchMenuIfNeeded(){
  return function(dispatch, getState){
    if(shouldFetchMenu(getState())){
      return dispatch(fetchMenu())
    }else{
      const { menu } = getState()
      return Promise.resolve( menu )
    }
  }
}

export function fetchMenu(){
  return function(dispatch){
    dispatch({ type: FETCH_MENU });
    return getMenu().then(res=>{
      return dispatch({
        type: FETCH_MENU_FULFILLED,
        payload: res
      });
    })  
  }
}
