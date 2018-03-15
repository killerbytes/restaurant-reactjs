import React from 'react'
import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle,
} from 'material-ui/Dialog';
import MenuItem from './MenuItem'


export default function Menu(props) {
  const { menu, isOpen = false, onCloseModal } = props
  const { items } = menu
  const drinks = items.find(i => i.id === 1)
  const appetizers = items.find(i => i.id === 2)
  const beef = items.find(i => i.id === 3)
  const chicken = items.find(i => i.id === 4)
  const pork = items.find(i => i.id === 5)

  return <Dialog
    fullScreen
    onClose={() => onCloseModal()}
    open={isOpen}>
    <DialogTitle>Menu</DialogTitle>
    <DialogContent>
      <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
        <div>
          {chicken && <MenuItem item={chicken} {...props} />}
          {pork && <MenuItem item={pork} {...props} />}
          {beef && <MenuItem item={beef} {...props} />}
        </div>
        <div>
          {drinks && <MenuItem item={drinks} {...props} />}
          {appetizers && <MenuItem item={appetizers} {...props} />}
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