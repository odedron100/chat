import React, {Component} from 'react';

import DBManager from './DBManager';

class Chat extends Component {
  state = {
  	isChatWindowOpen: false,
  	valueInput: '',
    messages: DBManager.getMessages(),
    // messages: JSON.parse(localStorage.getItem('messages')) || [],
    // users: [],
  }

  // componentDidMount() {
  //   DBManager.getUsers().then((users) => {
  //     this.setState({users});
  //   });
  // }


  toggleChatWindow = () => {
    // const {users} = this.state;
    // console.log('users', users);
  	this.setState({isChatWindowOpen: !this.state.isChatWindowOpen});
    if (!this.state.isChatWindowOpen && !this.props.owner) {
      const userName = prompt("Please enter your name");
      this.setState({owner: userName});
      // const id = (new Date()).toISOString();
    
      const newUser = {
        name: userName,
        // id: id, 
      }
      this.props.updateCurrentUser(userName);

      // users.push(newUser);

      // this.setState({users: users});
      // DBManager.setUsers(users);
      DBManager.createNewUser(newUser);
    } else {
      this.setState({owner: this.props.owner});
    } 
  }

  handleKeyDown = (e) => {
  	if (e.keyCode === 13 && e.target.value !== '') {
      this.addNewMessage(e.target.value);
      this.setState({valueInput: ''});
  	}
  }

  handleChange = (e) => {
	this.setState({valueInput: e.target.value});
  }

  addNewMessage = (message) => {
    const {owner} = this.state;
    // const owner = localStorage.getItem('currentUser');
  	const {messages} = this.state;
    const time = (new Date()).toISOString();

    const newMessage = {
     text: message,
     time: time,
     owner: owner,
    }
   messages.push(newMessage);
  
   this.setState({messages: messages});

    DBManager.setMessages(messages);
    // localStorage.setItem('messages',JSON.stringify(messages));
  }


  render() {
  	const {isChatWindowOpen, messages, valueInput} = this.state;

    return (
      <div className="chat-container">
        {isChatWindowOpen && 
        	<div className="chat-window">
        		<div className="messages-container">
					{messages.map((message, index) => {
						return <div className={`users-messages ${message.owner}`} key={index}> <div>{`${message.owner}:`}</div> <div className="message-text" >{message.text}</div></div>
					})}       	
        		</div>
        		<input className="chat-input" value={valueInput} onChange={this.handleChange} onKeyDown={this.handleKeyDown}></input>
        	</div>
        }
        <div className="open-chat-button" onClick={this.toggleChatWindow}> נציג צ׳אט זמין עבורך </div>
      </div>
    );
  } 
}

export default Chat;