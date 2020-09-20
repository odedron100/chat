import React, {Component} from 'react';

class Chat extends Component {
  state = {
  	isChatWindowOpen: false
  }

  openChatWindow = () => {
  	this.setState({isChatWindowOpen: !this.state.isChatWindowOpen});
  }

  render() {
  	const {isChatWindowOpen} = this.state;

    return (
      <div className="chat-container">
        <div className="open-chat-button" onClick={this.openChatWindow}> נציג צ׳אט זמין עבורך </div>
        {isChatWindowOpen && <div className="chat-window"></div>}
      </div>
    );
  } 
}

export default Chat;