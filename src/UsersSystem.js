import React, { Component } from 'react';
import { Route } from "react-router-dom";

import UsersList from './UsersList';
import DBManager from './DBManager';
import './UsersSystem.css'

class UsersSystem extends Component {
	state = {
		agent: null
	}

	componentDidMount() {
		DBManager.getIsAgentLoggedIn((user) => {
			const { email } = user;

			DBManager.getCurrentAgent(email).then(currentAgent => {
				this.setState({ agent: currentAgent })
			});
		})
	}

	logoutUser = () => {
		DBManager.logoutUser().then(() => {
			DBManager.getIsAgentLoggedIn((user) => {
				if (!user) {
					this.setState({ agent: null });
					this.props.history.push('/agents/login');
				}
			})
		});
	}

	render() {
		const { match } = this.props;
		const { agent } = this.state;

		return (
			<div className="users-system-container">
				<div className="header">
					{agent && <div className="hello-user-message">שלום, {agent.fullName}</div>}
					<span>מערכת לניהול משתמשים</span>
					{agent && <div className="logout-button" onClick={this.logoutUser}>התנתק</div>}
				</div>
				<Route path={`${match.path}/List`} component={UsersList} />
			</div>
		);
	}
}

export default UsersSystem;