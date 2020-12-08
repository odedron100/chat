import React, {Component} from 'react';

import Chat from './Chat';
import DBManager from './DBManager';

class SomeWebsite extends Component {
	state = {
		owner: DBManager.getCurrentUser(),
		currentOnlineAgent: null,
	}

	componentDidMount() {
    	const onAgentLogin = (onlineAgent) =>{
	     	this.setState({currentOnlineAgent: onlineAgent});
   		}
   		
   		DBManager.getOnlineAgent(onAgentLogin);
  	}

	updateCurrentUser = (currentUser) => {
		DBManager.setCurrentUser(currentUser);
		this.setState({owner: currentUser});
	}

	render() {
		console.log('this.state.owner', this.state.owner);
		return (
			<div className="some-website-container">
				<div className="logo"></div>

        		<Chat updateCurrentUser={this.updateCurrentUser} owner={this.state.owner} currentOnlineAgent={this.state.currentOnlineAgent}/>
			</div>
		);
	}
}

export default SomeWebsite;