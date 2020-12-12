import React, {Component} from 'react';

import DBManager from './DBManager';

class Chat extends Component {
  state = {
  	isChatWindowOpen: false,
  	valueInput: '',
    messages: [],
    unReadMessages:{},
  }

  componentDidMount() {
    if (this.props.owner) {
      this.registerToNewMessages(this.props.owner.id);
    }

    if (this.props.shouldStartOpen) {
      this.setState({isChatWindowOpen: true});
    }
  }

  registerToNewMessages = (ownerId) => {
    const onNewMessageAdded = (messagesFromServer) => {
      const isWithAnimation = this.state.messages.length !== 0;

      this.setState({messages: messagesFromServer || []}, () => {
        this.scrollChatToEnd(isWithAnimation);
      });
    }

    DBManager.registerToNewMessages(ownerId, onNewMessageAdded);
  }

  toggleChatWindow = () => {
    if (this.state.isChatWindowOpen && this.props.currentOnlineAgent === null) {
      return this.setState({isChatWindowOpen: false});
    } else if (!this.props.currentOnlineAgent) {
      return alert('אנא המתן לנציג צאט שהתפנה');
    }else if (this.props.currentOnlineAgent === 'busy'){
      return alert ('נציג מיד התפנה');
    }


    let userName;

    if (!this.state.isChatWindowOpen && !this.props.owner) {
      userName = prompt("Please enter your name");  
    }
    else if (!this.state.isChatWindowOpen && this.props.owner) {
      return this.setState({isChatWindowOpen: true});
    }
    else {
      this.setState({isChatWindowOpen: false});
         
      return this.setState({owner: this.props.owner});
    }

    if (userName !== null) {
      const newUser = {
        name: userName,
      }
      this.setState({isChatWindowOpen: true}, () => {
          this.scrollChatToEnd();
      });


      DBManager.createNewUser(newUser).then(user => {
        this.props.updateCurrentUser(user);
        this.setState({owner: user}, () => {
          this.addNewMessage(`?שלום ${userName}, איך אפשר לעזור`);
        });
      });
    }
  }

  handleKeyDown = (e) => {
  	if (e.keyCode === 13 && e.target.value !== '') {
      e.preventDefault();
      this.addNewMessage(this.inputValueElement.innerText);
      this.inputValueElement.innerHTML = '';
  	}
  }

  addNewMessage = (message) => {
    const {owner} = this.props;
  	const {messages} = this.state;
    const {unreadMessages} = this.state;
    const time = (new Date()).toISOString();

    if (messages.length === 0 || this.props.isAgent) {
      let messageOwner;

      messageOwner = {
        name:'Agent'
      }

      const newMessage = {
        text:message,
        time:time,
        owner:messageOwner
      }

      DBManager.setMessages(owner.id, [ ...messages, newMessage])
        .then(() => {
          this.registerToNewMessages(owner.id);
        })
        
    }
    else if (this.props.currentOnlineAgent) {
        let messageOwner;

          messageOwner = owner;

        const newMessage = {
         text: message,
         time: time,
         owner: messageOwner,
        } 

        DBManager.setMessages(owner.id, [...messages, newMessage]);
        DBManager.setUnReadMessages(owner.id,[...messages,newMessage]);
          const newUnReadMessage = {
              ...this.state.unReadMessages,
              [messageOwner.name]:message || []
          };

        this.setState({unReadMessages:newUnReadMessage});        
    }


      else{
         let messageOwner;

          if (this.props.isAgent) {
            messageOwner = {
              name: 'Agent'
            }
          }

          else {
            messageOwner = owner;
          }

          const newMessage = {
           text: message,
           time: time,
           owner: messageOwner,
          } 

          alert('השיחה עם הנציג נגמרה');
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
  	const {
        isChatWindowOpen,
        messages,
        unReadMessages
    } = this.state;
    
    const onlineOrOfflineAgent = 'agent-online-or-offline ' + 
    (this.props.currentOnlineAgent && this.props.currentOnlineAgent !== 'busy' && 'online' 
      || this.props.currentOnlineAgent === 'busy' && 'busy');
    
    return (
      <div className="chat-container">
        <div className="open-chat-button" onClick={this.toggleChatWindow}>
           {this.props.currentOnlineAgent && this.props.currentOnlineAgent !== 'busy' && <div className="online-message"> online</div>}
            {!this.props.currentOnlineAgent && <div className="offline-message">offline</div>}
            {this.props.currentOnlineAgent === 'busy' && <div className="busy-message">busy</div>}
            <div className={onlineOrOfflineAgent}></div>
        </div>

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