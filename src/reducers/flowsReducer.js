import {
  ADD_FLOW,
  DELETE_FLOW,
  SET_FLOW,
  SET_FLOW_ENABLED,
  SET_FLOWS,
  UPDATE_FLOW,
} from '../actions/flows';

const initialState = {
  flows: [],
  selectedFlow: null,
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

    default:
      return state;
  }
};

export { flowsReducer };
