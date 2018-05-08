import React from 'react'
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';

import Dialog, {
  DialogActions,
  DialogContent,
} from 'material-ui/Dialog';
import Grid from 'material-ui/Grid';
import Snackbar from 'material-ui/Snackbar';

import MenuItem from './MenuItem'
const styles = theme => ({
  anchorOriginBottomCenter: {
    flexGrow: 'unset',
    minWidth: 288,
    maxWidth: 568,
  },
});

class Menu extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      message: 'test',
      openSnackbar: false
    }
  }
  onClickMenuItem = (item) => {
    this.setState({
      message: item.name,
      openSnackbar: true
    })
    this.props.onClickItem(item)
  }
  onCloseSnackBar = () => {
    this.setState({
      openSnackbar: false
    })
  }

  render() {
    const { classes, product: { items }, isOpen = false, onCloseModal } = this.props
    const mappedMenu = items.map(category => {

      return (
        category.products.length ?

          <Grid key={category.id} item sm={6} xs={12}>
            <MenuItem item={category} onClickItem={this.onClickMenuItem} />
          </Grid>
          :
          null
      )

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
        <Button onClick={() => onCloseModal()} color="secondary" style={{ zIndex: 2000 }}>
          Close
      </Button>
      </DialogActions>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={this.state.openSnackbar}
        autoHideDuration={1000}
        onClose={this.onCloseSnackBar}
        classes={{
        }}
        SnackbarContentProps={{
          className: classes.anchorOriginBottomCenter,
          'aria-describedby': 'message-id',
        }}
        message={<span id="message-id">{this.state.message}</span>}
      />
    </Dialog>
  }
}


export default withStyles(styles)(Menu);
