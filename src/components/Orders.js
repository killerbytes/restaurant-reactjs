import React from 'react'
import {
  Table,
  TableBody,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import IconButton from 'material-ui/IconButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentRemove from 'material-ui/svg-icons/content/remove';
import shortid from 'shortid'

import { getTotals } from '../utils'


export default function Order({items, onAdd, onRemove}){
  const total = getTotals(items)
  const mappedOrders = items.map(item=>{
    return <TableRow key={shortid.generate()} displayBorder={false} hoverable={true} selectable={false}> 
      <TableRowColumn style={{whiteSpace: 'normal'}}>{item.name}</TableRowColumn>
      <TableRowColumn style={{width: 96, textAlign: 'right'}}><IconButton><ContentRemove onClick={()=> onRemove(item)} /></IconButton><IconButton><ContentAdd onClick={()=>onAdd(item)} /></IconButton></TableRowColumn>
      <TableRowColumn style={{width: 70, textAlign: 'right'}}>{item.quantity}</TableRowColumn>
      <TableRowColumn style={{width: 70, textAlign: 'right'}}>{parseFloat(item.price).toFixed(2)}</TableRowColumn>
      <TableRowColumn style={{width: 70, textAlign: 'right'}}>{(item.price * item.quantity).toFixed(2)}</TableRowColumn>
    </TableRow>
  })

  return <Table>
  <TableBody displayRowCheckbox={false}>
    {mappedOrders}
    <TableRow>
      <TableRowColumn/>
      <TableRowColumn/>
      <TableRowColumn/>
      <TableRowColumn style={{width: 70, textAlign: 'right', fontWeight: 'bold'}}>Total</TableRowColumn>
      <TableRowColumn style={{width: 70, textAlign: 'right', fontWeight: 'bold'}}>{total.amount_due.toFixed(2)}</TableRowColumn>
    </TableRow>
  </TableBody>
  
</Table>

}