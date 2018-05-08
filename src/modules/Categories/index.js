import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from "react-redux";

import { Link } from 'react-router-dom'

import List, { ListItem, ListItemText } from 'material-ui/List';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button'
import ContentAddIcon from 'material-ui-icons/Add';

import { fetchCategoriesIfNeeded } from '../../actions/categoryActions'

class Categories extends React.Component {
    componentDidMount() {
        this.props.fetchCategoriesIfNeeded()
    }
    handleItemClick = (item) => {
        const { history } = this.props
        history.push(`/categories/${item.id}`)
    }
    render() {
        const { categories } = this.props

        const mappedCategories = categories.items.map(category => {
            return <ListItem button key={category.id} onClick={() => this.handleItemClick(category)}>
                <ListItemText primary={`${category.order} - ${category.name}`} />
            </ListItem>

        })


        return <div className="container">
            <Paper className="mb">

                <List>

                    {mappedCategories}
                </List>
            </Paper>

            <Button variant="fab" component={Link} to="/categories/new" style={{ position: 'fixed', zIndex: 10, bottom: '2rem', right: '2rem' }}>
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
)(Categories);
