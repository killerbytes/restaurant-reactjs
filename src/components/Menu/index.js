import React from 'react'
import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle,
} from 'material-ui/Dialog';
import Grid from 'material-ui/Grid';

import MenuItem from './MenuItem'


export default function Menu(props) {
  const { menu, isOpen = false, onCloseModal } = props
  const { items } = menu
  const mappedMenu = items.map(category => {
    return <Grid key={category.id} item sm={6}>
      <MenuItem item={category} {...props} />
    </Grid>
  })
  console.log(mappedMenu)
  return <Dialog
    fullScreen
    onClose={() => onCloseModal()}
    open={isOpen}>
    <DialogTitle>Menu</DialogTitle>
    <DialogContent>
      <Grid container>
        {mappedMenu}
      </Grid>
      <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
        <div>
        </div>
      </div>
    </DialogContent>
    <DialogActions>
      <Button onClick={() => onCloseModal()} color="primary">
        Close
      </Button>
    </DialogActions>
  </Dialog>

}