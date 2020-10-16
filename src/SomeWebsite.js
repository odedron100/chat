import React, {Component} from 'react';

import Chat from './Chat';
import DBManager from './DBManager';

class SomeWebsite extends Component {
	state = {
		owner: DBManager.getCurrentUser()
	}

	updateCurrentUser = (currentUser) => {
		DBManager.setCurrentUser(currentUser);
		this.setState({owner: currentUser});
	}

	render() {
		return (
			<div className="some-website-container">
				<div className="logo"></div>

        		<Chat updateCurrentUser={this.updateCurrentUser} owner={this.state.owner} />
			</div>
		);
	}
}

export default SomeWebsite;