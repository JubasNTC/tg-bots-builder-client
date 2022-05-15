import thunk from 'redux-thunk';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

import { rootReducer } from '../reducers';
import { whoamiByAPI } from '../actions/app';

const middleware = [thunk];

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);
store.dispatch(whoamiByAPI());

export { store };
