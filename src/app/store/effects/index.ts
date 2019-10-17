import { RequestsEffects } from './requests.effect';
import { MyResponsesEffects } from './responses.effect';

export const effects: any[] = [RequestsEffects, MyResponsesEffects];

export * from './requests.effect';
export * from './responses.effect';
