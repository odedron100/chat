import React, {Component} from 'react';

import DBManager from './DBManager';

class Chat extends Component {
  state = {
  	isChatWindowOpen: false,
  	valueInput: '',
    messages: [],
  }

  componentDidMount() {
    if (this.props.owner) {
      this.registerToNewMessages(this.props.owner.id);
    }
  }

  registerToNewMessages = (ownerId) => {
    console.log('ownerId', ownerId);
    const onNewMessageAdded = (messagesFromServer) => {
      const isWithAnimation = this.state.messages.length !== 0;
      console.log('messagesFromServer', messagesFromServer);

      this.setState({messages: messagesFromServer || []}, () => {
        this.scrollChatToEnd(isWithAnimation);
      });
    }

    DBManager.registerToNewMessages(ownerId, onNewMessageAdded);
  }

  toggleChatWindow = () => {
    if (!this.state.isChatWindowOpen && !this.props.owner) {
      const userName = prompt("Please enter your name");
      if (userName !== null) {
        const newUser = {
          name: userName,
        }
      	this.setState({isChatWindowOpen: !this.state.isChatWindowOpen}, () => {
          if (this.state.isChatWindowOpen) {
            this.scrollChatToEnd();
          }
        });

        DBManager.createNewUser(newUser).then(user => {
          this.props.updateCurrentUser(user);
          this.setState({owner: user}, () => {
            this.addNewMessage(`?שלום ${userName}, איך אפשר לעזור`);
          });
        });
      }  

    } else {
      this.setState({isChatWindowOpen: !this.state.isChatWindowOpen}, () => {
          if (this.state.isChatWindowOpen) {
            this.scrollChatToEnd();
          }
        });
      this.setState({owner: this.props.owner});
    }
  }

  handleKeyDown = (e) => {
  	if (e.keyCode === 13 && e.target.value !== '') {
      this.addNewMessage(this.inputValueElement.innerText);
      this.inputValueElement.innerHTML = '';
  	}
  }

  addNewMessage = (message) => {
    const {owner} = this.state;
  	const {messages} = this.state;
    const time = (new Date()).toISOString();

    if (messages.length === 0) {
      let messageOwner;

      messageOwner = {
        name:'Agent'
      }

      const newMessage = {
        text:message,
        time:time,
        owner:messageOwner
      }
      // messages.push(newMessage);
      // this.setState({messages: [...messages, newMessage]});

      
      console.log('before set messages - owner.id', owner.id);
      DBManager.setMessages(owner.id, [newMessage])
        .then(() => {
          this.registerToNewMessages(owner.id);
        })
        
    } else {
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
      // messages.push(newMessage);
    
      
      DBManager.setMessages(owner.id, [...messages, newMessage]);
    }
  }

  inputValueRef = (inputValueElement) => {
    this.inputValueElement = inputValueElement;
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
  	const {isChatWindowOpen, messages} = this.state;
    console.log('messages', messages);

    return (
      <div className="chat-container">
        <div className="open-chat-button" onClick={this.toggleChatWindow}></div>

      	<div className={`chat-window ${isChatWindowOpen ? 'visible' : ''}`}>
          <div className="chat-header">צ׳אט תמיכה</div>
      		<div className="messages-container" ref={this.setMessageContainerRef}>

				{messages.map((message, index) => {
          let textClassName = 'message-text ';
          const isAgentMessage = !message.owner.id;
          textClassName = textClassName + (isAgentMessage && 'message-text-Agent');

					return <div className={`users-messages ${message.owner.name}`} key={index}> <div className={textClassName} >{message.text}</div></div>
				})}       	
      		</div>
      		<div className="chat-input" contentEditable='true'  ref={this.inputValueRef} onKeyDown={this.handleKeyDown}></div>
      	</div>
      </div>
    );
  } 
}

export default Chat;