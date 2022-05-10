import { SET_ACCOUNT, SET_ERROR_MESSAGE, SET_LOADING } from '../actions/app';

const initialState = {
  isLoading: false,
  errorMessage: '',
  account: null,
};

const appReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_LOADING:
      return {
        ...state,
        isLoading: payload,
      };

    case SET_ERROR_MESSAGE:
      return {
        ...state,
        errorMessage: payload,
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
