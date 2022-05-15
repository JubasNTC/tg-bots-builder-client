import { combineReducers } from 'redux';

import { appReducer } from './appReducer';
import { botsReducer } from './botsReducer';

const rootReducer = combineReducers({
  appReducer,
  botsReducer,
});

export { rootReducer };
