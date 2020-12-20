import React, {Component} from 'react';

import UsersListContainer from './UsersListContainer';


class UsersListAndSearch extends Component {
	
	render() {
		const {
			users,
			valueInput
		} = this.props;


		return(
			<div className="users-list">
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