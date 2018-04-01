import { combineReducers } from "redux";
import { reducer as formReducer } from 'redux-form'

import user from "./user";
import categories from './category'
import tables from "./table";
import carts from "./cart";
import orders from "./order";
import transaction from "./transaction";
import sales from "./sales";
import product from "./product";
import navigation from "./navigation";
import error from "./error";
import common from "./common"

export default combineReducers({
  user,
  categories,
  tables,
  carts,
  orders,
  transaction,
  sales,
  product,
  navigation,
  error,
  common,
  form: formReducer

});
