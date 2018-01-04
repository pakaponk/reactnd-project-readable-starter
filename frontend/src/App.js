import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { fetchCategories } from './actions/category.action'


class App extends Component {
	
	componentDidMount(){
		this.props.dispatch(fetchCategories())
	}

	render() {

		const categories = this.props.categories.items.map(category => ({
			...category,
			title: category.name.slice(0, 1).toUpperCase() + category.name.slice(1)
		}))

		return (
			<div className="container">
				<h1 className="text-center m-4">Readable Project</h1>
	
				<h2>Categories</h2>
				
				<div className="d-flex py-3 mb-3">
					<div className="mr-4">
						<Link className="btn btn-info p-4" to="/">All Posts</Link>	
					</div>
					{
						categories.map((category, index) => (
							<div key={index} className={index !== categories.length - 1 ? 'mr-4' : ''}>
								<Link className="btn btn-info p-4" to={`/${category.name}`}>{category.title}</Link>	
							</div>	
						))
					}
				</div>
				
	
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		categories: state.categories
	}
}

const AppContainer = connect(mapStateToProps)(App)

export default AppContainer;