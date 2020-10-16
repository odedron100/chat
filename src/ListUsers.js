import React, {Component} from 'react';
import {Link} from "react-router-dom";

import DBManager from './DBManager';
import Loading from './Loading';

class ListUsers extends Component {
	state = {
		users: {},
		isLoading: false
	}

	componentDidMount() {
		this.setState({isLoading: true});
	    DBManager.getUsers().then((users) => {
	    	console.log('users', users);
	      this.setState({users});
		  this.setState({isLoading: false});
	    });
	}

	render() {
		// const users = JSON.parse(localStorage.getItem('usersName'));
		// const users = DBManager.getUsers();
		// console.log('users', users);
		const {users, isLoading} = this.state;

		return (
			<div className="listUsers-container">
				<div className="title"> My list of calls history</div>	
				{isLoading ?
					<Loading />
					:
					<div className="users-list">
						{Object.keys(users).map((key, index) => {
							const item = users[key];
							return(
								<div className="calls-History" key={index}>
							 	  <span className="all-Item">
							 	    מספר מנוי:
							 	    <Link to={`/users/user/${key}`}>
							 	      <span className="item-Text">{key}</span>
							 	    </Link>
							 	  </span>
							  	  <span className="all-Item">שם:<span className="item-Text">{item.name}</span></span>
							   	  <span className="all-Item">מין:<span className="item-Text">{item.gender}</span></span> 
							   	  <span className="all-Item">אורך שיחה (דקות):<span className="item-Text">{item.callTime}</span></span>
							    </div>
							)
							
						})}	
					</div>
				}
			</div>
		);
	}
}

export default ListUsers;
