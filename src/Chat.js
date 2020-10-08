import React, {Component} from 'react';

import ListAgent from './ListAgent';

class Chat extends Component {
  state = {
  	isChatWindowOpen: false,
  	valueInput: '',
    messages: JSON.parse(localStorage.getItem('messages')) || [],
    users:JSON.parse(localStorage.getItem('usersName')) || [],
  }


  openChatWindow = () => {
  	this.setState({isChatWindowOpen: !this.state.isChatWindowOpen});
    if (this.props.owner === 'Me') {
      const {users} = this.state;
      if (!this.state.isChatWindowOpen) {
        const userName = prompt("Please enter your name");
        const id = (new Date()).toISOString();
      
        const newUser = {
          name: userName,
          id: id, 
        }

        users.push(newUser);

        this.setState({users: users});
      }  
      localStorage.setItem('usersName',JSON.stringify(users));
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
  	const {messages} = this.state;
    const time = (new Date()).toISOString();

    const newMessage = {
     text: message,
     time: time,
     owner: this.props.owner
    }
   messages.push(newMessage);
  
   this.setState({messages: messages});

    localStorage.setItem('messages',JSON.stringify(messages));
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
        <div className="open-chat-button" onClick={this.openChatWindow}> נציג צ׳אט זמין עבורך </div>
      </div>
    );
  } 
}

export default Chat;