import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from "react-redux";
import { withStyles } from 'material-ui/styles';

import { Link } from 'react-router-dom'

import List, { ListItem, ListItemText } from 'material-ui/List';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button'
import ContentAddIcon from 'material-ui-icons/Add';
import Switch from 'material-ui/Switch';
import { FormControlLabel } from 'material-ui/Form';
import Divider from 'material-ui/Divider';

import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc';

import { fetchCategoriesIfNeeded, updateSorting } from '../../actions/categoryActions'


const styles = theme => ({
	root: {
		padding: theme.spacing.unit * 2,
		flex: 1,
	},

	border: {
		borderBottom: '1px solid #DDD'
	},
});

class Categories extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			isSorting: false
		}
	}
	componentDidMount() {
		this.props.fetchCategoriesIfNeeded()
	}
	handleItemClick = (item) => {
		const { history } = this.props
		history.push(`/categories/${item.id}`)
	}
	handleChangeSorting = () => {
		this.setState({
			isSorting: !this.state.isSorting
		})
	}
	onSortEnd = ({ oldIndex, newIndex }) => {
		this.props.updateSorting(arrayMove(this.props.categories.items, oldIndex, newIndex))
	};
	render() {
		const { categories, classes } = this.props

		const Items = ({ item }) => <ListItem
			className={this.state.isSorting ? classes.border : ''}
			button onClick={() => this.handleItemClick(item)}>
			<ListItemText primary={item.name} />
		</ListItem>

		const SortableItem = SortableElement(({ item }) =>
			<Items item={item} />
		);

		const SortableList = SortableContainer(({ items }) => {
			return (
				<List>
					{items.map((item, index) => (
						< SortableItem key={`item-${index}`} index={index} item={item} />
					))}
				</List>
			);
		});
		const NormalList = SortableContainer(({ items }) => {
			return (
				<List>
					{items.map((item, index) => (
						<Items key={`item-${index}`} index={index} item={item} />

					))}
				</List>
			);
		});



		return <div className="container">
			<Paper className="mb">
				<FormControlLabel
					className={classes.root}
					control={
						<Switch
							checked={this.state.isSorting}
							onChange={this.handleChangeSorting}
							value="checkedB"
							color="primary"
						/>
					}
					label="Re-order"
				/>
				<Divider />


				{this.state.isSorting
					?
					<SortableList items={categories.items} onSortEnd={this.onSortEnd} />
					:
					<NormalList items={categories.items} />
				}
			</Paper>

			<Button variant="fab" color="primary" component={Link} to="/categories/new" style={{ position: 'fixed', zIndex: 10, bottom: '2rem', right: '2rem' }}>
				<ContentAddIcon />
			</Button>


		</div>
	}
}

const mapDispatchToProps = dispatch => {
	return bindActionCreators({
		fetchCategoriesIfNeeded,
		updateSorting
	}, dispatch)
};

const mapStateToProps = ({ categories }) => ({
	categories
});

Categories = withStyles(styles)(Categories)


export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Categories);
