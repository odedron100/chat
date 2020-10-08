import React, {Component} from 'react';
import {Redirect} from "react-router-dom";

import Chat from './Chat';
import userDB from './userDB.json';

class UserDetails extends Component {
	render() {
		const userId = this.props.match.params.id;
		const users = JSON.parse(localStorage.getItem('usersName'));
		const currentUser = users.find(user => user.id === userId);

		if (!currentUser) {
			return <Redirect to="/agents/List" />;
		}

		return(
			<div>
				<div>
					<div>{`המזהה שלי הוא ${userId}`}</div>
					<div>{`וקוראים לי ${currentUser.name}`}</div> 

					<Chat owner={`${currentUser.name}`} />
				</div>
					
			</div>	
		);

	}
}

export default UserDetails;
