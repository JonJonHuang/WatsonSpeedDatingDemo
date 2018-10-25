import React, { Component } from 'react';
import ReactDOM from 'react-dom';
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
      auth: false
    };

    if (localStorage.wsfEmail) {
      this.checkAuth(localStorage.wsfEmail);  
    }
  }
  
  render() {
    var dummy = " "
    switch(this.state.page) {
      case 1:
        dummy = <HomeApp />;
        break;
      case 2:
        dummy = <ConversationApp />;
        break
      case 3:
        dummy = <PersonalityApp />;
        break;
      case 4:
        dummy = <LoginForm checkAuth={this.checkAuth} />;
        break;
      default:
        dummy = <HomeApp />;
    }
    return (
      <>
        <div className="sidenav">
          <button onClick={() => this.setState({page: 1})} >Home</button>
          <br/>
          <button onClick={() => this.setState({page: 2})} >Conversation with Watson</button>
          <br/>
          <button onClick={() => this.setState({page: 3})} >Personality and Matches</button>
          <br/>
          <button onClick={() => this.setState({page: 4})} >Login</button>
        </div>
        {dummy}
      </>
    );
  }

  /**
   * Asks the Express server whether this user is logged in or not. If so, then updates the state to reflect that.
   */
  checkAuth = async (email) => {
    if (email) {
      let response = await axios.post('/auth-check', {email: email});
      if (response.body.success) {
        let newState = {...this.state, auth: true};
        this.setState(newState);
      }
    }
  }

  setAuth = (authStatus, email) => {
    let newState = {...this.state, auth: authStatus};
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
  constructor() {
    super()
    this.state = {
      messages: DUMMY_DATA,
      current_input: ''
    }
    this.handleChangeXXX = this.handleChangeXXX.bind(this)
    this.handleKeyPressXXX = this.handleKeyPressXXX.bind(this)
  }

  render() {
    // console.log(this.state.current_input)
    return (
      <div className="ConversationApp">
        <Title />
        <MessageList messages = {this.state.messages} />
        <SendMessageForm
          value={this.state.current_input}
          onChange={() => this.handleChangeXXX}
          onKeyPress={() => this.handleKeyPressXXX}
        />
        <button
          type="button"
          onClick={ function() {
            console.log("ans");
            ReactDOM.render(<Title />, document.getElementById('root'));
          } }
        >
          Debugger
        </button>
      </div>
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
      console.log("ENTER KEY")
      // send the state's message for submission
      console.log("handleKeyPressXXX: " + this.state.current_input)
      
      // SEND HTTP POST
      this.sendPostRequest()
      
      this.addMessageToList("User", this.state.current_input)
    }
  }

  async sendPostRequest() {
    console.log("postrequest this.state.current_input: " + this.state.current_input)
    const foo = {
      user: "Jon",
      text: this.state.current_input
    };
    
    let response = await axios.post('/conversation', foo );
    console.log(response);
    this.addMessageToList('Watson', response.data[0]);
      /*.then((response) => {
        console.log(response)
        this.addMessageToList("Watson", "dummytext")
      })
      .catch(function (error) {
        console.log(error)
      })*/
    console.log("end of sendPostRequest")
    
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
      <ul className="message-list">
        {this.props.messages.map(message => {
          return (
            <MessageItem
              senderId={message.senderId}
              message={message.text}
            />
          )
        })}
      </ul>
    )
  }
  
  /* <li key={message.id}>
              <div>
                {message.senderId}
              </div>
              <div>
                {message.text}
              </div>
            </li> */
  
}

class MessageItem extends Component {
  render() {
    return (
      <div className="message-item">
        <div className="message-sender">{this.props.senderId}</div>
        <div className="message-text">{this.props.message}</div>
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
  
    // onChange={this.handleChange}
    // onKeyPress={this.handleKeyPress}
    
    /* <form
        className="send-message-form">
        <input
          onChange={this.handleChange}
          value={this.state.message}
          placeholder="Type your message and hit ENTER"
          type="text" />
      </form> */
  
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
      <>
        <p>Welcome to Watson Speed Friending, created by Jonathon Huang, Aakash Singh, Stephen Wan, and Ziheng Wei</p>
        <p>The "Conversation with Watson" tab will start a conversation with Watson to begin collecting interests and personality information about the user.</p>
        <p>The "User Personality" tab will display information that Watson has gathered from the conversation about a user's interests and personality.</p>
      </>
    )
  }
}

export default MainApp;
