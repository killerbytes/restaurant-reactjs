import React from 'react'
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';


export default function VoidOrder({ open, value, handleClose, handleSubmit, handleTextChange }) {
  return <Dialog
    open={open}
    onClose={() => handleClose()}>
    <DialogTitle>Void Order</DialogTitle>
    <DialogContent>
      <DialogContentText>
        The actions in this window were passed in as an array of React objects.
      </DialogContentText>
      <TextField
        type="number"
        label="Quantity"
        onChange={handleTextChange}
        value={value} />
    </DialogContent>
    <DialogActions>
      <Button
        onClick={() => handleClose()}>Cancel</Button>
      <Button
        color="primary"
        onClick={handleSubmit}>Submit</Button>

    </DialogActions>

  </Dialog>
}

