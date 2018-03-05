import * as actionTypes from "../constants/actionTypes";
import { getOrders, postOrders } from '../utils/api';


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

export function saveOrders(orders, cart_id){
  return function(dispatch){

    return postOrders(orders, cart_id).then(res=>{
      return dispatch({
        type: actionTypes.SAVE_ORDERS_FULFILLED,
        payload: res
      });
    })  
  }
}
