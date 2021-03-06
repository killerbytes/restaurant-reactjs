import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from "react-redux";
import { Link } from 'react-router-dom'

import Button from 'material-ui/Button'

import { fetchCategoriesIfNeeded } from '../../actions/categoryActions'
import { createCategory } from "../../actions/categoryActions";

import Form from './Form'



class NewProduct extends React.Component {
  componentDidMount() {
    this.props.fetchCategoriesIfNeeded()
  }

  handleSubmit = (form) => {
    this.props.createCategory(form)
  }

  render() {
    return <div className="container">
      <Form onSubmit={this.handleSubmit}>
        <div style={{ float: 'right' }}>
          <Button variant="raised" component={Link} to="/categories">Cancel</Button>
          <Button variant="raised" color="primary" type="submit" >Save</Button>
        </div>
        <div></div>
      </Form>
    </div>
  }

}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    createCategory,
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
