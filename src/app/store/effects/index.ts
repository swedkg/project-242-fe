import { RequestsEffects } from './requests.effect';
import { MessagesEffects } from './messages.effect';

export const effects: any[] = [RequestsEffects, MessagesEffects];

export * from './requests.effect';
export * from './messages.effect';
