import React from 'react'

import StarBorder from 'material-ui-icons/StarBorder';
import Star from 'material-ui-icons/Star';
import Button from 'material-ui/Button';
import Dialog, { DialogTitle, DialogActions } from 'material-ui/Dialog';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';

export default function TablePicker({ tables, carts, isOpen, onClickItem, onCloseModal }) {

  const mappedTables = tables.items.map((item) => {

    const active = carts.items.find(i => i.table_id === item.id)
    return <ListItem button key={item.id} onClick={() => onClickItem(item, active)}>
      <ListItemIcon >
        {
          active
            ?
            <Star color="primary" />
            :
            <StarBorder color="primary" />
        }
      </ListItemIcon>
      <ListItemText primary={item.name}></ListItemText>
    </ListItem>
  })

  return <Dialog
    open={isOpen}
    onClose={() => onCloseModal()}>
    <DialogTitle id="simple-dialog-title">Choose Table</DialogTitle>
    <List component="nav">
      {mappedTables}
    </List>
    <DialogActions>
      <Button onClick={() => onCloseModal()}>Close</Button>

    </DialogActions>
  </Dialog>

}