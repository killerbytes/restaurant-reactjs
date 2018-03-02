import axios from "axios";

import { url } from "../constants/config";

export function getCategories(){
  return new Promise((resolve, reject)=>{
    axios
      .get(`${url.api}/api/categories`, {})
      .then(res=> resolve(res.data))
      .catch(err=>err)
  })
}

export function getTables(){
  return new Promise((resolve, reject)=>{
    axios
      .get(`${url.api}/api/tables`, {})
      .then(res=> resolve(res.data))
      .catch(err=>err)
  })
}

export function getOrders(){
  return new Promise((resolve, reject)=>{
    axios
      .get(`${url.api}/api/orders`, {})
      .then(res=> resolve(res.data))
      .catch(err=>err)
  })
}

export function getCart(id){ //TODO
  return new Promise((resolve, reject)=>{
    axios
      .get(`${url.api}/api/carts/${id}`, {})
      .then(res=> resolve(res.data))
      .catch(err=>err)
  })
}

export function getCarts(){ //TODO
  return new Promise((resolve, reject)=>{
    axios
      .get(`${url.api}/api/carts`, {})
      .then(res=> resolve(res.data))
      .catch(err=>err)
  })
}

export function postCart(cart){
  return new Promise((resolve, reject)=>{
    axios
      .post(`${url.api}/api/carts`, cart)
      .then(res=> resolve(res.data))
      .catch(err=>err)
  })
}

export function postTransaction(transaction){
  return new Promise((resolve, reject)=>{
    axios
      .post(`${url.api}/api/transactions`, transaction)
      .then(res=> resolve(res.data))
      .catch(err=>err)
  })
}


export function getMenu(){
  return new Promise((resolve, reject)=>{
    axios
      .get(`${url.api}/api/utils/menu`, {})
      .then(res=> resolve(res.data))
      .catch(err=>err)
  })
}
