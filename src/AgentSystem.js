import React, {Component} from 'react';
import {Route} from "react-router-dom";

import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import ListAgent from './ListAgent';
import User from './User';

class AgentSystem extends Component {
	render() {
		const {match} = this.props;

		return (
			<div className="agent-system-container">
				<div>Agent System</div>
				
				<Route path={`${match.path}/login`} component={LoginForm}/>
				<Route path={`${match.path}/register`} component={RegisterForm}/>
				<Route path={`${match.path}/List`} component={ListAgent}/>
				<Route path={`${match.path}/User`} component={User}/>
			</div>
		);
	}
}

export default AgentSystem;