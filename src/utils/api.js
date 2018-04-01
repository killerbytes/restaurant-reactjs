import axios from "axios";

import { url } from "../constants/config";
// START TABLES
export function fetchTables() {
  return axios.get(`${url.api}/api/tables`)
}
export function fetchTable(id) {
  return axios.get(`${url.api}/api/tables/${id}`)
}
export function createTable(table) {
  return axios.post(`${url.api}/api/tables`, table)
}
export function updateTable(id, table) {
  return axios.patch(`${url.api}/api/tables/${id}`, table)
}
export function deleteTable(id) {
  return axios.delete(`${url.api}/api/tables/${id}`)
}

// END TABLES

// START CATEGORIES
export function fetchCategories() {
  return axios.get(`${url.api}/api/categories`)
}
export function fetchCategory(id) {
  return axios.get(`${url.api}/api/categories/${id}`)
}
export function createCategory(category) {
  return axios.post(`${url.api}/api/categories`, category)
}
export function updateCategory(id, category) {
  return axios.patch(`${url.api}/api/categories/${id}`, category)
}
export function deleteCategory(id) {
  return axios.delete(`${url.api}/api/categories/${id}`)
}



// END CATEGORIES

// START PRODUCTS
export function fetchProduct(id) {
  return axios.get(`${url.api}/api/products/${id}`)
}
export function createProduct(product) {
  return axios.post(`${url.api}/api/products`,
    product
  )
}

export function updateProduct(id, product) {
  return axios.patch(`${url.api}/api/products/${id}`,
    product
  )
}

export function deleteProduct(id) {
  return axios.delete(`${url.api}/api/products/${id}`)
}

export function fetchProducts() {
  return axios.get(`${url.api}/api/products`)
}
export function fetchProductByCategories() {
  return axios.get(`${url.api}/api/products/by_category`)
}
// END PRODUCTS



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
export function checkout(id, is_checkout) {
  return axios.patch(`${url.api}/api/carts/${id}`, {
    is_checkout
  })
}
// END CARTS

// START ORDERS
export function fetchOrders() {
  return axios.get(`${url.api}/api/orders`)
}

export function updateOrderStatus(cart_id, order_ids, status) {
  return axios.patch(`${url.api}/api/orders/status`, {
    cart_id,
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

export function fetchSales() {
  return axios.get(`${url.api}/api/sales`)
}

export function fetchTransactions() {
  return axios.get(`${url.api}/api/transactions`)
}


export function createTransaction(transaction) {
  return axios.post(`${url.api}/api/transactions`, transaction)
}


// END TRANSACTIONS