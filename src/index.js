import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router-dom';
import App from './App';
import customHistory from './history';
import { Provider } from 'react-redux';
import store from './store';

class Index extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <Provider store={store}>
        <Router history={customHistory}>
          <App />
        </Router>
      </Provider>
    );
  }
}

ReactDOM.render(<Index />, document.getElementById('app'), () =>
  console.log('render?')
);
