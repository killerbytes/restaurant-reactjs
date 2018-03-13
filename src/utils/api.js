import axios from "axios";

import { url } from "../constants/config";

export function fetchCategories() {
  return axios.get(`${url.api}/api/categories`)
}

export function fetchTables() {
  return axios.get(`${url.api}/api/tables`)
}


export function fetchMenu() {
  return axios.get(`${url.api}/api/utils/menu`)
}

// START CARTS
export function fetchCart(id) {
  return axios.get(`${url.api}/api/carts/${id}`)
}

export function fetchCarts() {
  return axios.get(`${url.api}/api/carts`)
}

export function createCart(cart) {
  return axios.post(`${url.api}/api/carts`, cart)
}

export function changeCustomer(item) {
  const { id, table_id, name } = item
  return axios.patch(`${url.api}/api/carts/${id}/customer`, {
    table_id,
    name
  })
}
// END CARTS

// START ORDERS
export function fetchOrders() {
  return axios.get(`${url.api}/api/orders`)
}

export function createOrders(orders, cart_id) {
  return axios.post(`${url.api}/api/orders`, {
    orders,
    cart_id
  })
}
// END ORDERS

// START TRANSACTIONS
export function fetchTransaction(id) {
  return axios.get(`${url.api}/api/transactions/${id}`)
}

export function fetchTransactions() {
  return axios.get(`${url.api}/api/transactions`)
}


export function createTransaction(transaction) {
  return axios.post(`${url.api}/api/transactions`, transaction)
}


// END TRANSACTIONS