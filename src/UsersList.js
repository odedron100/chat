import React, {Component} from 'react';
import {Redirect} from "react-router-dom";

import DBManager from './DBManager';
import Loading from './Loading';
import Chat from './Chat';

class UsersList extends Component {
	state = {
		users: {},
		valueInput: '',
		isloading: false,
		selectedUser: null,
		messages:{},
		currentAgent:null,
	}

	componentDidMount() {
		console.log('here');
		const currentAgent = DBManager.getCurrentAgent();
		// console.log('currentAgent', currentAgent);
		if (currentAgent) {
			this.setState({currentAgent});
		}
		
		this.setState({isloading: true});
	    DBManager.getUsers().then((users) => {
	      this.setState({users});
		  this.setState({isloading: false});
		  this.originalUsersObject = users;
			if (users) {
				Object.keys(users).forEach(currentKey => {
			  		const onNewMessageAdded = (messagesFromServer) => {
	      
	     					const messages = {
	     						...this.state.messages,
	     						[currentKey]:messagesFromServer || []
	     					};

	     					this.setState({messages:messages});
	     				
	          		}
	     				DBManager.registerToNewMessages(currentKey,onNewMessageAdded);
				});	
			}	
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

  logOutButton = () =>{
  	localStorage.clear('currentAgent');
  	this.setState({currentAgent:null}); 
  }

	render() {
		console.log('this.props', this.props);

		const {users, isloading,valueInput,selectedUser, messages,currentAgent} = this.state;
		const agent = DBManager.getCurrentAgent();
						// {!agent && <Redirect to="/agents/login" />}
			return (
			<div className="listUsers-container">
				{isloading ?
					<Loading text="טוען משתמשים..." />
					:
					<div className="users-list">
						{currentAgent&&<div className="agent-name">{` שלום, ${currentAgent.fullName} `}</div>}
						<div className="log-out-button" onClick={this.logOutButton}>התנתק</div>
						<input className="list-input" placeholder="חפש משתמשים" onChange={this.handleChange} value={valueInput}></input>
						{users && <div className="list-container">
							{Object.keys(users).map((key, index) => {
								const item = users[key];
								
									return(
										<div className="user-link-container" key={index} style={{backgroundImage: `url(https://randomuser.me/api/portraits/men/${index + 1}.jpg)`}}  onClick={()=>this.onUserClicked(key)}>
										{messages[key] && <div className="messages-number">{messages[key].length} </div>}
											<div className="user-details-container">
												<div className="name">{item.name}</div>
												<span className="all-Item">
												</span>
												
										    </div>
										</div>
									)
								
							})}
							{selectedUser && <Chat owner={selectedUser} isAgent={true} messages={this.state.messages}/>}

						</div>}
					</div>
				}
			</div>
		);
	}
}

export default UsersList;
