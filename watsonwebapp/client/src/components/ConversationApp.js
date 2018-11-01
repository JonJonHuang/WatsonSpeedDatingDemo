import React, { Component } from 'react';
import axios from 'axios';

class ConversationApp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: props.messages,
      current_input: ''
    }
    console.log(this.props.wsfEmail);
    this.handleChangeXXX = this.handleChangeXXX.bind(this)
    this.handleKeyPressXXX = this.handleKeyPressXXX.bind(this)
  }

  render() {
    return (
      <React.Fragment>
        <Title />
        <MessageList
          messages = {this.state.messages}
          onChange = {this.props.onChange()}
        />
        <SendMessageForm
          value={this.state.current_input}
          onChange={() => this.handleChangeXXX}
          onKeyPress={() => this.handleKeyPressXXX}
        />
      </React.Fragment>
    );
  }
  
  handleChangeXXX(e) {
    // on change, update the state's message
    this.setState({
      current_input: e.target.value
    })
  }
  
  handleKeyPressXXX(e) {
    // 13 is the charCode for the Enter key
    if (e.charCode === 13 && this.state.current_input.length > 0) {
      this.addMessageToList(this.props.username, this.state.current_input)
      this.sendPostRequest()
    }
  }

  async sendPostRequest() {
    const foo = {
      email: this.props.wsfEmail,
      text: this.state.current_input
    };
    let response = await axios.post('/conversation', foo );
    console.log(response);
    this.addMessageToList('Watson', response.data[0]);
  }

  addMessageToList(senderId, text) {
    // update messages; clear current_input
    const messages_copy = this.state.messages.slice();
    messages_copy.push({senderId: senderId, text: text})
    this.setState({
      messages: messages_copy,
      current_input: ''
    }, function() {
      // scroll to bottom of message-list
      var messageList = document.getElementsByClassName("message-list")[0];
      messageList.scrollTop = messageList.scrollHeight;
    })
  }
}

class MessageList extends React.Component {
  render() {
    return (
      <div className="message-list" >
        {this.props.messages.map(message => {
          return (
            <React.Fragment>
              <MessageItem
                senderId={message.senderId}
                message={message.text}
              />
              <br/>
            </React.Fragment>
          )
        })}
      </div>
    )
  }
  
}

function SendMessageForm(props) {
  return(
    <input
      className="send-message-form"
      type="text"
      value={props.value}
      onChange={props.onChange()}
      onKeyPress={props.onKeyPress()}
    />
  );
}

function Title() {
  return(
    <p className="title">Conversation with Watson</p>
  )
}

function MessageItem(props) {
  return (
    <div className={props.senderId === 'Watson'? 'message-item plain' : 'message-item color'}>
      <div className="message-sender">{props.senderId}</div>
      <div className="message-text"><span>{props.message}</span></div>
    </div>
  );
}

export default ConversationApp;