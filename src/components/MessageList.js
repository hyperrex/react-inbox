import React, { Component } from 'react';
import Message from './Message';

class MessageList extends Component {
  render() {
    let messages = this.props.messages.map((message, i) => {
      return <Message 
        index={ i } 
        message={ message }
        userStarred={this.props.userStarred}
      />;
    });

    return (
      <div>
        { messages }
      </div>
    );
  }
}

export default MessageList;
