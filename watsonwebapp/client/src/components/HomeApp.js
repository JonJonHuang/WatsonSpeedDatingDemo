import React from 'react';
// import posed from 'react-pose';

/* const Box = posed.div({
  visible: { opacity: 1 },
  hidden: { opacity: 0 }
}) */

class HomeApp extends React.Component {
  // Experimenting with the Box's animations with react-pose
  /* constructor() {
    super()
    this.state = {
      isVisible: true
    };
    this.renderBox = this.renderBox.bind(this)
  }
  componentDidMount() {
    setInterval(() => {
      this.setState({ isVisible: !this.state.isVisible });
    }, 1000);
  } */
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
    // {this.renderBox()}
  }

  /* renderBox() {
    return <Box className="box" pose={this.state.isVisible ? 'visible' : 'hidden'} />
  } */
}

export default HomeApp;