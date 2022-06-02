import { axios } from '../app/axios';
import { history } from '../app/history';
import { notifyError, notifySuccess } from '../app/notifications';

// app actions constants
export const APP_READY = 'APP_READY';
export const SET_LOADING = 'SET_LOADING';
export const SET_ACCOUNT = 'SET_ACCOUNT';

// bots actions constants
export const SET_BOTS = 'SET_BOTS';
export const SET_BOT = 'SET_BOT';
export const SET_BOTS_FOR_ATTACHMENT = 'SET_BOTS_FOR_ATTACHMENT';
export const ADD_BOT = 'ADD_BOT';
export const UPDATE_BOT = 'UPDATE_BOT';
export const DELETE_BOT = 'DELETE_BOT';

// app sync actions
export const setAppReady = () => ({
  type: APP_READY,
});

export const setLoading = (isLoading) => ({
  type: SET_LOADING,
  payload: isLoading,
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

export const setBot = (bot) => ({
  type: SET_BOT,
  payload: bot,
});

export const setBotsForAttachment = (bots) => ({
  type: SET_BOTS_FOR_ATTACHMENT,
  payload: bots,
});

export const addBot = (bot) => ({
  type: ADD_BOT,
  payload: bot,
});

export const updateBot = (bot) => ({
  type: UPDATE_BOT,
  payload: bot,
});

export const deleteBot = (botId) => ({
  type: DELETE_BOT,
  payload: botId,
});

// app async actions
export const authorizeByAPI = async (dispatch, credentials) => {
  dispatch(setLoading(true));

  try {
    const {
      data: { user },
    } = await axios.post('/users/authorization', credentials);

    dispatch(setAccount(user));

    return Promise.resolve();
  } catch (e) {
    const errorMessage =
      e?.response?.data?.message || e?.message || 'Произошла ошибка';

    notifyError(errorMessage);

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

    return Promise.resolve();
  } catch (e) {
    const errorMessage =
      e?.response?.data?.message || e?.message || 'Произошла ошибка';

    notifyError(errorMessage);

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
    history.push('/');

    return Promise.resolve();
  } catch (e) {
    const errorMessage =
      e?.response?.data?.message || e?.message || 'Произошла ошибка';

    notifyError(errorMessage);

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
  } catch (e) {
    history.push('/');

    const errorMessage =
      e?.response?.data?.message || e?.message || 'Произошла ошибка';

    notifyError(errorMessage);
  } finally {
    dispatch(setAppReady());
    dispatch(setLoading(false));
  }
};

// bots async actions

export const getUserBotsByAPI = async (dispatch) => {
  dispatch(setLoading(true));

  try {
    const {
      data: { bots },
    } = await axios.get('/bots');

    dispatch(setBots(bots));
  } catch (e) {
    const errorMessage =
      e?.response?.data?.message || e?.message || 'Произошла ошибка';

    notifyError(errorMessage);
  } finally {
    dispatch(setLoading(false));
  }
};

export const getUserBotByAPI = async (dispatch, botId) => {
  dispatch(setLoading(true));

  try {
    const {
      data: { bot },
    } = await axios.get(`/bots/${botId}`);

    dispatch(setBot(bot));
  } catch (e) {
    const errorMessage =
      e?.response?.data?.message || e?.message || 'Произошла ошибка';

    notifyError(errorMessage);
  } finally {
    dispatch(setLoading(false));
  }
};

export const getUserBotsForAttachmentByAPI = async (dispatch) => {
  dispatch(setLoading(true));

  try {
    const {
      data: { bots },
    } = await axios.get('/bots/attachment/list');

    dispatch(setBotsForAttachment(bots));
  } catch (e) {
    const errorMessage =
      e?.response?.data?.message || e?.message || 'Произошла ошибка';

    notifyError(errorMessage);
  } finally {
    dispatch(setLoading(false));
  }
};

export const createBotByAPI = async (dispatch, botData) => {
  dispatch(setLoading(true));

  try {
    const {
      data: { bot },
    } = await axios.post('/bots', botData);

    dispatch(addBot(bot));
    notifySuccess('Бот успешно создан!');
    return Promise.resolve();
  } catch (e) {
    const errorMessage =
      e?.response?.data?.message || e?.message || 'Произошла ошибка';

    notifyError(errorMessage);

    return Promise.reject();
  } finally {
    dispatch(setLoading(false));
  }
};

export const updateBotByAPI = async (dispatch, botId, botData) => {
  dispatch(setLoading(true));

  try {
    await axios.put(`/bots/${botId}`, botData);

    dispatch(updateBot({ ...botData, botId }));
    notifySuccess('Бот успешно обновлен!');

    return Promise.resolve();
  } catch (e) {
    const errorMessage =
      e?.response?.data?.message || e?.message || 'Произошла ошибка';

    notifyError(errorMessage);

    return Promise.reject();
  } finally {
    dispatch(setLoading(false));
  }
};

export const deleteBotByAPI = async (dispatch, botId) => {
  dispatch(setLoading(true));

  try {
    await axios.delete(`/bots/${botId}`);

    dispatch(deleteBot(botId));
    notifySuccess('Бот успешно удален!');

    return Promise.resolve();
  } catch (e) {
    const errorMessage =
      e?.response?.data?.message || e?.message || 'Произошла ошибка';

    notifyError(errorMessage);

    return Promise.reject();
  } finally {
    dispatch(setLoading(false));
  }
};
