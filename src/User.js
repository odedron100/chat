import React, {Component} from 'react';
import {Link, Route} from "react-router-dom";

import UserDetails from './UserDetails';

class User extends Component {
	render() {
		const {match} = this.props;
		
		return (
			<div className="form-container">
				<Route path={`${match.path}/:userId`} component={UserDetails}/>

				<Link to="/users/List">
					<div id="list-Button">Return to users list</div>
				</Link>
			</div>
		);
	}
}

export default User;