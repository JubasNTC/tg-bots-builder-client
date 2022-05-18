import {
  ADD_FLOW,
  DELETE_FLOW,
  SET_FLOW,
  SET_FLOW_ENABLED,
  SET_TASKS_FLOW,
  SET_FLOWS,
  UPDATE_FLOW,
  ADD_TASK_FLOW,
  UPDATE_TASK_FLOW,
  DELETE_TASK_FLOW,
  SET_TASK_FLOW,
} from '../actions/flows';

const initialState = {
  flows: [],
  selectedFlow: null,
  flowTasks: [
    // {
    //   taskId: 'fbfff37c-ac5d-45b7-90c9-ac7be00f0222',
    //   taskType: 'question',
    //   name: 'Пользователь хочет заказать кофе',
    //   taskData: {
    //     type: 'choice',
    //     question:
    //       'Добро пожаловать в кофейню\n "DoviceVita"! ☕️\n\n Хотите выбрать кофе?',
    //     validation: '',
    //     choices: ['Да, хочу кофе'],
    //     customValidationMessage: '',
    //   },
    // },
    // {
    //   taskId: 'c7bdf78f-4b4c-4a01-a709-e0d76674c8c1',
    //   taskType: 'question',
    //   name: 'Пользователь выбирает кофе',
    //   taskData: {
    //     type: 'choice',
    //     question: 'Пожалуйста, выберите кофе, который вы бы хотели. 👇',
    //     validation: '',
    //     choices: ['Эспрессо', 'Американо', 'Капучино', 'Латте'],
    //     customValidationMessage: '',
    //   },
    // },
  ],
  selectedTaskFlow: null,
};

const flowsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_FLOWS:
      return {
        ...state,
        flows: payload,
      };

    case SET_FLOW:
      return {
        ...state,
        selectedFlow: payload,
      };

    case ADD_FLOW:
      return {
        ...state,
        flows: [payload].concat(state.flows),
      };

    case UPDATE_FLOW:
      const updatedFlowIndex = state.flows.findIndex(
        ({ flowId }) => flowId === payload.flowId
      );
      state.flows[updatedFlowIndex] = payload;

      return {
        ...state,
        flows: Array.from(state.flows),
      };

    case SET_FLOW_ENABLED:
      const flowEnabledIndex = state.flows.findIndex(
        ({ flowId }) => flowId === payload.flowId
      );
      state.flows[flowEnabledIndex].enabled = payload.enabled;

      return {
        ...state,
        flows: Array.from(state.flows),
      };

    case DELETE_FLOW:
      const deletedFlowIndex = state.flows.findIndex(
        ({ flowId }) => flowId === payload
      );
      state.flows.splice(deletedFlowIndex, 1);

      return {
        ...state,
        flows: Array.from(state.flows),
      };

    case SET_TASKS_FLOW:
      return {
        ...state,
        flowTasks: payload,
      };

    case SET_TASK_FLOW:
      return {
        ...state,
        selectedTaskFlow: payload,
      };

    case ADD_TASK_FLOW:
      if (state.flowTasks.length > 0) {
        state.flowTasks.splice(payload.prevTaskIndex + 1, 0, payload.taskData);
      } else {
        state.flowTasks.push(payload.taskData);
      }

      return {
        ...state,
        flowTasks: Array.from(state.flowTasks),
      };

    case UPDATE_TASK_FLOW:
      state.flowTasks[payload.taskIndex] = payload.taskData;

      return {
        ...state,
        flowTasks: Array.from(state.flowTasks),
      };

    case DELETE_TASK_FLOW:
      state.flowTasks.splice(payload.taskIndex, 1);

      return {
        ...state,
        flowTasks: Array.from(state.flowTasks),
      };

    default:
      return state;
  }
};

export { flowsReducer };
