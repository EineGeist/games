import { createStore, Store, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import { AppState, AllActions } from './types';
import rootReducer from './rootReducer';

const middleware = [thunkMiddleware];

const store: Store<AppState, AllActions> = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
