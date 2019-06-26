import { RequestsEffects } from './requests.effect';
import { MyResponsesEffects } from './my-responses.effect';
import { MyRequestsEffects } from './my-requests.effect';

export const effects: any[] = [
  RequestsEffects,
  MyResponsesEffects,
  MyRequestsEffects
];

export * from './requests.effect';
export * from './my-responses.effect';
export * from './my-requests.effect';
