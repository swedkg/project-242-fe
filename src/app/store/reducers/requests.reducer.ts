import * as fromRequests from '../actions/requests.action';
import { Requests } from '../../models/request.model';

// a slice of state that our reducer will manage in out entire state tree
export interface RequestState {
  data: Requests[];
  loaded: boolean;
  loading: boolean;
}

export const initialState: RequestState = {
  data: [],
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
      console.log(action);
      const data = action.payload;
      return {
        ...state,
        loading: false,
        loaded: true,
        data
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

export const getRequests = (state: RequestState) => state.data;
export const getRequestsLoading = (state: RequestState) => state.loading;
export const getRequestsLoaded = (state: RequestState) => state.loaded;
