import React from 'react'
import shortid from 'shortid'

import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import IconButton from 'material-ui/IconButton';
import ContentAdd from 'material-ui-icons/Add';
import ContentRemove from 'material-ui-icons/Remove';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';

import { getTotals } from '../utils'
import Box from "../components/Box";


export default function Order({ items, onAdd, onRemove, onSubmit }) {
  const total = getTotals(items)
  const mappedOrders = items.map(item => {
    return <TableRow key={shortid.generate()}>
      <TableCell style={{ whiteSpace: 'normal' }}>{item.name}</TableCell>
      <TableCell style={{ display: 'flex' }} ><IconButton><ContentRemove onClick={() => onRemove(item)} /></IconButton><IconButton><ContentAdd onClick={() => onAdd(item)} /></IconButton></TableCell>
      <TableCell numeric style={{ width: 70 }}>{item.quantity}</TableCell>
      <TableCell numeric style={{ width: 70 }}>{(item.price * item.quantity).toFixed(2)}</TableCell>
    </TableRow>
  })

  return <div>
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Order</TableCell>
            <TableCell style={{ textAlign: 'center' }}>Actions</TableCell>
            <TableCell numeric>Quantity</TableCell>
            <TableCell numeric>Total</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {mappedOrders}
        </TableBody>

      </Table>
    </Paper>
    <Box style={{ alignItems: 'center' }}>
      Subtotal
      <Typography variant="title" style={{ marginLeft: 'auto', marginRight: '1rem' }}>{total.amount_due.toFixed(2)}</Typography>
      <Button variant="raised" color="primary" onClick={onSubmit} >Add Order</Button>


    </Box>
    <div style={{ clear: 'both' }}></div>

  </div>

}