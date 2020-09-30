import React, {Component} from 'react';

class Chat extends Component {
  state = {
  	isChatWindowOpen: false,
  	valueInput: '',
  	messages: [],
  }

  openChatWindow = () => {
  	this.setState({isChatWindowOpen: !this.state.isChatWindowOpen});
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
  	messages.push(message);
  	this.setState({messages: messages});
  }

  render() {
  	const {isChatWindowOpen, messages, valueInput} = this.state;

    return (
      <div className="chat-container">
        {isChatWindowOpen && 
        	<div className="chat-window">
        		<div className="messages-container">
					{messages.map((message, index) => {
						return <div className="message-chat" key={index}> me: <span className="message-text">{message}</span></div>
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