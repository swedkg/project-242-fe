import * as fromRequests from "../actions/requests.action";
import { AidRequest } from "../../_models/aidRequest.model";

// a slice of state that our reducer will manage in out entire state tree
export interface RequestState {
  entities: { [id: number]: AidRequest };
  loaded: boolean;
  loading: boolean;
}

export const initialState: RequestState = {
  entities: {},
  loaded: false,
  loading: false,
};

export function reducer(
  state = initialState,
  action: fromRequests.RequestsAction
): RequestState {
  switch (action.type) {
    case fromRequests.LOAD_REQUESTS: {
      return {
        ...state,
        loading: true,
      };
    }

    case fromRequests.LOAD_REQUESTS_SUCCESS: {
      const requests = action.payload;

      const entities = requests.reduce(
        (entities: { [id: number]: AidRequest }, request) => {
          return {
            ...entities,
            [request.id]: request,
          };
        },
        {}
      );

      return {
        ...state,
        loading: false,
        loaded: true,
        entities,
      };
    }

    case fromRequests.LOAD_REQUESTS_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false,
      };
    }

    case fromRequests.CREATE_REQUEST_SUCCESS: {
      let request = action.payload.body;

      request = {
        ...request,
        responders: { ids: [], details: [] },
      };

      const entities = {
        ...state.entities,
        [request.id]: request,
      };
      return {
        ...state,
        entities,
      };
    }

    case fromRequests.CREATE_WB_REQUEST_SUCCESS: {
      let request = action.payload;

      // request = {
      //   ...request,
      //   responders: { ids: [], details: [] },
      // };

      // console.log(action, request);
      // return state;
      const entities = {
        ...state.entities,
        [request.id]: request,
      };
      return {
        ...state,
        entities,
      };
    }

    case fromRequests.CREATE_REQUEST_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false,
      };
    }

    case fromRequests.REMOVE_ALL_REQUESTS: {
      return initialState;
    }

    case fromRequests.REQUEST_FULFILLED: {
      let requestId = action.payload;
      let entities = state.entities;
      // console.log(requestId, entities);

      const modify = (obj, filter, filterValue) =>
        Object.keys(obj).reduce((acc, val) => {
          let mod = Object.assign({}, obj[val]);
          mod.fulfilled = true;

          return obj[val][filter] === filterValue
            ? {
                ...acc,
                [val]: mod,
              }
            : {
                ...acc,
                [val]: obj[val],
              };
        }, {});

      entities = modify(entities, "id", requestId);

      // console.log("fromMessages.REQUEST_FULFILLED", requestId, entities);
      return {
        ...state,
        entities,
      };
    }

    case fromRequests.REQUEST_REPUBLISHED: {
      let requestId = action.payload;
      let entities = state.entities;
      // console.log(requestId, entities);

      const modify = (obj, filter, filterValue) =>
        Object.keys(obj).reduce((acc, val) => {
          let mod = Object.assign({}, obj[val]);
          mod.republished = 0;
          mod.allow_republish_at = "";
          return obj[val][filter] === filterValue
            ? {
                ...acc,
                [val]: mod,
              }
            : {
                ...acc,
                [val]: obj[val],
              };
        }, {});

      entities = modify(entities, "id", requestId);

      // console.log("fromMessages.REQUEST_REPUBLISHED", requestId, entities);
      return {
        ...state,
        entities,
      };
    }
  }

  return state;
}

export const getRequestsEntities = (state: RequestState) => state.entities;
export const getRequestsLoading = (state: RequestState) => state.loading;
export const getRequestsLoaded = (state: RequestState) => state.loaded;
