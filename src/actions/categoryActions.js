import * as actionTypes from "../constants/actionTypes";
import { getCategories } from '../utils/api';


function shouldFetchCategories(state){
  const {categories} = state
  if(!categories.items.length){
    return true
  }else{
    return false
  }
}

export function fetchCategoriesIfNeeded(){
  return function(dispatch, getState){
    if(shouldFetchCategories(getState())){
      return dispatch(fetchCategories())
    }else{
      const { categories } = getState()
      return Promise.resolve( categories )
    }
  }
}

export function fetchCategories(){
  return function(dispatch){

    return getCategories().then(res=>{
      return dispatch({
        type: actionTypes.FETCH_CATEGORIES_FULFILLED,
        payload: res
      });
    })  
  }
}
