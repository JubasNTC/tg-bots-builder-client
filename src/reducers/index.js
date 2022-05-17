import { combineReducers } from 'redux';

import { appReducer } from './appReducer';
import { botsReducer } from './botsReducer';
import { flowsReducer } from './flowsReducer';

const rootReducer = combineReducers({
  appReducer,
  botsReducer,
  flowsReducer,
});

export { rootReducer };
