import React, {Component} from 'react';

import DBManager from './DBManager';
import Loading from './Loading';
import Chat from './Chat';

class UsersList extends Component {
	state = {
		users: {},
		valueInput: '',
		isloading: false,
		selectedUser: null,
	}

	componentDidMount() {
		this.setState({isloading: true});
	    DBManager.getUsers().then((users) => {
	      this.setState({users});
		  this.setState({isloading: false});
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


  onUserClicked = (key) =>{
  	const {users} = this.state;
  	const currentUser = {
  		name: users[key].name,
  		id: key
  	};

  	this.setState({selectedUser: null}, () => {
      this.setState({selectedUser:currentUser})
    });
  }

	render() {

		const {users, isloading,valueInput,selectedUser} = this.state;

		return (
			<div className="listUsers-container">
				{isloading ?
					<Loading text="טוען משתמשים..." />
					:
					<div className="users-list">
						<input className="list-input" placeholder="חפש משתמשים" onChange={this.handleChange} value={valueInput}></input>
						<div className="list-container">
							{Object.keys(users).map((key, index) => {
								const item = users[key];
								return(
									<div className="user-link-container" key={index} style={{backgroundImage: `url(https://randomuser.me/api/portraits/men/${index + 1}.jpg)`}}  onClick={()=>this.onUserClicked(key)}>
										<div className="user-details-container">
											<div className="name">{item.name}</div>
											<span className="all-Item">
											</span>
											<span className="messages-number">{index * 8 + 17} הודעות</span>
									    </div>
									</div>
								)
								
							})}
							{selectedUser && <Chat owner={selectedUser} isAgent={true}/>}
						</div>
					</div>
				}
			</div>
		);
	}
}

export default UsersList;
