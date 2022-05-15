import { SET_BOTS } from '../actions/app';

const initialState = {
  bots: [
    {
      id: '0e2f85cf-ef42-4d68-b53c-1869514953b7',
      name: 'Main bot',
      description: 'Бот для кофейни',
    },
    {
      id: '57efd70a-363c-47b1-bdf5-9c7cfb3db094',
      name: 'First bot',
      description: 'Бот для учебы',
    },
    {
      id: '28784484-c942-42bd-9a71-4f336625ad17',
      name: 'Second bot',
      description: 'Бот для работы из дома',
    },
    {
      id: 'ddd0da98-0944-4213-8392-7aba6a107421',
      name: 'Elite bot',
      description: 'Бот для элите',
    },
    {
      id: '1ff46fe4-bf8d-4a80-94de-8157a4ee9af5',
      name: 'Pre bot',
      description: 'Бот для переработки',
    },
  ],
};

const botsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_BOTS:
      return {
        ...state,
        bots: payload,
      };

    default:
      return state;
  }
};

export { botsReducer };
