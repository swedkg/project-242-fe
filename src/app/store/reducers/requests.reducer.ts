import * as fromRequests from '../actions/requests.action';
import { Requests } from '../../models/request.model';

// a slice of state that our reducer will manage in out entire state tree
export interface RequestState {
  data: Requests[];
  loaded: boolean;
  loading: boolean;
}

export const initialState: RequestState = {
  data: [
    {
      id: 1,
      title: "Why, I wouldn't say anything about it",
      isOneTime: true,
      isUser: false,
      lat: 53.46041899999999,
      lng: -2.235272200000054,
      fulfilled: false,
      requester_id: 1,
      description:
        'Strata of cigarette smoke rose from the tiers, drifting until it struck currents set up by the blowers and the drifting shoals of waste. A graphic representation of data abstracted from the banks of every computer in the shade beneath a bridge or overpass. Case felt the edge of the Villa bespeak a turning in, a denial of the bright void beyond the hull. The alarm still oscillated, louder here, the rear of the deck sting his palm as he made his way down Shiga from the sushi stall he cradled it in his jacket pocket.'
    }
  ],
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
      return {
        ...state,
        loading: false,
        loaded: true
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
