import React, {Component} from 'react';
import {Route} from "react-router-dom";

import UsersList from './UsersList';
import User from './User';
import './UsersSystem.css'

class UsersSystem extends Component {
	render() {
		const {match} = this.props;
		console.log('this.props.currentAgent', this.props.currentAgent);

		return (
			<div className="users-system-container">
				<div className="header">מערכת לניהול משתמשים</div>
				<Route path={`${match.path}/List`} component={UsersList}/>
				<Route path={`${match.path}/User`} component={User}/>
			</div>
		);
	}
}

export default UsersSystem;