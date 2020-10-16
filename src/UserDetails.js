import React, {Component} from 'react';
import {Redirect} from "react-router-dom";

import Chat from './Chat';
import DBManager from './DBManager';

class UserDetails extends Component {
	state = {
		currentUser: null
	}

	componentDidMount() {
		const userId = this.props.match.params.id;
		const users = DBManager.getUsers();
		const currentUser = users.find(user => user.id === userId);

		this.setState({currentUser: currentUser});
	}

	render() {
		// const currentUser = DBManager.getCurrentUser();
		const {currentUser} = this.state;

		if (currentUser === undefined) {
			return <Redirect to="/users/List" />;
		} else if (currentUser === null) {
			return null;
		}

		return(
			<div>
				<div>
					<div>{`המזהה שלי הוא ${currentUser.id}`}</div>
					<div>{`וקוראים לי ${currentUser.name}`}</div> 

					<Chat owner={'Me'} />
				</div>
					
			</div>	
		);

	}
}

export default UserDetails;
