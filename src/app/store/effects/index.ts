import { RequestsEffects } from './requests.effect';
import { MyResponsesEffects } from './my-responses.effect';

export const effects: any[] = [RequestsEffects, MyResponsesEffects];

export * from './requests.effect';
export * from './my-responses.effect';
