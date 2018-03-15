import { combineReducers } from "redux";

import user from "./user";
import categories from './category'
import tables from "./table";
import menu from "./menu";
import carts from "./cart";
import orders from "./order";
import transaction from "./transaction";
import navigation from "./navigation";

export default combineReducers({
  user,
  categories,
  tables,
  menu,
  carts,
  orders,
  transaction,
  navigation
});
