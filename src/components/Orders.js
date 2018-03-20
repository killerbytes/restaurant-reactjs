import React from 'react'
import shortid from 'shortid'

import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import IconButton from 'material-ui/IconButton';
import ContentAdd from 'material-ui-icons/Add';
import ContentRemove from 'material-ui-icons/Remove';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';



import { getTotals } from '../utils'
import Box from "../components/Box";


export default function Order({ items, onAdd, onRemove }) {
  const total = getTotals(items)
  const mappedOrders = items.map(item => {
    return <TableRow key={shortid.generate()}>
      <TableCell style={{ whiteSpace: 'normal' }}>{item.name}</TableCell>
      <TableCell numeric ><IconButton><ContentRemove onClick={() => onRemove(item)} /></IconButton><IconButton><ContentAdd onClick={() => onAdd(item)} /></IconButton></TableCell>
      <TableCell numeric style={{ width: 70 }}>{item.quantity}</TableCell>
      <TableCell numeric style={{ width: 70 }}>{parseFloat(item.price).toFixed(2)}</TableCell>
      <TableCell numeric style={{ width: 70 }}>{(item.price * item.quantity).toFixed(2)}</TableCell>
    </TableRow>
  })

  return <div>
    <Paper className="mb">
      <Table>
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
        </TableBody>

      </Table>
    </Paper>
    <Box style={{ float: 'right' }}>
      <span>Subtotal</span>
      <Typography style={{ marginLeft: '3rem' }} variant="title">{total.amount_due.toFixed(2)}</Typography>
    </Box>
    <div style={{ clear: 'both' }}></div>

  </div>

}