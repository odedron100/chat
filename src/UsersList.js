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
		messages:{}
	}

	componentDidMount() {
		// const {messages} = this.state;
		this.setState({isloading: true});
	    DBManager.getUsers().then((users) => {
	      this.setState({users});
		  this.setState({isloading: false});
		  this.originalUsersObject = users;
		  // console.log('this.originalUsersObject', this.originalUsersObject);
			// console.log('currentKey', currentKey);
			Object.keys(users).forEach(currentKey => {
		  		const onNewMessageAdded = (messagesFromServer) => {

       				// this.setState({messages: messagesFromServer || {});

         			// this.scrollChatToEnd(isWithAnimation);
      
     					const messages = {
     						...this.state.messages,
     						[currentKey]:messagesFromServer || []
     					};

     					this.setState({messages:messages});
     				
          		}
     				DBManager.registerToNewMessages(currentKey,onNewMessageAdded);
			});	
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

		const {users, isloading,valueInput,selectedUser, messages} = this.state;
		// console.log('messages', messages);
		// console.log('users[key', users[key);
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
								// console.log('messages[item]', messages[item]);
								// DBManager.getMessages(key).then((messages) => {
								 // console.log('messages', messages);
								 // console.log('messages[key]', messages[key]);
									return(
										<div className="user-link-container" key={index} style={{backgroundImage: `url(https://randomuser.me/api/portraits/men/${index + 1}.jpg)`}}  onClick={()=>this.onUserClicked(key)}>
											<div className="user-details-container">
												{messages[key] && <div className="messages-number">{`${messages[key].length} הודעות`} </div>}
												<div className="name">{item.name}</div>
												<span className="all-Item">
												</span>
												
										    </div>
										</div>
									)
								// });	
							})}
							{selectedUser && <Chat owner={selectedUser} isAgent={true} messages={this.state.messages}/>}

						</div>
					</div>
				}
			</div>
		);
	}
}

export default UsersList;
