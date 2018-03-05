import axios from "axios";

import { url } from "../constants/config";

export function getCategories(){
  return new Promise((resolve, reject)=>{
    axios
      .get(`${url.api}/api/categories`, {})
      .then(res=> resolve(res.data))
      .catch(err=>reject(err))
  })
}

export function getTables(){
  return new Promise((resolve, reject)=>{
    axios
      .get(`${url.api}/api/tables`, {})
      .then(res=> resolve(res.data))
      .catch(err=>reject(err))
  })
}

export function getOrders(){
  return new Promise((resolve, reject)=>{
    axios
      .get(`${url.api}/api/orders`, {})
      .then(res=> resolve(res.data))
      .catch(err=>reject(err))
  })
}

export function postOrders(orders, cart_id){
  return new Promise((resolve, reject)=>{
    axios
      .post(`${url.api}/api/orders`, {
        orders,
        cart_id
      })
      .then(res=> resolve(res.data))
      .catch(err=>reject(err))
  })
}


export function getCart(id){ 
  return new Promise((resolve, reject)=>{
    axios
      .get(`${url.api}/api/carts/${id}`, {})
      .then(res=> resolve(res.data))
      .catch(err=>reject(err))
  })
}

export function getCarts(){ //TODO
  return new Promise((resolve, reject)=>{
    axios
      .get(`${url.api}/api/carts`, {})
      .then(res=> resolve(res.data))
      .catch(err=>reject(err))
  })
}

export function postCart(cart){
  return new Promise((resolve, reject)=>{
    axios
      .post(`${url.api}/api/carts`, cart)
      .then(res=> resolve(res.data))
      .catch(err=>reject(err))
  })
}

export function postTransaction(transaction){
  return new Promise((resolve, reject)=>{
    axios
      .post(`${url.api}/api/transactions`, transaction)
      .then(res=> resolve(res.data))
      .catch(err=>reject(err))
  })
}


export function getMenu(){
  return new Promise((resolve, reject)=>{
    axios
      .get(`${url.api}/api/utils/menu`, {})
      .then(res=> resolve(res.data))
      .catch(err=>reject(err))
  })
}

export function changeCustomer(item){
  const {id, table_id, name} = item
  return new Promise((resolve, reject)=>{
    axios
      .patch(`${url.api}/api/carts/${id}/customer`, {
        table_id,
        name
      })
      .then(res=> resolve(res.data))
      .catch(err=>reject(err))
  })
}
