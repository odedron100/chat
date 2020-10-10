import React, {Component} from 'react';
import {Redirect} from "react-router-dom";

import Chat from './Chat';
import DBManager from './DBManager';

class UserDetails extends Component {
	render() {
		const userId = this.props.match.params.id;
		const currentUser = DBManager.getCurrentUser();

		if (!currentUser) {
			return <Redirect to="/users/List" />;
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
