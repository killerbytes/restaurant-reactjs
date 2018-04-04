import { combineReducers } from "redux";
import { reducer as formReducer } from 'redux-form'

import users from "./user";
import categories from './category'
import tables from "./table";
import carts from "./cart";
import orders from "./order";
import transaction from "./transaction";
import sales from "./sales";
import product from "./product";
import navigation from "./navigation";
import errors from "./error";
import common from "./common"

export default combineReducers({
  users,
  categories,
  tables,
  carts,
  orders,
  transaction,
  sales,
  product,
  navigation,
  errors,
  common,
  form: formReducer

});
