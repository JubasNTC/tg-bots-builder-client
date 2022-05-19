import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import { appReducer } from './appReducer';
import { botsReducer } from './botsReducer';
import { flowsReducer } from './flowsReducer';

const rootReducer = combineReducers({
  appReducer,
  botsReducer,
  flowsReducer,
  form: formReducer,
});

export { rootReducer };
