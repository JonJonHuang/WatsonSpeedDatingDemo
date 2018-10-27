import React, {Component} from 'react';
import axios from 'axios';

class LoginForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    }
  }

  setEmail = (e) => {
    this.setState({email: e.target.value});
  }

  setPassword = (e) => {
    this.setState({password: e.target.value});
  }

  submitHandler = async (e) => {
    e.preventDefault();
    if (!this.state.email || !this.state.password) {
      // User has failed to fill in one of the required inputs.
    } else {
      let response = await axios.post('/login', {email: this.state.email, password: this.state.password});
      if (response.data.success) {
        // Change the auth state
        this.props.setAuth(true, this.state.email, response.data.username);
      }
    }
  }

  render() {
    return (
      <form onSubmit={this.submitHandler}>
        <label>Email*: <input type='text' value={this.state.email} onChange={this.setEmail} /></label>
        <label>Password*: <input type='text' value={this.state.password} onChange={this.setPassword} /></label>
        <input type='submit' value='Login' />
      </form>
    );
  }

}

export default LoginForm;
