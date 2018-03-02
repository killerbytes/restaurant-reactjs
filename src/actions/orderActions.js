import * as actionTypes from "../constants/actionTypes";
import { getOrders } from '../utils/api';


export function fetchOrders(){
  return function(dispatch){

    return getOrders().then(res=>{
      return dispatch({
        type: actionTypes.FETCH_ORDERS_FULFILLED,
        payload: res
      });
    })  
  }
}
