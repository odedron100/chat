import React, {Component} from 'react';
import {Link} from "react-router-dom";

class User extends Component {
	render() {
		console.log('thos.props', this.props);
		// const {match} = this.props;

				// <Route path={`${match.path}/:id`} component={User}/>
		return (
			<div className="form-container">

				<Link to="/agents/List">
					<div id="list-Button">Return to agent list</div>
				</Link>
			</div>
		);
	}
}

export default User;