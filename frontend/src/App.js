import React from 'react';
import { Route, Switch } from 'react-router';

const App = () => (
	<div className="container">
		<h1>Readable Project</h1>

		<Switch>
			<Route exact path="/" component={() => (
				<h2>Posts</h2>
			)} />
		</Switch>
	</div>
)

export default App;
