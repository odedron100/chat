import React, {Component} from 'react';

import LoginForm from './LoginForm';

class AgentSystem extends Component {
	render() {
		return (
			<div className="agent-system-container">
				<LoginForm />
			</div>
		);
	}
}

export default AgentSystem;