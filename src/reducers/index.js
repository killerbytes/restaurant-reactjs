import { combineReducers } from "redux";
import { reducer as formReducer } from 'redux-form'

import auth from "./auth";
import users from "./user";
import categories from './category'
import tables from "./table";
import carts from "./cart";
import orders from "./order";
import transaction from "./transaction";
import sales from "./sales";
import roles from "./roles";
import product from "./product";
import navigation from "./navigation";
import errors from "./error";
import common from "./common"

export default combineReducers({
  auth,
  users,
  categories,
  tables,
  carts,
  orders,
  transaction,
  sales,
  roles,
  product,
  navigation,
  errors,
  common,
  form: formReducer

});
