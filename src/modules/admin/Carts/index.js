import React from "react";
import { bindActionCreators } from 'redux'
import { connect } from "react-redux";
import { List, ListItem } from 'material-ui/List';

import { getCarts } from '../../../actions/cartActions'

class Carts extends React.Component {
  componentDidMount() {
    this.props.getCarts()
  }
  handleItemClick = (item) => {
    this.props.history.push(`/admin/carts/${item.id}`)
  }
  render() {
    const { carts } = this.props
    const mappedCarts = carts.items.map(item => {
      console.log(item.customer.name)
      return <ListItem key={item.id} primaryText={item.customer.name} onClick={() => this.handleItemClick(item)} />
    })

    return <div>
      <List>
        {mappedCarts}
      </List>
    </div>
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    getCarts
  }, dispatch)
};

const mapStateToProps = ({ carts }) => ({
  carts
});


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Carts);

