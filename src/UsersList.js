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
		unReadMessages:{},
	}

	componentDidMount() {
		console.log('here');
		const currentAgent = DBManager.getCurrentAgent();
		if (currentAgent) {
			this.setState({currentAgent});
		}
		
		this.setState({isloading: true});
	    const onNewUserAdded = (users) =>{
	    	this.setState({users});
		  	this.setState({isloading: false});
		  	this.originalUsersObject = users;
				if (users) {
					Object.keys(users).forEach(currentKey => {
						this.unReadMessages(currentKey);	
	  
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
		}
		DBManager.getUsers(onNewUserAdded);			 
	}

	unReadMessages = (ownerId) =>{
	const onNewMessageAdded = (newUnReadMessages) => {
      const unReadMessages = {
      	...this.state.unReadMessages,
      	[ownerId]:newUnReadMessages||[]
      };

      this.setState({unReadMessages: unReadMessages || []});
      	if (this.state.selectedUser) {
      		if (ownerId === this.state.selectedUser.id) {
				this.onUserClicked(this.state.selectedUser.id);
			}	
		}	
    }	
	    DBManager.getUnReadMessages(ownerId, onNewMessageAdded);
	    	
	}

	numberOfUnreadMessages = () =>{
		console.log('numberOfUnreadMessages');
		const {messages} = this.state;
		Object.keys(messages).forEach(currentKey => {
			console.log('currentKey', currentKey);
			console.log('messages', messages);
		});	
	}

	 handleChange = (e) => {
		this.setState({valueInput: e.target.value});

		if (this.state.users) {
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
  }


  onUserClicked = (key) =>{
  	const {users,messages} = this.state;
  	const currentUser = {
  		name: users[key].name,
  		id: key
  	};

  	this.setState({selectedUser: null}, () => {
      this.setState({selectedUser:currentUser})
    });
    
    DBManager.setUnReadMessages(key,[]);    	
  }

  logOutButton = () =>{
  	console.log('logout');
  	localStorage.clear('currentAgent');
  	DBManager.setOnlineAgent(null);
  	this.setState({currentAgent:null}); 
  }


	render() {

		const {users, isloading,valueInput,selectedUser, messages,currentAgent,unReadMessages} = this.state;

		const agent = DBManager.getCurrentAgent();
		if (selectedUser) {
			console.log('selectedUser', selectedUser.id);
		}			
			return (
			<div className="listUsers-container">
				{isloading ?
					<Loading text="טוען משתמשים..." />
					:
					<div className="users-list">
						{currentAgent&&<div className="agent-name">{` שלום, ${currentAgent.fullName} `}</div>}
						<div className="log-out-button" onClick={this.logOutButton}>התנתק</div>
						<input className="list-input" placeholder="חפש משתמשים" onChange={this.handleChange} value={valueInput}></input>
						{!users && <div className="no-users">אין משתמשים פעילים</div>}
						{users && <div className="list-container">
							{Object.keys(users).map((key, index) => {
								if (messages[key]) {
									// console.log('messages[key][0].owner', messages[key][0].owner);
								}
								const item = users[key];
								// if (unReadMessages[key]) {	
								// 	// console.log('unReadMessages[key].length', unReadMessages[key].length);
								// }	
								let messagesClass = '';

								if (unReadMessages[key]) {
									 messagesClass = 'messages-number ' + (this.state.unReadMessages[key].length > 0 && 'unReadMessages');
								}
								else{
									messagesClass = 'messages-number';
								}	

								
									return(
										<div className="user-link-container" key={index} style={{backgroundImage: `url(https://randomuser.me/api/portraits/men/${index + 1}.jpg)`}}  onClick={()=>this.onUserClicked(key)} >
										{messages[key] && <div className={messagesClass}>{messages[key].length} </div>}
											<div className="user-details-container">
												<div className="name">{item.name}</div>
												<span className="all-Item">
												</span>
												
										    </div>
										</div>
									)
								
							})}
							{selectedUser && <Chat owner={selectedUser} isAgent={true} messages={this.state.messages} currentOnlineAgent={true}/>}

						</div>}
					</div>
				}
			</div>
		);
	}
}

export default UsersList;
