import { RequestsEffects } from './requests.effect';
import { MyMessagesEffects } from './messages.effect';

export const effects: any[] = [RequestsEffects, MyMessagesEffects];

export * from './requests.effect';
export * from './messages.effect';
