import * as fromResponses from '../actions/responses.actions';
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
  action: fromResponses.MyResponsesAction
): MessageState {
  switch (action.type) {
    case fromResponses.LOAD_RESPONSES: {
      return {
        ...state,
        loading: true
      };
    }
    case fromResponses.LOAD_RESPONSES_SUCCESS: {
      // console.log(action);
      const messages = action.payload;
      // console.log(data);
      const entities = messages.reduce(
        (entities: { [id: number]: Message }, message) => {
          return {
            ...entities,
            [message.id]: message
          };
        },
        {
          ...state.entities
        }
      );

      // console.log(entities);

      return {
        ...state,
        loading: false,
        loaded: true,
        entities
      };
    }
    case fromResponses.LOAD_RESPONSES_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }
  }
  // console.log(action, state);
  return state;
}

export const getResponses = (state: MessageState) => state.entities;
export const getResponsesLoading = (state: MessageState) => state.loading;
export const getResponsesLoaded = (state: MessageState) => state.loaded;
