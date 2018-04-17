import React from "react";
import { bindActionCreators } from 'redux'
import { connect } from "react-redux";
import shortid from "shortid";
import { format } from 'date-fns'

import Paper from 'material-ui/Paper';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import ListSubheader from 'material-ui/List/ListSubheader';
import TextField from 'material-ui/TextField';

import { fetchSales } from '../../actions/transactionActions'
import { fetchCategoriesIfNeeded } from '../../actions/categoryActions'
class Sales extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      date: format(new Date, 'YYYY-MM-DD')
    }
  }
  componentDidMount() {
    this.props.fetchCategoriesIfNeeded()
    this.props.fetchSales(this.state.date)
  }
  render() {
    const { sales, categories } = this.props
    var items = []

    sales.items
      .map(i => ({
        quantity: i.quantity,
        product: i.product
      }))

      .forEach(i => {
        if (items.filter(item => item.product.id === i.product.id).length) {
          items.filter(item => item.product.id === i.product.id)[0].quantity += i.quantity
        } else {
          items = [...items, i]
        }

      })

    items.sort((a, b) => b.quantity - a.quantity)


    const mappedSales = categories.items.map(category => {
      const mappedItem = items
        .filter(item => item.product.category_id === category.id)
        .map(item => {
          return <TableRow key={shortid.generate()} >
            <TableCell>{item.product.name}</TableCell>
            <TableCell numeric>{item.quantity}</TableCell>
          </TableRow>

        })

      return <Paper key={shortid.generate()} className="mb">
        <ListSubheader>{category.name}</ListSubheader>
        <Table >
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell numeric>Quantity</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {mappedItem}
          </TableBody>
        </Table>
      </Paper>
    })

    return <div>
      <form noValidate>
        <TextField
          id="date"
          label="Birthday"
          type="date"
          value={this.state.date}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </form>
      {mappedSales}


    </div >
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    fetchSales,
    fetchCategoriesIfNeeded
  }, dispatch)
};

const mapStateToProps = ({ sales, categories }) => ({
  sales,
  categories
});


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Sales);

