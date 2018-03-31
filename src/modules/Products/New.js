import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from "react-redux";

import Select from 'material-ui/Select';
import Button from 'material-ui/Button'
import ContentAddIcon from 'material-ui-icons/Add';
import { MenuItem } from 'material-ui/Menu';

import { fetchCategoriesIfNeeded } from '../../actions/categoryActions'

class Products extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      category: 'none'
    }
  }
  componentDidMount() {
    this.props.fetchCategoriesIfNeeded()
  }
  handleChange = (e) => {
    console.log(e.target.name, e.target.value)
  }

  render() {

    const { categories } = this.props
    const mappedCategories = categories.items.map(category => {
      return <MenuItem key={category.id} name="category" value={category.id}>{category.name}</MenuItem>
    })
    console.log(this.props)
    return <div className="container">
      <Select
        inputProps={{
          name: 'category',
          id: 'category',
        }}
        value={this.state.category}
        onChange={(e) => this.handleChange(e)}>
        <MenuItem value="">
          <em>None</em>
        </MenuItem>

        {mappedCategories}
      </Select>
      <Button variant="fab" style={{ position: 'fixed', bottom: '2rem', right: '2rem' }}>
        <ContentAddIcon />
      </Button>

    </div>
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    fetchCategoriesIfNeeded
  }, dispatch)
};

const mapStateToProps = ({ categories }) => ({
  categories
});


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Products);
