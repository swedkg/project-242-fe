import * as fromMyRequests from '../actions/my-requests.actions';
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
  action: fromMyRequests.MyRequestsAction
): MessageState {
  switch (action.type) {
    case fromMyRequests.LOAD_MY_REQUESTS: {
      return {
        ...state,
        loading: true
      };
    }
    case fromMyRequests.LOAD_MY_REQUESTS_SUCCESS: {
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

      console.log(entities);

      return {
        ...state,
        loading: false,
        loaded: true,
        entities
      };
    }
    case fromMyRequests.LOAD_MY_REQUESTS_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }
  }
  return state;
}

export const getMyRequests = (state: MessageState) => state.entities;
export const getMyRequestsLoading = (state: MessageState) => state.loading;
export const getMyRequestsLoaded = (state: MessageState) => state.loaded;
