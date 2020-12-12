import React, {Component} from 'react';

import DBManager from './DBManager';
import UsersListContainer from './UsersListContainer';


class UsersListAndSearch extends Component {
	
	render() {
		const {
			users,
			messages,
			unReadMessages,
			currentAgent,
			valueInput
		} = this.props;

		console.log('users', users);

		return(
			<div className="users-list">
				{currentAgent && <div className="agent-name">{` שלום, ${currentAgent.fullName} `}</div>}
				<div className="log-out-button" onClick={this.logOutButton}>התנתק</div>
				<input 
					className="list-input"
					placeholder="חפש משתמשים"
					onChange={this.props.handleChange}
					value={valueInput}>	
				</input>
				{users ?
					<div className="list-container">
						<UsersListContainer users={this.props.users} messages={this.props.messages} unReadMessages={this.props.unReadMessages} onUserClicked={this.props.onUserClicked}/>
					</div>
					:
					<div className="no-users">אין משתמשים פעילים</div>
				}
			</div>		
		);	
	}	
}

export default UsersListAndSearch;