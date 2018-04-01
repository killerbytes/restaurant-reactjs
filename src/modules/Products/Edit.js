import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from "react-redux";

import Dialog, { DialogActions, DialogContent, DialogContentText } from 'material-ui/Dialog';
import Button from 'material-ui/Button'
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui-icons/Delete';

import { fetchProduct, updateProduct, deleteProduct } from '../../actions/productActions'
import { fetchCategoriesIfNeeded } from '../../actions/categoryActions'
import Form from './Form'

class Products extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      confirm_dialog: false,
      form: {
        name: 'test',
        description: 'description',
        price: 0,
        category_id: 1
      }
    }
  }
  handleDialog = (key, open = false) => {
    this.setState({ [key]: open })
  }

  handleInputChange = (e) => {
    const { form } = this.state
    form[e.target.name] = e.target.value
    this.setState({ form })
  }

  handleDelete = () => {
    const { match: { params } } = this.props
    this.props.deleteProduct(params.id)
  }

  handleSubmit = (form) => {
    const { match: { params } } = this.props
    this.props.updateProduct(params.id, form)
  }

  componentWillReceiveProps(nextProps) {
    const { product, match: { params } } = nextProps
    const item = product.item && product.item[params.id]
    if (!item) return false
    const { name, description, price, category_id } = item
    const form = {
      name,
      description: description || "",
      price,
      category_id
    }
    this.setState({
      form
    })
  }

  componentDidMount() {
    const { match: { params } } = this.props
    this.props.fetchCategoriesIfNeeded()
    this.props.fetchProduct(params.id)

  }
  render() {
    const { categories, product, match: { params } } = this.props

    const item = product.item && product.item[params.id]
    return <div className="container">
      <Form item={item} categories={categories} onSubmit={this.handleSubmit} >
        <IconButton onClick={() => this.handleDialog('confirm_dialog', true)}><DeleteIcon /></IconButton>
        <Button variant="raised" color="primary" type="submit" style={{ float: 'right' }}>
          Save
        </Button>
      </Form>

      <Dialog
        open={this.state.confirm_dialog}
        onClose={() => this.handleDialog('confirm_dialog')}>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete {item && item.name}?
            </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => this.handleDialog('confirm_dialog')} color="primary">
            Cancel
          </Button>
          <Button onClick={this.handleDelete} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    fetchCategoriesIfNeeded,
    fetchProduct,
    updateProduct,
    deleteProduct
  }, dispatch)
};

const mapStateToProps = ({ categories, product }) => ({
  categories,
  product
});


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Products);
