import React, {Component} from 'react';
import {Link} from "react-router-dom";

import DBManager from './DBManager';
import Loading from './Loading';

class ListUsers extends Component {
	state = {
		users: {},
		valueInput: '',
		isLoading: false,
	}

	componentDidMount() {
		this.setState({isLoading: true});
	    DBManager.getUsers().then((users) => {
	      this.setState({users});
		  this.setState({isLoading: false});
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

		const {users, isLoading,valueInput} = this.state;

		return (
			<div className="listUsers-container">
				<div className="title"> My list of calls history</div>	
				{isLoading ?
					<Loading />
					:
					<div className="users-list">
						<input className="list-input" placeholder="Search user" onChange={this.handleChange} value={valueInput}></input>
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
