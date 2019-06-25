import * as fromRequests from '../actions/requests.action';
import { AidRequest } from '../../models/aidRequest.model';

// a slice of state that our reducer will manage in out entire state tree
export interface RequestState {
  entities: { [id: number]: AidRequest };
  loaded: boolean;
  loading: boolean;
}

export const initialState: RequestState = {
  entities: {},
  loaded: false,
  loading: false
};

export function reducer(
  state = initialState,
  action: fromRequests.RequestsAction
): RequestState {
  switch (action.type) {
    case fromRequests.LOAD_REQUESTS: {
      return {
        ...state,
        loading: true
      };
    }
    case fromRequests.LOAD_REQUESTS_SUCCESS: {
      // console.log(action);
      const requests = action.payload;

      const entities = requests.reduce(
        (entities: { [id: number]: AidRequest }, request) => {
          return {
            ...entities,
            [request.id]: request
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
    case fromRequests.LOAD_REQUESTS_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }
  }
  return state;
}

export const getRequestsEntities = (state: RequestState) => state.entities;
export const getRequestsLoading = (state: RequestState) => state.loading;
export const getRequestsLoaded = (state: RequestState) => state.loaded;
