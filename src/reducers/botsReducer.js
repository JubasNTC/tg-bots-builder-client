import {
  ADD_BOT,
  DELETE_BOT,
  SET_BOT,
  SET_BOTS,
  SET_BOTS_FOR_ATTACHMENT,
  UPDATE_BOT,
} from '../actions/app';

const initialState = {
  bots: [],
  botsForAttachment: [],
  selectedBot: null,
};

const botsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_BOTS:
      return {
        ...state,
        bots: payload,
      };

    case SET_BOT:
      return {
        ...state,
        selectedBot: payload,
      };

    case SET_BOTS_FOR_ATTACHMENT:
      return {
        ...state,
        botsForAttachment: payload,
      };

    case ADD_BOT:
      return {
        ...state,
        bots: [payload].concat(state.bots),
      };

    case UPDATE_BOT:
      const updatedBotIndex = state.bots.findIndex(
        ({ botId }) => botId === payload.botId
      );
      state.bots[updatedBotIndex] = payload;

      return {
        ...state,
        bots: Array.from(state.bots),
      };

    case DELETE_BOT:
      const deletedBotIndex = state.bots.findIndex(
        ({ botId }) => botId === payload
      );
      state.bots.splice(deletedBotIndex, 1);

      return {
        ...state,
        bots: Array.from(state.bots),
      };

    default:
      return state;
  }
};

export { botsReducer };
