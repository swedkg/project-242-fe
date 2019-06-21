import * as fromMessages from '../actions/messages.actions';
import { Message } from '../../models/message.model';

export interface MessageState {
  // data: Message[];
  entities: { [id: number]: Message };

  loaded: boolean;
  loading: boolean;
}

export const initialState: MessageState = {
  // data: [],
  entities: {},
  loaded: false,
  loading: false
};

export function reducer(
  state = initialState,
  action: fromMessages.MessagesAction
): MessageState {
  switch (action.type) {
    case fromMessages.LOAD_MESSAGES: {
      return {
        ...state,
        loading: true
      };
    }
    case fromMessages.LOAD_MESSAGES_SUCCESS: {
      // console.log(action);
      const messages = action.payload;
      // console.log(data);
      const entities = messages.reduce(
        (entities: { [id: number]: Message }, message) => {
          return {
            ...entities,
            [message._id]: message
          };
        },
        {
          ...state.entities
        }
      );

      console.log(entities);

      return {
        ...state,
        loading: false,
        loaded: true,
        entities
      };
    }
    case fromMessages.LOAD_MESSAGES_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }
  }
  return state;
}

export const getMessages = (state: MessageState) => state.entities;
export const getMessagesLoading = (state: MessageState) => state.loading;
export const getMessagesLoaded = (state: MessageState) => state.loaded;
