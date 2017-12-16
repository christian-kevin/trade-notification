import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import reducer from './rootReducers';

export default function configureStore() {
  const middleware = [thunk];
  if (process.env.NODE_ENV === 'development') {
    middleware.push(createLogger());
  }

  const store = createStore(
    reducer,
    undefined,
    compose(applyMiddleware(...middleware)),
  );

  return store;
}
