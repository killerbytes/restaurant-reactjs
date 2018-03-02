import React from 'react'

export default function MenuItem({item, onClick}){
  const mappedProducts = item.products.map(item=>{
    return <li key={item.id} onClick={()=> onClick(item) }>{item.name}</li>
  })
  return <div>
    <h4>{item.name}</h4>
    <ul>{mappedProducts}</ul>
  </div>
}