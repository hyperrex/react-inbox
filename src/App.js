import React, { Component } from 'react';
import './App.css';
import ToolBar from './components/Toolbar';
import MessageList from './components/MessageList';
import url from './env';

class App extends Component {
  state = {
    messages: []
  };

  async componentDidMount() {
    console.log(url)
    const response = await fetch(url)
    const json = await response.json()
    this.setState({ messages: json})
  }

  userStarred = async message => {
    const payload = {
      messageIds: [message.id],
      command: 'star'
    }
    message.starred = !message.starred;
    this.setState(this.state.messages.concat(message));
    await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    })
  };

  userSelected = message => {
    message.selected = !message.selected;
    // console.log('selected >>>>', message)
    this.setState(this.state.messages.concat(message));
  };

  userRead = async message => {
    const payload = {
      messageIds: [message.id],
      command: 'read',
      read: true
    }
    message.read = true;
    this.setState(this.state.messages.concat(message));
    await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    })
  };

  selectBoxState = () => {
    let amountSelected = this.state.messages.filter(message => {
      return message.selected;
    }).length;

    let action = '';
    if (amountSelected === this.state.messages.length) {
      action = '-check';
    } else if (amountSelected === 0) {
      action = '';
    } else {
      action = '-minus';
    }
    return action;
  };

  toggleSelectAll = () => {
    let amountSelected = this.state.messages.filter(message => {
      return message.selected;
    }).length;

    if (amountSelected === this.state.messages.length) {
      this.setState({
        message: this.state.messages.map(message => {
          message.selected = false;
          return message;
        })
      });
    } else {
      this.setState({
        message: this.state.messages.map(message => {
          message.selected = true;
          return message;
        })
      });
    }
  };

  markAsRead = () => {
    let selectedMessages = this.state.messages.filter(
      message => message.selected
    );
    this.setState(
      this.state.messages.concat(
        selectedMessages.map(message => {
          message.read = true;
          return message;
        })
      )
    );
  };

  markAsUnRead = () => {
    let selectedMessages = this.state.messages.filter(
      message => message.selected
    );
    this.setState(
      this.state.messages.concat(
        selectedMessages.map(message => {
          message.read = false;
          return message;
        })
      )
    );
  };

  disabledReadButton = () => {
    let selectedMessages = this.state.messages.filter(
      message => message.selected
    );
    let readArr = selectedMessages.map(message => {
      return message.read ? true : false;
    });
    return readArr.includes(true) || readArr.length === 0 ? 'disabled' : '';
  };

  disabledUnReadButton = () => {
    let selectedMessages = this.state.messages.filter(
      message => message.selected
    );
    let readArr = selectedMessages.map(message => {
      return message.read ? true : false;
    });
    return readArr.includes(false) || readArr.length === 0 ? 'disabled' : '';
  };

  deleteMessage = async () => {
    const messages = this.state.messages.filter(message => !message.selected)
    const selectedMessages = this.state.messages.filter(message => message.selected)
    this.setState({ messages })
    const messageIds = selectedMessages.map((message) => message.id)
    console.log(messageIds)
    const payload = {
      messageIds,
      command: 'delete',
    }
    await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    })
  }

  disabledDeleteButton = () => {
    let selectedMessages = this.state.messages.filter(
      message => message.selected
    );
    return selectedMessages.length === 0 ? 'disabled' : '';
  };

  disabledApplyLabelMenu = () => {
    let selectedMessages = this.state.messages.filter(
      message => message.selected
    );
    return selectedMessages.length === 0 ? 'disabled' : '';
  };

  disabledRemoveLabelMenu = () => {
    let selectedMessages = this.state.messages.filter(
      message => message.selected
    );
    return selectedMessages.length === 0 ? 'disabled' : '';
  };

  applyLabel = async label => {
    if (label === 'Apply label') return;
    let selectedMessages = this.state.messages.filter(
      message => message.selected
    );
    this.setState(
      this.state.messages.concat(
        selectedMessages.map(message => {
          if (message.labels.includes(label)) return message;
          message.labels.push(label);
          return message;
        })
      )
    );
    const messageIds = selectedMessages.map((message) => message.id)
    const payload = {
      messageIds,
      command: 'addLabel',
      label
    }
    await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    })

  };

  removeLabel = label => {
    if (label === 'Remove label') return;
    let selectedMessages = this.state.messages.filter(
      message => message.selected
    );
    this.setState(
      this.state.messages.concat(
        selectedMessages.map(message => {
          message.labels.splice(label, 1);
          return message;
        })
      )
    );
  };

  render() {
    return (
      <div className="App">
        <ToolBar
          messages={this.state.messages}
          selectBoxState={this.selectBoxState}
          toggleSelectAll={this.toggleSelectAll}
          markAsRead={this.markAsRead}
          markAsUnRead={this.markAsUnRead}
          disabledReadButton={this.disabledReadButton}
          disabledUnReadButton={this.disabledUnReadButton}
          disabledDeleteButton={this.disabledDeleteButton}
          disabledApplyLabelMenu={this.disabledApplyLabelMenu}
          disabledRemoveLabelMenu={this.disabledRemoveLabelMenu}
          deleteMessage={this.deleteMessage}
          applyLabel={this.applyLabel}
          removeLabel={this.removeLabel}
        />
        <MessageList
          messages={this.state.messages}
          userStarred={this.userStarred}
          userSelected={this.userSelected}
          userRead={this.userRead}
        />
      </div>
    );
  }
}

export default App;
