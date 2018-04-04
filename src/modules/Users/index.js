import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from "react-redux";

import { Link } from 'react-router-dom'

import List, { ListItem, ListItemText } from 'material-ui/List';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button'
import ContentAddIcon from 'material-ui-icons/Add';

import { fetchUsersIfNeeded } from '../../actions/userActions'

class Categories extends React.Component {
    componentDidMount() {
        this.props.fetchUsersIfNeeded()
    }
    handleItemClick = (item) => {
        const { history } = this.props
        history.push(`/users/${item.id}`)
    }
    render() {
        const { users } = this.props

        const mappedTables = users.items.map(category => {
            return <ListItem button key={category.id} onClick={() => this.handleItemClick(category)}>
                <ListItemText primary={category.name} />
            </ListItem>

        })


        return <div className="container">
            <Paper className="mb">

                <List>

                    {mappedTables}
                </List>
            </Paper>

            <Button variant="fab" component={Link} to="/users/new" style={{ position: 'fixed', zIndex: 10, bottom: '2rem', right: '2rem' }}>
                <ContentAddIcon />
            </Button>


        </div>
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        fetchUsersIfNeeded
    }, dispatch)
};

const mapStateToProps = ({ users }) => ({
    users
});


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Categories);
