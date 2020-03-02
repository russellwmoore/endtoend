import React from 'react';
import { connect } from 'react-redux';
import { me } from './store';
import LoginForm from './LoginForm';
import Tasks from './Tasks';
import Nav from './Nav';
import About from './About';
import { Route, Switch } from 'react-router-dom';

class App extends React.Component {
  componentDidMount() {
    this.props.me();
  }

  isLoggedIn() {
    return !!this.props.user.id;
  }

  render() {
    return (
      <>
        <Nav isLoggedIn={this.isLoggedIn()} />
        <Switch>
          <Route exact path="/about" component={About} />
          {this.isLoggedIn() ? (
            <>
              <h3>Hello {this.props.user.name}</h3>
              Your tasks below:
              <Tasks tasks={this.props.tasks} />
            </>
          ) : (
            <>
              <h3>Hello! Log in here</h3>
              <LoginForm />
              {this.props.error.message && `Wrong Username or Password`}
            </>
          )}
        </Switch>
      </>
    );
  }
}

const mapState = state => ({
  user: state.user,
  tasks: state.tasks,
  error: state.error,
});
const mapDispatch = dispatch => ({ me: () => dispatch(me()) });

export default connect(mapState, mapDispatch)(App);
