import { 
  FETCH_CART,
  FETCH_CART_FULFILLED, 
  FETCH_CARTS,
  FETCH_CARTS_FULFILLED, 
  SAVE_CART, 
  SAVE_CART_FULFILLED
} from "../constants/actionTypes";
import { getCart, getCarts, postCart } from '../utils/api';


export function fetchCart(id){
  return function(dispatch){

    return getCart(id).then(res=>{
      return dispatch({
        type: FETCH_CART_FULFILLED,
        payload: res
      });
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

