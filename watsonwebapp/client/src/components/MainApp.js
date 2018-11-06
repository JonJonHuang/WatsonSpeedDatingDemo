import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
// import logo from './logo.svg';
import '../stylesheets/App.css';
import axios from 'axios';

import HomeApp from './HomeApp';
import ConversationApp from './ConversationApp';
import PersonalityApp from './PersonalityApp';
import LoginForm from './LoginPage';

const DUMMY_DATA = [
  {
    senderId: "Watson",
    text: "Hello, I'm Watson. How can I help you today?"
  }
];

const PERSONALITIES_DEFAULT = [
  {
    personality: 'Openness',
    percentage: 43
  },
  {
    personality: 'Conscientiousness',
    percentage: 80
  },
  {
    personality: 'Extraversion',
    percentage: 24
  },
  {
    personality: 'Agreeableness',
    percentage: 59
  },
  {
    personality: 'Emotional range',
    percentage: 71
  },
  {
    personality: 'Desire for Challenge',
    percentage: 66
  },
  {
    personality: 'Desire for Closeness',
    percentage: 78
  },
  {
    personality: 'Conservation, Value',
    percentage: 32
  },
  {
    personality: 'Curiosity',
    percentage: 23
  },
  {
    personality: 'Harmony',
    percentage: 69
  },
  {
    personality: 'Stability',
    percentage: 72
  },
  {
    personality: 'Structure',
    percentage: 75
  },
  {
    personality: 'Excitement',
    percentage: 24
  },
  {
    personality: 'Open to Change',
    percentage: 46
  },
  {
    personality: 'Liberty',
    percentage: 65
  }
];

const PERSONALITIES_STEPHEN = [
  {
    personality: 'Openness',
    percentage: 56
  },
  {
    personality: 'Conscientiousness',
    percentage: 75
  },
  {
    personality: 'Extraversion',
    percentage: 94
  },
  {
    personality: 'Agreeableness',
    percentage: 64
  },
  {
    personality: 'Emotional range',
    percentage: 68
  },
  {
    personality: 'Desire for Challenge',
    percentage: 70
  },
  {
    personality: 'Desire for Closeness',
    percentage: 74
  },
  {
    personality: 'Conservation, Value',
    percentage: 44
  },
  {
    personality: 'Curiosity',
    percentage: 36
  },
  {
    personality: 'Harmony',
    percentage: 60
  },
  {
    personality: 'Stability',
    percentage: 65
  },
  {
    personality: 'Structure',
    percentage: 71
  },
  {
    personality: 'Excitement',
    percentage: 46
  },
  {
    personality: 'Open to Change',
    percentage: 51
  },
  {
    personality: 'Liberty',
    percentage: 24
  }
];

class MainApp extends Component {
  constructor() {
    super()
    var username_temp = 'default_user';
    var personality_set = PERSONALITIES_DEFAULT;
    if (username_temp==='stephmcflurry') {
      personality_set = PERSONALITIES_STEPHEN;
    }
    this.state = {
      page: 1,
      messages: DUMMY_DATA,
      current_input: '',
      personalities: personality_set,
      wsfEmail: '',
      username: username_temp,
      auth: false
    };
    if (localStorage.wsfEmail) {
      this.checkAuth(localStorage.wsfEmail);  
    }
    this.handleChangeXXX = this.handleChangeXXX.bind(this)
    this.handleKeyPressXXX = this.handleKeyPressXXX.bind(this)
  }
  
  render() {
    var appToRender = " "
    switch(this.state.page) {
      case 1:
        appToRender = <HomeApp />
        break;
      case 2:
        appToRender = (
          <ConversationApp
            messages = {this.state.messages}
            current_input={this.state.current_input}
            onChange={() => this.handleChangeXXX}
            onKeyPress={() => this.handleKeyPressXXX}
            scrollDown={() => this.scrollDown()}
            wsfEmail={this.state.wsfEmail} />
        )
        break
      case 3:
        appToRender = (
          <PersonalityApp
            personalities={this.state.personalities}
            username={this.state.username} />
        )
        break;
      case 4:
        appToRender = (
          <React.Fragment>
          <LoginForm
            setAuth={this.setAuth} />
          <br />
          <p>Current user: {this.state.username}</p>
          </React.Fragment>);
        break;
      default:
        appToRender = <HomeApp />
    }
    return (
      <React.Fragment>
        <div className="side-nav">
          // TO-DO: change a tags to button tags
          <button
            onClick={() => this.setState({page: 1})} >
              Home
          </button>
          <br/>
          <button
            onClick={() => this.setState({page: 2})} >
              Conversation with Watson
          </button>
          <br/>
          <button
            onClick={() => this.setState({page: 3})} >
              Personality and Matches
          </button>
          <br/>
          <button
            onClick={() => this.setState({page: 4})} >
              Login
          </button>
        </div>
        <div className="main-content">
          {appToRender}
        </div>
      </React.Fragment>
    )
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
      email: this.state.wsfEmail,
      text: this.state.current_input
    };
    let response = await axios.post('/conversation', foo );
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
      this.scrollDown()
    })
  }
  
  scrollDown() {
    // scroll to bottom of message-list
    var messageList = document.getElementsByClassName("message-list")[0];
    messageList.scrollTop = messageList.scrollHeight;
  }

  /**
   * Asks the Express server whether this user is logged in or not.
   * If so, then updates the state to reflect that.
   */
  checkAuth = async (email) => {
    let response = await axios.post('/check-auth', {email: email});
    if (response.data.success) {
      this.setAuth(true, email, response.data.username);
    } else {
      this.setAuth(false, '', '')
    }
  }

  setAuth = (authStatus, email, username) => {
    let newState = {...this.state, auth: authStatus, username: username, wsfEmail: email};
    localStorage.wsfEmail = email;
    this.setState(newState);
  }

}

export default MainApp;
