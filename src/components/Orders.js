import React from 'react'
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import IconButton from 'material-ui/IconButton';
import ContentAdd from 'material-ui-icons/Add';
import ContentRemove from 'material-ui-icons/Remove';
import shortid from 'shortid'

import { getTotals } from '../utils'


export default function Order({ items, onAdd, onRemove }) {
  const total = getTotals(items)
  const mappedOrders = items.map(item => {
    return <TableRow key={shortid.generate()}>
      <TableCell style={{ whiteSpace: 'normal' }}>{item.name}</TableCell>
      <TableCell style={{ width: 96, textAlign: 'right' }}><IconButton><ContentRemove onClick={() => onRemove(item)} /></IconButton><IconButton><ContentAdd onClick={() => onAdd(item)} /></IconButton></TableCell>
      <TableCell style={{ width: 70, textAlign: 'right' }}>{item.quantity}</TableCell>
      <TableCell style={{ width: 70, textAlign: 'right' }}>{parseFloat(item.price).toFixed(2)}</TableCell>
      <TableCell style={{ width: 70, textAlign: 'right' }}>{(item.price * item.quantity).toFixed(2)}</TableCell>
    </TableRow>
  })

  return <Table>
    <TableHead>
      <TableRow>
        <TableCell>Order</TableCell>
        <TableCell numeric>Actions</TableCell>
        <TableCell numeric>Quantity</TableCell>
        <TableCell numeric>Unit Price</TableCell>
        <TableCell numeric>Total</TableCell>
      </TableRow>
    </TableHead>

    <TableBody>
      {mappedOrders}
      <TableRow>
        <TableCell />
        <TableCell />
        <TableCell />
        <TableCell style={{ width: 70, textAlign: 'right', fontWeight: 'bold' }}>Total</TableCell>
        <TableCell style={{ width: 70, textAlign: 'right', fontWeight: 'bold' }}>{total.amount_due.toFixed(2)}</TableCell>
      </TableRow>
    </TableBody>

  </Table>

}