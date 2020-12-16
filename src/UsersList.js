import React, {Component} from 'react';
import {Redirect} from "react-router-dom";

import DBManager from './DBManager';
import Loading from './Loading';
import Chat from './Chat';
import UsersListAndSearch from './UsersListAndSearch';

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
		DBManager.setOnlineAgent('online');
		this.handleWindowClose();
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
      	const {selectedUser} = this.state;
      	if (selectedUser && selectedUser.id === ownerId) {
			this.onUserClicked(selectedUser.id);
		}
    }	
	    DBManager.getUnReadMessages(ownerId, onNewMessageAdded);
	    	
	}

	// numberOfUnreadMessages = () =>{
	// 	console.log('numberOfUnreadMessages');
	// 	const {messages} = this.state;
	// 	Object.keys(messages).forEach(currentKey => {
	// 		console.log('currentKey', currentKey);
	// 		console.log('messages', messages);
	// 	});	
	// }

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

  handleWindowClose = () => {
  	  window.addEventListener("beforeunload", (ev) => {
        ev.preventDefault();
        return this.doSomethingBeforeUnload();
      });
  }


  doSomethingBeforeUnload = () =>{
  	DBManager.setOnlineAgent('busy');
  }

 
	render() {
		const {users, isloading,valueInput,selectedUser, messages,currentAgent,unReadMessages} = this.state;

		const agent = DBManager.getCurrentAgent();
		// if (selectedUser) {
		// 	console.log('selectedUser', selectedUser.id);
		// }		

		return (
			<div className="listUsers-container">
				{isloading ?
					<Loading text="טוען משתמשים..." />
					:
					<>					
						<UsersListAndSearch users={this.state.users} unReadMessages={this.state.unReadMessages} messages={this.state.messages} valueInput={this.state.valueInput}
						 currentAgent={this.state.currentAgent} onUserClicked={this.onUserClicked} handleChange={this.handleChange} logOutButton={this.logOutButton}
						/>
						{selectedUser && <Chat owner={selectedUser} isAgent={true} messages={this.state.messages} currentOnlineAgent={true} shouldStartOpen={true} />}
					</>
				}
			</div>
		);
	}
}

export default UsersList;
