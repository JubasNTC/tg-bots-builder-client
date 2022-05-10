import { axios } from '../app/axios';

export const SET_LOADING = 'SET_LOADING';
export const SET_ERROR_MESSAGE = 'SET_ERROR_MESSAGE';
export const SET_ACCOUNT = 'SET_ACCOUNT';

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

export const authorizeByAPI = async (dispatch, credentials) => {
  dispatch(setLoading(true));

  try {
    const {
      data: { user },
    } = await axios.post('/users/authorization', credentials);

    dispatch(setAccount(user));
    dispatch(setErrorMessage(''));
  } catch (e) {
    dispatch(
      setErrorMessage(
        e?.response?.data?.message || e?.message || 'Произошла ошибка'
      )
    );
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
  } catch (e) {
    dispatch(
      setErrorMessage(
        e?.response?.data?.message || e?.message || 'Произошла ошибка'
      )
    );
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
  } catch (e) {
    dispatch(
      setErrorMessage(
        e?.response?.data?.message || e?.message || 'Произошла ошибка'
      )
    );
  } finally {
    dispatch(setLoading(false));
  }
};
