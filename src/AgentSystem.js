import React, { Component } from 'react';
import { Route } from "react-router-dom";

import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import DBManager from './DBManager';

class AgentSystem extends Component {

	render() {
		const { match } = this.props;

		return (
			<div className="agent-system-container">
				<Route path={`${match.path}/login`} component={LoginForm} />
				<Route path={`${match.path}/register`} component={RegisterForm} />
			</div>
		);
	}
}

export default AgentSystem;