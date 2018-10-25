import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
// import logo from './logo.svg';
import './App.css';
import axios from 'axios';

import LoginForm from './LoginPage';

const DUMMY_DATA = [
  {
    senderId: "Watson",
    text: "Hello, I'm Watson. How can I help you today?"
  }
];

class MainApp extends Component {
  constructor() {
    super()
    this.state={
      page: 1,
      messages: DUMMY_DATA,
      auth: false,
      username: ''
    };

    if (localStorage.wsfEmail) {
      this.checkAuth(localStorage.wsfEmail);  
    }
    this.handleChangeInMessages = this.handleChangeInMessages.bind(this)
  }
  
  render() {
    var appToRender = " "
    switch(this.state.page) {
      case 1:
        appToRender = <HomeApp />
        break;
      case 2:
        appToRender = <ConversationApp messages = {this.state.messages} onChange={() => this.handleChangeInMessages} />
        break
      case 3:
        appToRender = <PersonalityApp />
        break;
      case 4:
        appToRender = <LoginForm checkAuth={this.checkAuth} />;
        break;
      default:
        appToRender = <HomeApp />
    }
    return (
      <React.Fragment>
        <div className="side-nav">
          <a onClick={() => this.setState({page: 1})} >Home</a>
          <br/>
          <a onClick={() => this.setState({page: 2})} >Conversation with Watson</a>
          <br/>
          <a onClick={() => this.setState({page: 3})} >Personality and Matches</a>
          <br/>
          <a onClick={() => this.setState({page: 4})} >Login</a>
        </div>
        <div className="main-content">
          {appToRender}
        </div>
      </React.Fragment>
    )
  }
  
  handleChangeInMessages(e) {
    console.log("inside handleChangeInMessages")
    console.log(e)
    this.setState({
      messages: e.target.value
    })
  }

  /**
   * Asks the Express server whether this user is logged in or not. If so, then updates the state to reflect that.
   */
  checkAuth = async (email) => {
    if (email) {
      let response = await axios.post('/check-auth', {email: email});
      if (response.body.success) {
        this.setAuth(true, email, response.body.username);
      } else {
        this.setAuth(false, '', '')
      }
    }
  }

  setAuth = (authStatus, email, username) => {
    let newState = {...this.state, auth: authStatus, username: username};
    localStorage.wsfEmail = email;
    this.setState(newState);
  }

}

function SideNav() {
  return (
    <p>dummy</p>
  );
    // a(href='/conversation/get-groups') Check for Matches
    // a(href='/personality') User Personality
}

class ConversationApp extends Component {
  constructor(props) {
    console.log(props)
    super(props)
    this.state = {
      messages: props.messages,
      current_input: ''
    }
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

        /*
        <button
          type="button"
          onClick={ function() {
            console.log("ans");
            ReactDOM.render(<Title />, document.getElementById('root'));
          } }
        >
          Debugger
        </button>
        */
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
      
      this.addMessageToList("User", this.state.current_input)
      
      this.sendPostRequest()
    }
  }

  async sendPostRequest() {
    // console.log("postrequest this.state.current_input: " + this.state.current_input)
    const foo = {
      user: "Jon",
      text: this.state.current_input
    };
    
    let response = await axios.post('/conversation', foo );
    console.log(response);
    this.addMessageToList('Watson', response.data[0]);
    // console.log("end of sendPostRequest")
    
  }

  addMessageToList(senderId, text) {
    // update messages; clear current_input
    const messages_copy = this.state.messages.slice();
    messages_copy.push({senderId: senderId, text: text})
    this.setState({
      messages: messages_copy,
      current_input: ''
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

class MessageItem extends Component {
  render() {
    return (
      <div className={this.props.senderId == 'Watson'? 'message-item plain' : 'message-item color'}>
        <div className="message-sender">{this.props.senderId}</div>
        <div className="message-text"><span>{this.props.message}</span></div>
      </div>
    );
  }
}

function SendMessageForm(props) {
  // console.log(props)
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

class PersonalityApp extends React.Component {
  render() {
    return (<p>PersonalityApp</p>)
  }
}

class HomeApp extends React.Component {
  render() {
    return (
      <React.Fragment>
        <h1>Watson Speed Friending</h1>
        <p>Welcome to Watson Speed Friending, created by Jonathon Huang,
            Aakash Singh, Stephen Wan, and Ziheng Wei</p>
        <p>The "Conversation with Watson" tab will start a conversation
            with Watson to begin collecting interests and personality
            information about the user.</p>
        <p>The "User Personality" tab will display information that
            Watson has gathered from the conversation about a user's
            interests and personality.</p>
      </React.Fragment>
    )
  }
}

export default MainApp;
