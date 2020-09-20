import React, {Component} from 'react';
import {Route} from "react-router-dom";

import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

class AgentSystem extends Component {
	render() {
		const {match} = this.props;

				// <Route path={match.path + '/login'} component={LoginForm}/>
		return (
			<div className="agent-system-container">
				<div>Agent System</div>
				
				<Route path={`${match.path}/login`} component={LoginForm}/>
				<Route path={`${match.path}/register`} component={RegisterForm}/>
			</div>
		);
	}
}

export default AgentSystem;