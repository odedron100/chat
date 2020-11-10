import React, {Component} from 'react';
import {Link} from "react-router-dom";

import DBManager from './DBManager';
import Loading from './Loading';

class UsersList extends Component {
	state = {
		users: {},
		valueInput: '',
		isLoadingOded: false,
	}

	componentDidMount() {
		this.setState({isLoadingOded: true});
	    DBManager.getUsers().then((users) => {
	      this.setState({users});
		  this.setState({isLoadingOded: false});
		  this.originalUsersObject = users;
	    });
	}

	 handleChange = (e) => {
		this.setState({valueInput: e.target.value});

		const filteredUsersKeysArray = Object.keys(this.originalUsersObject).filter((key, index) => {
			const item = this.originalUsersObject[key];
			return item.name.toLowerCase().includes(e.target.value.toLowerCase());
		});


		const filteredUsersAsObject = {};

		filteredUsersKeysArray.forEach(currentKey => {
			const item = this.originalUsersObject[currentKey];
			filteredUsersAsObject[currentKey] = item;
		});

		this.setState({users: filteredUsersAsObject});
  }

	render() {

		const {users, isLoadingOded,valueInput} = this.state;

		return (
			<div className="listUsers-container">
				{isLoadingOded ?
					<Loading text="טוען משתמשים..." />
					:
					<div className="users-list">
						<input className="list-input" placeholder="חפש משתמשים" onChange={this.handleChange} value={valueInput}></input>
						<div className="list-container">
							{Object.keys(users).map((key, index) => {
								const item = users[key];
								return(
									<Link to={`/users/user/${key}`} className="user-link-container" key={index} style={{backgroundImage: `url(https://randomuser.me/api/portraits/men/${index + 1}.jpg)`}}>
										<div className="user-details-container">
											<div className="name">{item.name}</div>
											<span className="all-Item">
											</span>
											<span className="messages-number">{index * 8 + 17} הודעות</span>
									    </div>
									</Link>
								)
								
							})}
						</div>
					</div>
				}
			</div>
		);
	}
}

export default UsersList;
