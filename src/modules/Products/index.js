import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from "react-redux";

import { Link } from 'react-router-dom'

import ListSubheader from 'material-ui/List/ListSubheader';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button'
import ContentAddIcon from 'material-ui-icons/Add';

import { fetchProductsIfNeeded } from '../../actions/productActions'

class Products extends React.Component {
  componentDidMount() {
    this.props.fetchProductsIfNeeded()
  }
  handleItemClick = (item) => {
    const { history } = this.props
    history.push(`/products/${item.id}`)
  }
  render() {
    const { product } = this.props

    const mappedCategories = product.items.map(category => {
      const mappedProducts = category.products.map(item => {
        return <ListItem button key={item.id} onClick={() => this.handleItemClick(item)}>
          <ListItemText primary={item.name} />
        </ListItem>
      })

      return <Paper key={category.id} className="mb">
        <List
          subheader={<ListSubheader>{category.name}</ListSubheader>}>

          {mappedProducts}
        </List>
      </Paper>
    })


    return <div>
      {mappedCategories}

      <Button variant="fab" color="primary" component={Link} to="/products/new" style={{ position: 'fixed', zIndex: 10, bottom: '2rem', right: '2rem' }}>
        <ContentAddIcon />
      </Button>


    </div>
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    fetchProductsIfNeeded
  }, dispatch)
};

const mapStateToProps = ({ product }) => ({
  product
});


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Products);
