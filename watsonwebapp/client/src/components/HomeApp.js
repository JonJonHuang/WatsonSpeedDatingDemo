import React from 'react';
// import posed from 'react-pose';

class HomeApp extends React.Component {
  render() {
    return (
      <React.Fragment>
        <h1>Watson Speed Friending</h1>
          <p>Welcome to Watson Speed Friending! This application was
              created by Jonathon Huang, Aakash Singh, Stephen Wan,
              and Ziheng Wei</p>
          <p>The "Conversation with Watson" tab will start a conversation
              with Watson to begin collecting interests and personality
              information about the user.</p>
          <p>The "Personality and Matches" tab will display information
              that Watson has gathered from the conversation about a
              user's interests and personality.</p>
      </React.Fragment>
    )
  }
}

export default HomeApp;