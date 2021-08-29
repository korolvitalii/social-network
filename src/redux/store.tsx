import { useDispatch } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducers/rootReducer';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers =
  process.env.NODE_ENV === 'development'
    ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    : compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)));

export default store;
