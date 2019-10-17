import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import * as fromRequests from './requests.reducer';
import * as fromMyResponses from './my-responses.reducer';

// define the structure of the state tree
export interface PlatformState {
  requests: fromRequests.RequestState; // referencing the interface
  myResponses: fromMyResponses.MessageState;
}

// register our reducers
export const reducers: ActionReducerMap<PlatformState> = {
  requests: fromRequests.reducer,
  myResponses: fromMyResponses.reducer
};

export const getPlatformState = createFeatureSelector<PlatformState>(
  'addPlatform'
);

// requests state
