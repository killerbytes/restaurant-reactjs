import axios from "axios";
import { url } from "../constants/config";

import store from '../store'

const headers = () => {
  const { getState } = store
  const { auth } = getState()
  const cookie = JSON.parse(localStorage.getItem('APP_INFO'))
  const token = auth.token || (cookie && cookie.token)
  return {
    headers: {
      'x-access-token': token
    }
  }

}
// START ROLES
export function getRoles() {
  const config = Object.assign(headers(), {})
  return axios.get(`${url.api}/api/roles`, config)
}
// END ROLES

// START USERS
export function authenticate(form) {
  const config = Object.assign(headers(), {})
  return axios.post(`${url.api}/api/auth`, form, config)
}
export function getProfile() {
  const config = Object.assign(headers(), {})
  return axios.get(`${url.api}/api/users/profile`, config)
}
export function fetchUsers() {
  const config = Object.assign(headers(), {})
  return axios.get(`${url.api}/api/users`, config)
}
export function fetchUser(id) {
  const config = Object.assign(headers(), {})
  return axios.get(`${url.api}/api/users/${id}`, config)
}
export function createUser(table) {
  const config = Object.assign(headers(), {})
  return axios.post(`${url.api}/api/users`, table, config)
}
export function updateUser(id, table) {
  const config = Object.assign(headers(), {})
  return axios.patch(`${url.api}/api/users/${id}`, table, config)
}
export function deleteUser(id) {
  const config = Object.assign(headers(), {})
  return axios.delete(`${url.api}/api/users/${id}`, config)
}

// END USERS

// START TABLES
export function fetchTables() {
  const config = Object.assign(headers(), {})
  return axios.get(`${url.api}/api/tables`, config)
}
export function fetchTable(id) {
  const config = Object.assign(headers(), {})
  return axios.get(`${url.api}/api/tables/${id}`, config)
}
export function createTable(table) {
  const config = Object.assign(headers(), {})
  return axios.post(`${url.api}/api/tables`, table, config)
}
export function updateTable(id, table) {
  const config = Object.assign(headers(), {})
  return axios.patch(`${url.api}/api/tables/${id}`, table, config)
}
export function deleteTable(id) {
  const config = Object.assign(headers(), {})
  return axios.delete(`${url.api}/api/tables/${id}`, config)
}

// END TABLES

// START CATEGORIES
export function fetchCategories() {
  const config = Object.assign(headers(), {})
  return axios.get(`${url.api}/api/categories`, config)
}
export function fetchCategory(id) {
  const config = Object.assign(headers(), {})
  return axios.get(`${url.api}/api/categories/${id}`, config)
}
export function createCategory(category) {
  const config = Object.assign(headers(), {})
  return axios.post(`${url.api}/api/categories`, category, config)
}
export function updateCategory(id, category) {
  const config = Object.assign(headers(), {})
  return axios.patch(`${url.api}/api/categories/${id}`, category, config)
}
export function deleteCategory(id) {
  const config = Object.assign(headers(), {})
  return axios.delete(`${url.api}/api/categories/${id}`, config)
}



// END CATEGORIES

// START PRODUCTS
export function fetchProduct(id) {
  const config = Object.assign(headers(), {})
  return axios.get(`${url.api}/api/products/${id}`, config)
}
export function createProduct(product) {
  const config = Object.assign(headers(), {})
  return axios.post(`${url.api}/api/products`, product, config)
}

export function updateProduct(id, product) {
  const config = Object.assign(headers(), {})
  return axios.patch(`${url.api}/api/products/${id}`, product, config)
}

export function deleteProduct(id) {
  const config = Object.assign(headers(), {})
  return axios.delete(`${url.api}/api/products/${id}`, config)
}

export function fetchProducts() {
  const config = Object.assign(headers(), {})
  return axios.get(`${url.api}/api/products`, config)
}
export function fetchProductByCategories() {
  const config = Object.assign(headers(), {})
  return axios.get(`${url.api}/api/products/by_category`, config)
}
// END PRODUCTS



// START CARTS
export function fetchCart(id) {
  const config = Object.assign(headers(), {})
  return axios.get(`${url.api}/api/carts/${id}`, config)
}

export function fetchCarts() {
  const config = Object.assign(headers(), {})
  return axios.get(`${url.api}/api/carts`, config)
}

export function createCart(cart) {
  const config = Object.assign(headers(), {})
  return axios.post(`${url.api}/api/carts`, cart, config)
}

export function changeCustomer(cart) {
  const config = Object.assign(headers(), {})
  const { id, table_id, name } = cart
  return axios.patch(`${url.api}/api/carts/customer`, {
    cart_id: id,
    table_id,
    name
  }, config)
}
export function checkout(id, is_checkout) {
  const config = Object.assign(headers(), {})
  return axios.patch(`${url.api}/api/carts/${id}`, {
    is_checkout
  }, config)
}
// END CARTS

// START ORDERS
export function fetchOrders() {
  const config = Object.assign(headers(), {})
  return axios.get(`${url.api}/api/orders`, config)
}

export function updateOrderStatus(cart_id, order_ids, status) {
  const config = Object.assign(headers(), {})
  return axios.patch(`${url.api}/api/orders/status`, {
    cart_id,
    order_ids,
    status
  }, config)
}


export function createOrderVoid(cart_id, order_id, quantity) {
  const config = Object.assign(headers(), {})
  return axios.patch(`${url.api}/api/orders/void`, {
    order_id,
    cart_id,
    quantity
  }, config)
}

export function createOrders(orders, cart_id) {
  const config = Object.assign(headers(), {})
  return axios.post(`${url.api}/api/orders`, {
    orders,
    cart_id
  }, config)
}
// END ORDERS

// START TRANSACTIONS
export function fetchTransaction(id) {
  const config = Object.assign(headers(), {})
  return axios.get(`${url.api}/api/transactions/${id}`, config)
}

export function fetchSales(date) {
  const config = Object.assign(headers(), { params: { date } })
  return axios.get(`${url.api}/api/sales`, config)
}

export function fetchTransactions() {
  const config = Object.assign(headers(), {})
  return axios.get(`${url.api}/api/transactions`, config)
}


export function createTransaction(transaction) {
  const config = Object.assign(headers(), {})
  return axios.post(`${url.api}/api/transactions`, transaction, config)
}


// END TRANSACTIONS