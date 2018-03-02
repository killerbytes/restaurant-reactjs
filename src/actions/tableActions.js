import * as actionTypes from "../constants/actionTypes";
import { getTables } from '../utils/api';


function shouldFetchTables(state){
  const {tables} = state
  if(!tables.items.length){
    return true
  }else{
    return false
  }
}

export function fetchTablesIfNeeded(){
  return function(dispatch, getState){
    if(shouldFetchTables(getState())){
      return dispatch(fetchTables())
    }else{
      const { tables } = getState()
      return Promise.resolve( tables )
    }
  }
}

export function fetchTables(){
  return function(dispatch){

    return getTables().then(res=>{
      return dispatch({
        type: actionTypes.FETCH_TABLES_FULFILLED,
        payload: res
      });
    })  
  }
}
