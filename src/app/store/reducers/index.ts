import { ActionReducerMap } from '@ngrx/store';
import * as fromRequests from './requests.reducer';

// define the structure of the state tree
export interface PlatformState {
  requests: fromRequests.RequestState;
}

// register our reducers
export const reducers: ActionReducerMap<PlatformState> = {
  requests: fromRequests.reducer
};
