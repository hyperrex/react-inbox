import React, { Component } from 'react';
import './App.css';
import ToolBar from './components/Toolbar'
import MessageList from './components/MessageList'
class App extends Component {
  state = {
    messages: [
      {
        "id": 1,
        "subject": "You can't input the protocol without calculating the mobile RSS protocol!",
        "read": false,
        "starred": true,
        "labels": ["dev", "personal"]
      },
      {
        "id": 2,
        "subject": "connecting the system won't do anything, we need to input the mobile AI panel!",
        "read": false,
        "starred": false,
        "selected": true,
        "labels": []
      },
      {
        "id": 3,
        "subject": "Use the 1080p HTTP feed, then you can parse the cross-platform hard drive!",
        "read": false,
        "starred": true,
        "labels": ["dev"]
      },
      {
        "id": 4,
        "subject": "We need to program the primary TCP hard drive!",
        "read": true,
        "starred": false,
        "selected": true,
        "labels": []
      },
      {
        "id": 5,
        "subject": "If we override the interface, we can get to the HTTP feed through the virtual EXE interface!",
        "read": false,
        "starred": false,
        "labels": ["personal"]
      },
      {
        "id": 6,
        "subject": "We need to back up the wireless GB driver!",
        "read": true,
        "starred": true,
        "labels": []
      },
      {
        "id": 7,
        "subject": "We need to index the mobile PCI bus!",
        "read": true,
        "starred": false,
        "labels": ["dev", "personal"]
      },
      {
        "id": 8,
        "subject": "If we connect the sensor, we can get to the HDD port through the redundant IB firewall!",
        "read": true,
        "starred": true,
        "labels": []
      }
    ]
  }
  
  userStarred = (message) => {
    message.starred = !message.starred
    // console.log('starred >>>>', message)
    this.setState(this.state.messages.concat(message))
  }

  userSelected = (message) => {
    message.selected = !message.selected
    // console.log('selected >>>>', message)
    this.setState(this.state.messages.concat(message))
  }

  userRead = (message) => {
    message.read = true
    // console.log('read >>>>', message)
    this.setState(this.state.messages.concat(message))
  }

  selectBoxState = () => {
    let amountSelected = this.state.messages.filter(message => {
      return message.selected
    }).length

    let action = ''
    if (amountSelected === this.state.messages.length) {
      action = '-check'
    } else if (amountSelected === 0) {
      action = ''
    } else {
      action = '-minus'
    }
    return action
  }

  toggleSelectAll = () => {
    let amountSelected = this.state.messages.filter(message => {
      return message.selected
    }).length

    if ( amountSelected === this.state.messages.length ) {
      this.setState({
        message: this.state.messages.map(message => {
          message.selected = false
          return message
        })
      })
    } else {
      this.setState({
        message: this.state.messages.map( message => {
          message.selected = true
          return message
        })
      })
    }
  }

  render() {
    return (
      <div className="App">
        <ToolBar 
          selectBoxState={ this.selectBoxState }
          toggleSelectAll={ this.toggleSelectAll }
        />
        <MessageList 
        messages={ this.state.messages }
        userStarred={ this.userStarred }
        userSelected={ this.userSelected }
        userRead={ this.userRead }
        />
      </div>
    );
  }
}

export default App;
