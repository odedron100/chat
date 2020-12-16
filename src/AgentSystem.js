import React, {Component} from 'react';
import {Route} from "react-router-dom";

import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

class AgentSystem extends Component {
	state = {
		agent: null
	}

	componentDidMount() {
		DBManager.getIsUserLoggedIn((agent) => {
			if (agent) {
				// DBManager.getAgent(agent.email).then(agent => {
				// 	 this.setState({agent});
				// })
			} else {
				// redeirect to login.
			}
		});
	}

	render() {
		const {match} = this.props;
		const {agent} = this.state;

		return (
			<div className="agent-system-container">
				<div className="header">
					{agent && <div>שלום, {agent.fullName}</div>}
					<span>מערכת לניהול סוכני שירות</span>
				</div>
				
				<Route path={`${match.path}/login`} component={LoginForm}/>
				<Route path={`${match.path}/register`} component={RegisterForm}/>
			</div>
		);
	}
}

export default AgentSystem;