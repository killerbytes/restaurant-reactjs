import { 
  SAVE_TRANSACTION, 
  SAVE_TRANSACTION_FULFILLED
} from "../constants/actionTypes";
import { postTransaction } from '../utils/api';


export function saveTransaction(transaction){
  return function(dispatch){
    dispatch({type: SAVE_TRANSACTION})
    return postTransaction(transaction).then(res=>{
      return dispatch({
        type: SAVE_TRANSACTION_FULFILLED,
        payload: res
      });      
    })  
  }
}

