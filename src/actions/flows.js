import { axios } from '../app/axios';
import { notifyError, notifySuccess } from '../app/notifications';
import { setLoading } from './app';

export const SET_FLOWS = 'SET_FLOWS';
export const SET_FLOW = 'SET_FLOW';
export const SET_FLOW_ENABLED = 'SET_FLOW_ENABLED';
export const SET_FLOW_TASKS = 'SET_FLOW_TASKS';
export const ADD_FLOW = 'ADD_FLOW';
export const UPDATE_FLOW = 'UPDATE_FLOW';
export const DELETE_FLOW = 'DELETE_FLOW';

export const setFlows = (flows) => ({
  type: SET_FLOWS,
  payload: flows,
});

export const setFlow = (flow) => ({
  type: SET_FLOW,
  payload: flow,
});

export const addFlow = (flow) => ({
  type: ADD_FLOW,
  payload: flow,
});

export const updateFlow = (flow) => ({
  type: UPDATE_FLOW,
  payload: flow,
});

export const setFlowEnabled = (flow) => ({
  type: SET_FLOW_ENABLED,
  payload: flow,
});

export const setFlowTasks = (tasks) => ({
  type: SET_FLOW_TASKS,
  payload: tasks,
});

export const deleteFlow = (flowId) => ({
  type: DELETE_FLOW,
  payload: flowId,
});

export const getUserFlowsByAPI = async (dispatch) => {
  dispatch(setLoading(true));

  try {
    const {
      data: { flows },
    } = await axios.get('/flows');

    dispatch(setFlows(flows));
  } catch (e) {
    const errorMessage =
      e?.response?.data?.message || e?.message || 'Произошла ошибка';

    notifyError(errorMessage);
  } finally {
    dispatch(setLoading(false));
  }
};

export const getUserFlowForEditFormByAPI = async (dispatch, flowId) => {
  dispatch(setLoading(true));

  try {
    const {
      data: { flow },
    } = await axios.get(`/flows/${flowId}/front`);

    dispatch(setFlow(flow));
  } catch (e) {
    const errorMessage =
      e?.response?.data?.message || e?.message || 'Произошла ошибка';

    notifyError(errorMessage);
  } finally {
    dispatch(setLoading(false));
  }
};

export const createFlowByAPI = async (dispatch, flowData) => {
  dispatch(setLoading(true));

  try {
    const {
      data: { flow },
    } = await axios.post('/flows', flowData);

    dispatch(addFlow(flow));
    notifySuccess('Сценарий успешно создан!');
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

export const updateFlowByAPI = async (dispatch, flowId, flowData) => {
  dispatch(setLoading(true));

  try {
    await axios.put(`/flows/${flowId}`, flowData);

    dispatch(updateFlow({ ...flowData, flowId }));
    notifySuccess('Сценарий успешно обновлен!');

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

export const setFlowEnabledByAPI = async (dispatch, flowId, enabled) => {
  dispatch(setLoading(true));

  try {
    await axios.put(`/flows/${flowId}/enabled`, { enabled });

    dispatch(setFlowEnabled({ flowId, enabled }));
    notifySuccess(
      enabled ? 'Сценарий успешно включен!' : 'Сценарий успешно выключен!'
    );

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

export const deleteFlowByAPI = async (dispatch, flowId) => {
  dispatch(setLoading(true));

  try {
    await axios.delete(`/flows/${flowId}`);

    dispatch(deleteFlow(flowId));
    notifySuccess('Сценарий успешно удален!');

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
