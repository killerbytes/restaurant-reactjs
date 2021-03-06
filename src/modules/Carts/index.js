import React from "react";
import { bindActionCreators } from 'redux'
import { connect } from "react-redux";
import List, { ListItem, ListItemText, ListItemSecondaryAction } from 'material-ui/List';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';
import Toolbar from 'material-ui/Toolbar';
import AssignmentTurnedIn from 'material-ui-icons/AssignmentTurnedIn';
import IconButton from 'material-ui/IconButton';



import { getCarts, checkoutCart } from '../../actions/cartActions'


class Carts extends React.Component {
  componentDidMount() {
    this.props.getCarts()
  }
  handleItemClick = (item) => {
    this.props.history.push(`/carts/${item.id}`)
  }
  handleCheckout = (item) => {
    this.props.checkoutCart(item.id, false)
  }
  render() {
    const { carts } = this.props
    const mappedCarts = !!carts.items.length && carts.items.filter(item => item.table_id).map(item => {
      return <ListItem button key={item.id} onClick={() => this.handleItemClick(item)} >
        <ListItemText primary={item.customer.name} />
        {
          item.is_checkout && <ListItemSecondaryAction>
            <IconButton aria-label="Comments" onClick={() => this.handleCheckout(item)}>
              <AssignmentTurnedIn />
            </IconButton>
          </ListItemSecondaryAction>

        }

      </ListItem>
    })

    const mappedCustom = !!carts.items.length && carts.items.filter(item => !item.table_id).map(item => {
      return <ListItem button key={item.id} onClick={() => this.handleItemClick(item)} >
        <ListItemText primary={item.customer.name} />
        {
          item.is_checkout && <ListItemSecondaryAction>
            <IconButton aria-label="Comments">
              <AssignmentTurnedIn />
            </IconButton>
          </ListItemSecondaryAction>

        }

      </ListItem>
    })

    return <div>
      <Toolbar>
        <Typography variant="title">Open Carts</Typography>
      </Toolbar>
      {
        mappedCarts && <Paper>
          <List component="nav">
            {mappedCarts}
          </List>
        </Paper>

      }
      {
        mappedCustom && <Paper>
          <List component="nav">
            {mappedCustom}
          </List>
        </Paper>

      }

    </div>
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    getCarts,
    checkoutCart
  }, dispatch)
};

const mapStateToProps = ({ carts }) => ({
  carts
});


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Carts);

