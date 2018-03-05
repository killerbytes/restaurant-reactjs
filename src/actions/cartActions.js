import { 
  FETCH_CART_FULFILLED, 
  FETCH_CARTS_FULFILLED, 
  SAVE_CART, 
  SAVE_CART_FULFILLED,
  SAVE_CHANGE_CUSTOMER_FULFILLED
} from "../constants/actionTypes";
import { getCart, getCarts, postCart, changeCustomer } from '../utils/api';


export function fetchCart(id){
  return function(dispatch){

    return getCart(id)
    .then(res=>{
      return dispatch({
        type: FETCH_CART_FULFILLED,
        payload: res
      });
    })  
    .catch(err=>{
    })
  }
}

export function fetchCarts(){
  return function(dispatch){

    return getCarts().then(res=>{
      return dispatch({
        type: FETCH_CARTS_FULFILLED,
        payload: res
      });
    })  
  }
}

export function updateCustomer(item){
  return function(dispatch){

    return changeCustomer(item).then(res=>{
      return dispatch({
        type: SAVE_CHANGE_CUSTOMER_FULFILLED,
        payload: res
      });
    })  
  }
}


export function saveCart(cart){
  return function(dispatch){
    dispatch({type: SAVE_CART})
    return postCart(cart).then(res=>{
      return dispatch({
        type: SAVE_CART_FULFILLED,
        payload: res
      });      
    })  
  }
}

