import React from 'react'
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import ContentAdd from 'material-ui-icons/Add';
import Table, { TableBody, TableCell, TableRow } from 'material-ui/Table';

export default function MenuItem({ item, onClickItem }) {
  const mappedProducts = item && item.products.map(item => {
    return <TableRow key={item.id}>
      <TableCell padding="none" style={{ whiteSpace: 'normal' }}>{item.name}</TableCell>
      <TableCell padding="none" style={{ width: 70, textAlign: 'right' }}>{item.price}</TableCell>
      <TableCell padding="none" style={{ width: 50, textAlign: 'right' }}><IconButton onClick={() => onClickItem(item)}><ContentAdd /></IconButton></TableCell>
    </TableRow>
  })
  return <div>

    <Typography variant="subheading" color="primary" style={{ textTransform: 'uppercase' }}>{item.name}</Typography >
    <Table className="mb">
      <TableBody>
        {mappedProducts}
      </TableBody>
    </Table>
  </div>
}
