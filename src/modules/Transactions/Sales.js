import React from "react";
import { bindActionCreators } from 'redux'
import { connect } from "react-redux";
import shortid from "shortid";
import { format, endOfMonth, isValid } from 'date-fns'

import Paper from 'material-ui/Paper';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import ListSubheader from 'material-ui/List/ListSubheader';
import TextField from 'material-ui/TextField';
import Card, { CardActions, CardContent } from 'material-ui/Card';

import { fetchSales } from '../../actions/transactionActions'
import { fetchCategoriesIfNeeded } from '../../actions/categoryActions'
class Sales extends React.Component {
  constructor(props) {
    super(props)
    let today = new Date();
    this.state = {
      startDate: format(today, 'YYYY-MM-DD'),
      endDate: format(endOfMonth(today), 'YYYY-MM-DD')
    }
  }

  handleFetchSales = () => {
    const startDate = new Date(this.state.startDate)
    const endDate = new Date(this.state.endDate)
    if (isValid(startDate) && isValid(endDate)) {
      this.props.fetchSales({ startDate: startDate.getTime(), endDate: endDate.getTime() })
    }

  }
  componentDidMount() {
    this.props.fetchCategoriesIfNeeded()
    this.handleFetchSales()

  }
  handleStartDateChange = (e) => {
    let date = format(e.target.value, 'YYYY-MM-DD')
    this.setState({
      startDate: date,
      endDate: format(endOfMonth(date), 'YYYY-MM-DD')
    }, () => {
      this.handleFetchSales()
    })
  }
  handleEndDateChange = (e) => {
    this.setState({
      endDate: format(e.target.value, 'YYYY-MM-DD')
    }, () => {
      this.handleFetchSales()
    })
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
      <Card className="mb">
        <CardContent>

          <form noValidate>
            <TextField
              id="date"
              label="Start Date"
              type="date"
              onChange={this.handleStartDateChange}
              value={this.state.startDate}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              id="date"
              label="End Date"
              type="date"
              onChange={this.handleEndDateChange}
              value={this.state.endDate}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </form>
        </CardContent>

      </Card>

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

