import React, {Component} from 'react';
import {Route} from "react-router-dom";

import ListAgent from './ListAgent';
import User from './User';

class UsersSystem extends Component {
	render() {
		const {match} = this.props;

		return (
			<div className="users-system-container">
				<div>Users System</div>	
				<Route path={`${match.path}/List`} component={ListAgent}/>
				<Route path={`${match.path}/User`} component={User}/>
			</div>
		);
	}
}

export default UsersSystem;