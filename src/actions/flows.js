import { axios } from '../app/axios';
import { notifyError, notifySuccess } from '../app/notifications';
import { setLoading } from './app';

export const SET_FLOWS = 'SET_FLOWS';
export const SET_FLOW = 'SET_FLOW';
export const SET_FLOW_ENABLED = 'SET_FLOW_ENABLED';
export const SET_TASKS_FLOW = 'SET_TASKS_FLOW';
export const ADD_FLOW = 'ADD_FLOW';
export const UPDATE_FLOW = 'UPDATE_FLOW';
export const DELETE_FLOW = 'DELETE_FLOW';
export const ADD_TASK_FLOW = 'ADD_TASK_FLOW';
export const UPDATE_TASK_FLOW = 'UPDATE_TASK_FLOW';
export const DELETE_TASK_FLOW = 'DELETE_TASK_FLOW';
export const SET_TASK_FLOW = 'SET_TASK_FLOW';
export const SET_TASK_FLOW_FILTERS = 'SET_TASK_FLOW_FILTERS';

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

export const deleteFlow = (flowId) => ({
  type: DELETE_FLOW,
  payload: flowId,
});

export const setFlowTasks = (tasks) => ({
  type: SET_TASKS_FLOW,
  payload: tasks,
});

export const addFlowTask = (task) => ({
  type: ADD_TASK_FLOW,
  payload: task,
});

export const updateFlowTask = (task) => ({
  type: UPDATE_TASK_FLOW,
  payload: task,
});

export const deleteFlowTask = (task) => ({
  type: DELETE_TASK_FLOW,
  payload: task,
});

export const setFlowTask = (task) => ({
  type: SET_TASK_FLOW,
  payload: task,
});

export const setFlowTaskFilters = (filters) => ({
  type: SET_TASK_FLOW_FILTERS,
  payload: filters,
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

export const getTasksFlowByAPI = async (dispatch, flowId) => {
  dispatch(setLoading(true));

  try {
    const {
      data: { tasks },
    } = await axios.get(`/flows/${flowId}/tasks`);

    dispatch(setFlowTasks(tasks));
  } catch (e) {
    const errorMessage =
      e?.response?.data?.message || e?.message || 'Произошла ошибка';

    notifyError(errorMessage);
  } finally {
    dispatch(setLoading(false));
  }
};

export const getTaskFlowByAPI = async (dispatch, flowId, taskId) => {
  dispatch(setLoading(true));

  try {
    const {
      data: { task },
    } = await axios.get(`/flows/${flowId}/tasks/${taskId}`);

    dispatch(setFlowTask(task));
  } catch (e) {
    const errorMessage =
      e?.response?.data?.message || e?.message || 'Произошла ошибка';

    notifyError(errorMessage);
  } finally {
    dispatch(setLoading(false));
  }
};

export const createTaskFlowByAPI = async (
  dispatch,
  flowId,
  prevTaskId,
  prevTaskIndex,
  taskType,
  taskData
) => {
  dispatch(setLoading(true));

  try {
    const {
      data: { taskId },
    } = await axios.post(`/flows/${flowId}/tasks`, {
      prevTaskId,
      taskData,
      taskType,
    });

    dispatch(
      addFlowTask({
        prevTaskIndex,
        taskData: {
          ...taskData,
          taskId,
          taskType,
        },
      })
    );
    notifySuccess('Шаг сценария успешно создан!');
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

export const updateTaskFlowByAPI = async (
  dispatch,
  flowId,
  taskId,
  taskIndex,
  taskType,
  taskData
) => {
  dispatch(setLoading(true));

  try {
    await axios.put(`/flows/${flowId}/tasks/${taskId}`, { taskData });

    dispatch(
      updateFlowTask({
        taskIndex,
        taskData: { taskId, taskType, name: taskData.name },
      })
    );
    notifySuccess('Шаг сценария успешно обновлен!');
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

export const deleteTaskFlowByAPI = async (
  dispatch,
  flowId,
  taskId,
  taskIndex
) => {
  dispatch(setLoading(true));

  try {
    await axios.delete(`/flows/${flowId}/tasks/${taskId}`);

    dispatch(deleteFlowTask({ taskId, taskIndex }));
    notifySuccess('Шаг сценария успешно удален!');
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

export const getTaskFlowFiltersByAPI = async (dispatch, flowId, taskId) => {
  dispatch(setLoading(true));

  try {
    const {
      data: { filters },
    } = await axios.get(`/flows/${flowId}/tasks/${taskId}/filters`);

    dispatch(setFlowTaskFilters(filters));
  } catch (e) {
    const errorMessage =
      e?.response?.data?.message || e?.message || 'Произошла ошибка';

    notifyError(errorMessage);
  } finally {
    dispatch(setLoading(false));
  }
};

export const changeTaskFlowFiltersByAPI = async (
  dispatch,
  flowId,
  taskId,
  filters
) => {
  dispatch(setLoading(true));

  try {
    await axios.post(`/flows/${flowId}/tasks/${taskId}/filters`, { filters });

    notifySuccess('Фильтры обновлены!');
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
