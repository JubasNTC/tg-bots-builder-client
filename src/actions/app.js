import { toast } from 'react-toastify';

import { axios } from '../app/axios';
import { history } from '../app/history';

// app actions constants
export const APP_READY = 'APP_READY';
export const SET_LOADING = 'SET_LOADING';
export const SET_ERROR_MESSAGE = 'SET_ERROR_MESSAGE';
export const SET_ACCOUNT = 'SET_ACCOUNT';

// bots actions constants
export const SET_BOTS = 'SET_BOTS';

// app sync actions
export const setAppReady = () => ({
  type: APP_READY,
});

export const setLoading = (isLoading) => ({
  type: SET_LOADING,
  payload: isLoading,
});

export const setErrorMessage = (message) => ({
  type: SET_ERROR_MESSAGE,
  payload: message,
});

export const setAccount = (user) => ({
  type: SET_ACCOUNT,
  payload: user,
});

// bots sync actions
export const setBots = (bots) => ({
  type: SET_BOTS,
  payload: bots,
});

// app async actions
export const authorizeByAPI = async (dispatch, credentials) => {
  dispatch(setLoading(true));

  try {
    const {
      data: { user },
    } = await axios.post('/users/authorization', credentials);

    dispatch(setAccount(user));
    dispatch(setErrorMessage(''));

    return Promise.resolve();
  } catch (e) {
    const errorMessage =
      e?.response?.data?.message || e?.message || 'Произошла ошибка';

    toast.error(errorMessage, {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    return Promise.reject();
  } finally {
    dispatch(setLoading(false));
  }
};

export const registerByAPI = async (dispatch, credentials) => {
  dispatch(setLoading(true));

  try {
    const {
      data: { user },
    } = await axios.post('/users/registration', credentials);

    dispatch(setAccount(user));
    dispatch(setErrorMessage(''));

    return Promise.resolve();
  } catch (e) {
    const errorMessage =
      e?.response?.data?.message || e?.message || 'Произошла ошибка';

    toast.error(errorMessage, {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    return Promise.reject();
  } finally {
    dispatch(setLoading(false));
  }
};

export const logoutByAPI = async (dispatch) => {
  dispatch(setLoading(true));

  try {
    await axios.post('/users/logout');
    localStorage.removeItem('token');

    dispatch(setAccount(null));
    dispatch(setErrorMessage(''));

    return Promise.resolve();
  } catch (e) {
    const errorMessage =
      e?.response?.data?.message || e?.message || 'Произошла ошибка';

    toast.error(errorMessage, {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    return Promise.reject();
  } finally {
    dispatch(setLoading(false));
  }
};

export const whoamiByAPI = () => async (dispatch) => {
  dispatch(setLoading(true));

  try {
    const {
      data: { user },
    } = await axios.get('/users/whoami');

    dispatch(setAccount(user));
    dispatch(setErrorMessage(''));
  } catch (e) {
    history.push('/');

    const errorMessage =
      e?.response?.data?.message || e?.message || 'Произошла ошибка';

    toast.error(errorMessage, {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  } finally {
    dispatch(setAppReady());
    dispatch(setLoading(false));
  }
};

// bots async actions
