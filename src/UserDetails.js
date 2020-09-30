import React, {Component} from 'react';

import userDB from './userDB.json';

class UserDetails extends Component {
	render() {
		const userId = this.props.match.params.id;
		const currentUser = userDB.users[userId];

		return (
			<div>
				<div>{`המזהה שלי הוא ${currentUser.userId}`}</div>
				<div>{`וקוראים לי ${currentUser.name}`}</div> 
				<div>{`ואני ${currentUser.gender}`}</div>
			</div>
		);
	}
}

export default UserDetails;