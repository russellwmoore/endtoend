import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import axios from 'axios';
import customHistory from './history';
import logger from 'redux-logger';

const initState = {
  user: {},
  tasks: [],
  error: {},
};

const SET_USER = 'SET_USER';
const SET_TASKS = 'SET_TASKS';
const SET_ERROR = 'SET_ERROR';

const setUser = user => ({ type: SET_USER, user });
const setTasks = tasks => ({ type: SET_TASKS, tasks });
const setError = error => ({
  type: SET_ERROR,
  error: error || 'Something went wrong!',
});

export const me = () => {
  console.log('in me');
  return dispatch => {
    return axios
      .get('/auth/me')
      .then(({ data }) => {
        if (data.id) {
          dispatch(setUser(data));
          dispatch(getTasks());
        } else {
          dispatch(setUser({}));
        }
      })
      .catch(e => console.log('Error in Me thunk', e));
  };
};

export const getTasks = () => {
  return dispatch => {
    return axios
      .get('/api/tasks')
      .then(({ data }) => {
        dispatch(setTasks(data));
      })
      .catch(e => {
        console.log('error in getTasks', e);
      });
  };
};

export const logIn = creds => {
  return dispatch => {
    return axios
      .post('/auth/login', creds)
      .then(({ data }) => {
        console.log('data', data);
        if (data.id) {
          dispatch(setUser(data));
          dispatch(getTasks());
          dispatch(setError({}));
          customHistory.push('/tasks');
        }
      })
      .catch(err => {
        dispatch(setError(err));
        console.log(err);
      });
  };
};

export const logOut = () => dispatch => {
  return axios
    .post('/auth/logout')
    .then(() => {
      dispatch(setUser({}));
      dispatch(setTasks([]));
      customHistory.push('/');
    })
    .catch(e => console.log('error in logout thunk', e));
};

const reducer = (state = initState, action) => {
  console.log('action', action);
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.user };
    case SET_TASKS:
      return { ...state, tasks: action.tasks };
    case SET_ERROR:
      return { ...state, error: action.error };
    default:
      return state;
  }
};

const store = createStore(reducer, applyMiddleware(ReduxThunk, logger));

export default store;
