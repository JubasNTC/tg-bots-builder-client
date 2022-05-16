import { APP_READY, SET_ACCOUNT, SET_LOADING } from '../actions/app';

const initialState = {
  appReady: false,
  isLoading: false,
  errorMessage: '',
  account: null,
};

const appReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case APP_READY:
      return {
        ...state,
        appReady: true,
      };

    case SET_LOADING:
      return {
        ...state,
        isLoading: payload,
      };

    case SET_ACCOUNT:
      return {
        ...state,
        account: payload,
      };

    default:
      return state;
  }
};

export { appReducer };
