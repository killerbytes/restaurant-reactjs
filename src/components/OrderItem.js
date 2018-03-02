import React from 'react'

export default function OrderItem({item, onClick}){
  return <div>
    {item.product.name} x {item.quantity} @ {item.amount} {item.status}
  </div>
}