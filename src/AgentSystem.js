import React, {Component} from 'react';
import {Route} from "react-router-dom";

import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

class AgentSystem extends Component {
	render() {
		const {match} = this.props;

		return (
			<div className="agent-system-container">
				<div className="header">מערכת לניהול סוכני שירות</div>
				
				<Route path={`${match.path}/login`} component={LoginForm}/>
				<Route path={`${match.path}/register`} component={RegisterForm}/>
			</div>
		);
	}
}

export default AgentSystem;