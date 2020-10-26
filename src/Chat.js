import React, {Component} from 'react';

import DBManager from './DBManager';

class Chat extends Component {
  state = {
  	isChatWindowOpen: false,
  	valueInput: '',
    messages: [],
    // messages: JSON.parse(localStorage.getItem('messages')) || [],
    // users: [],
  }

  componentDidMount() {
    if (this.props.owner) {
      DBManager.getMessages(this.props.owner.id).then((messages) => {
        this.setState({messages: messages || []}, () => {
          this.scrollChatToEnd();
        });
      });
    }
  }




  toggleChatWindow = () => {
  	this.setState({isChatWindowOpen: !this.state.isChatWindowOpen}, () => {
      console.log('this.state.isChatWindowOpen', this.state.isChatWindowOpen);
      if (this.state.isChatWindowOpen) {
        this.scrollChatToEnd();
      }
    });
    if (!this.state.isChatWindowOpen && !this.props.owner) {
      const userName = prompt("Please enter your name");
      // this.setState({owner: userName});
      // const id = (new Date()).toISOString();
    
      const newUser = {
        name: userName,
      }

      DBManager.createNewUser(newUser).then(user => {
        this.props.updateCurrentUser(user);
        this.setState({owner: user});
      });
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

    let messageOwner;

    if (this.props.isAgent) {
      messageOwner = {
        name: 'Agent'
      }
    } else {
      messageOwner = owner;
    }

    const newMessage = {
     text: message,
     time: time,
     owner: messageOwner,
    } 
    messages.push(newMessage);
  
    this.setState({messages: messages}, () => {
      this.scrollChatToEnd(true);
    });
    console.log('after setState');


    DBManager.setMessages(owner.id, messages);
    // localStorage.setItem('messages',JSON.stringify(messages));
  }

  setMessageContainerRef = (messagesContainerElement) => {
    this.messagesContainerElement = messagesContainerElement;
  }

  scrollChatToEnd = (isWithAnimation) => {
    if (!this.messagesContainerElement) {
      return;
    }

    const options = {top: this.messagesContainerElement.scrollHeight, left: 0};

    if (isWithAnimation) {
      options.behavior = 'smooth';
    }

    this.messagesContainerElement.scrollTo(options); 
  }


  render() {
  	const {isChatWindowOpen, messages, valueInput} = this.state;
    console.log('render');

    return (
      <div className="chat-container">
        {isChatWindowOpen && 
        	<div className="chat-window">
        		<div className="messages-container" ref={this.setMessageContainerRef}>
					{messages.map((message, index) => {
            let textClassName = 'message-text ';
            const isAgentMessage = !message.owner.id;
            textClassName = textClassName + (isAgentMessage && 'message-text-Agent');

						return <div className={`users-messages ${message.owner.name}`} key={index}> <div>{`${message.owner.name}:`}</div> <div className={textClassName} >{message.text}</div></div>
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