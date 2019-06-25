import { RequestsEffects } from './requests.effect';
import { MessagesEffects } from './my-responses.effect';

export const effects: any[] = [RequestsEffects, MessagesEffects];

export * from './requests.effect';
export * from './my-responses.effect';
