import React, {Component} from 'react';

import DBManager from './DBManager';
import UserItem from './UserItem';

class UsersListContainer extends Component {
	render() {
		const {
			users,
			unReadMessages,
			messages
		} = this.props;
			
		// console.log('unReadMessages', unReadMessages);
		return(
			Object.keys(users).map((user, index) => {
				const item = users[user];
				let messagesClass = '';

				if (unReadMessages[user]) {
					 messagesClass = 'messages-number ' + (unReadMessages[user].length > 0 && 'unReadMessages');
				}
				else{
					messagesClass = 'messages-number';
				}
				
				return (
					

					<UserItem users={this.props.users} key={index} user={user} index={index} item={item} messagesClass={messagesClass} messages={this.props.messages} onUserClicked={this.props.onUserClicked}/>
				);
			})							
		);
	}
}

export default UsersListContainer;