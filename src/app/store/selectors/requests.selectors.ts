import { createSelector } from "@ngrx/store";
import * as fromFeature from "../reducers";
import * as fromRequests from "../reducers/requests.reducer";

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
  (entitites) => {
    return Object.keys(entitites)
      .map((id) => entitites[parseInt(id, 10)])
      .filter((r) => {
        return r.fulfilled == false;
      });
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
  (entitites, user_id) => {
    let result = Object.keys(entitites)
      .map((id) => entitites[parseInt(id, 10)])
      .filter((r) => {
        return r.owner_id == user_id && r.fulfilled == false;
      });

    // console.log("User requests", result, user_id);

    return result;
  }
);

// requests that the user have responded to
export const getUserResponses = createSelector(
  getRequestsEntities,
  (entitites, user_id) => {
    let result = Object.keys(entitites)
      .map((id) => entitites[parseInt(id, 10)])
      .filter((r) => {
        return r.responders.ids.includes(user_id) && r.fulfilled == false;
      });

    // console.log("Requests that the user have responded to", result, user_id);

    return result;
  }
);

export const getSingleRequest = createSelector(
  getRequestsEntities,
  (entitites, request_id) => {
    let result = Object.keys(entitites)
      .map((id) => entitites[parseInt(id, 10)])
      .filter((r) => {
        return r.id == request_id;
      });

    // // console.log('Single request', result);

    return result;
  }
);
