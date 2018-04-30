import React from 'react'
import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
} from 'material-ui/Dialog';
import Grid from 'material-ui/Grid';

import MenuItem from './MenuItem'


export default function Menu(props) {
  const { product: { items }, isOpen = false, onCloseModal } = props
  const mappedMenu = items.map(category => {
    return <Grid key={category.id} item sm={6}>
      <MenuItem item={category} {...props} />
    </Grid>
  })

  return <Dialog
    fullScreen
    onClose={() => onCloseModal()}
    open={isOpen}>
    <DialogContent>
      <Grid container>
        {mappedMenu}
      </Grid>
    </DialogContent>
    <DialogActions>
      <Button onClick={() => onCloseModal()} color="secondary">
        Close
      </Button>
    </DialogActions>
  </Dialog>

}