import React from 'react';
import { Link } from 'react-router-dom';
import { logOut } from './store';
import { connect } from 'react-redux';

class Nav extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <>
        <h3>
          {this.props.isLoggedIn ? (
            <button
              id="sign-out"
              cy-data="sign-out-button"
              type="button"
              onClick={this.props.logOut}
            >
              Sign Out
            </button>
          ) : (
            'Sign In'
          )}{' '}
        </h3>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </>
    );
  }
}

const mapDispatch = dispatch => ({ logOut: () => dispatch(logOut()) });
export default connect(null, mapDispatch)(Nav);
