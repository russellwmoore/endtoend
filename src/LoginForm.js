import React from 'react';
import axios from 'axios';
import customHistory from './history';
import { connect } from 'react-redux';
import { logIn } from './store';

class LoginForm extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.logIn(this.state);
  }
  render() {
    console.log('this.', this.props);
    return (
      <>
        <form data-cy="login-form" onSubmit={this.handleSubmit}>
          <input
            onChange={this.handleChange}
            type="text"
            name="email"
            id="email"
          />
          <input
            onChange={this.handleChange}
            type="password"
            name="password"
            id="password"
          />
          <button type="submit" id="login-submit">
            Login
          </button>
        </form>
      </>
    );
  }
}

const mapState = state => ({ user: state.user, tasks: state.tasks });
const mapDispatch = dispatch => ({ logIn: user => dispatch(logIn(user)) });

export default connect(mapState, mapDispatch)(LoginForm);
