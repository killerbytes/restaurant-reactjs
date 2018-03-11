import React from 'react'
import Subheader from 'material-ui/Subheader';
import IconButton from 'material-ui/IconButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import {
  Table,
  TableBody,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

export default function MenuItem ({item, onClickItem}){
  const mappedProducts = item && item.products.map(item=>{
    return <TableRow key={item.id} displayBorder={false} hoverable={true}> 
      <TableRowColumn style={{whiteSpace: 'normal'}}>{item.name}</TableRowColumn>
      <TableRowColumn style={{width: 70, textAlign: 'right'}}>{item.price}</TableRowColumn>
      <TableRowColumn style={{width: 50, textAlign: 'right'}}><IconButton onClick={ ()=> onClickItem(item) }><ContentAdd /></IconButton></TableRowColumn>
    </TableRow>
  })
  return <div>

    <Subheader>{item.name}</Subheader>
    <Table>
      <TableBody displayRowCheckbox={false}>
        {mappedProducts}
      </TableBody>
    </Table>
  </div>
}
