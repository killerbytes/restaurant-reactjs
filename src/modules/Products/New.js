import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from "react-redux";

import Button from 'material-ui/Button'
import { Link } from 'react-router-dom'

import { fetchCategoriesIfNeeded } from '../../actions/categoryActions'
import { createProduct } from "../../actions/productActions";

import Form from './Form'



class NewProduct extends React.Component {
  componentDidMount() {
    this.props.fetchCategoriesIfNeeded()
  }

  handleSubmit = (form) => {
    this.props.createProduct(form)
  }

  render() {
    const { categories, } = this.props
    return <div className="container">
      <Form categories={categories} onSubmit={this.handleSubmit}>
        <Button component={Link} to="/products" style={{ marginLeft: 'auto' }}>Cancel</Button>
        <Button variant="raised" color="primary" type="submit" style={{ float: 'right' }}>
          Save
        </Button>

      </Form>
    </div>
  }

}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    createProduct,
    fetchCategoriesIfNeeded
  }, dispatch)
};

const mapStateToProps = ({ categories, form }) => {
  return ({
    categories,
    form
  });
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewProduct);
