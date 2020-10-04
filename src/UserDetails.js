import React, {Component} from 'react';
import {Redirect} from "react-router-dom";

import Chat from './Chat';
import userDB from './userDB.json';

class UserDetails extends Component {
	render() {
		const userId = this.props.match.params.id;
		const currentUser = userDB.users[userId];

		if (!currentUser) {
			return <Redirect to="/agents/List" />;
		}

		return (
			<div>
				<div>{`המזהה שלי הוא ${currentUser.userId}`}</div>
				<div>{`וקוראים לי ${currentUser.name}`}</div> 
				<div>{`ואני ${currentUser.gender}`}</div>

				<Chat owner={`${currentUser.name}`} />
			</div>
		);
	}
}

export default UserDetails;