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

export function changeCustomer(cart) {
  const { id, table_id, name } = cart
  return axios.patch(`${url.api}/api/carts/customer`, {
    cart_id: id,
    table_id,
    name
  })
}
export function checkout(id) {
  return axios.patch(`${url.api}/api/carts/${id}`, {
    is_checkout: true
  })
}
// END CARTS

// START ORDERS
export function fetchOrders() {
  return axios.get(`${url.api}/api/orders`)
}

export function updateOrderStatus(order_ids, status) {
  return axios.patch(`${url.api}/api/orders/status`, {
    order_ids,
    status
  })
}


export function createOrderVoid(cart_id, order_id, quantity) {
  return axios.patch(`${url.api}/api/orders/void`, {
    order_id,
    cart_id,
    quantity
  })
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