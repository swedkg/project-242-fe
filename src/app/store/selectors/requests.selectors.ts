import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromRequests from '../reducers/requests.reducer';

import { Globals } from '../../../assets/globals';

export const getRequestsState = createSelector(
  fromFeature.getPlatformState,
  (state: fromFeature.PlatformState) => state.requests
);

export const getRequestsEntities = createSelector(
  getRequestsState,
  fromRequests.getRequestsEntities
);

export const getAllRequests = createSelector(
  getRequestsEntities,
  entitites => {
    return Object.keys(entitites).map(id => entitites[parseInt(id, 10)]);
  }
);

export const getRequestsLoaded = createSelector(
  getRequestsState,
  fromRequests.getRequestsLoaded
);

export const getRequestsLoading = createSelector(
  getRequestsState,
  fromRequests.getRequestsLoading
);

export const getUserRequests = createSelector(
  getRequestsEntities,
  entitites => {
    let result = Object.keys(entitites)
      .map(id => entitites[parseInt(id, 10)])
      .filter(r => {
        return r.owner_id == Globals.id;
      });

    // console.log(Globals, entitites);
    // console.log('User requests', result);

    return result;
  }
);

// requests that the user have responded to
export const getUserResponses = createSelector(
  getRequestsEntities,
  entitites => {
    let result = Object.keys(entitites)
      .map(id => entitites[parseInt(id, 10)])
      .filter(r => {
        return r.responders.ids.includes(Globals.id);
      });

    // console.log(Globals, entitites);
    // console.log('Requests that the user have responded to', result);

    return result;
  }
);

export const getSingleRequest = createSelector(
  getRequestsEntities,
  (entitites, request_id) => {
    let result = Object.keys(entitites)
      .map(id => entitites[parseInt(id, 10)])
      .filter(r => {
        return r.id == request_id;
      });

    // console.log(Globals, entitites);
    // console.log('Single request', result);

    return result;
  }
);
