export type SqsEventMessage = {
  eventType: EventType;
  data: string;
};

export enum EventType {
  USER_OBFUSCATION = 'USER_OBFUSCATION',
  ALL_USERS_OBFUSCATION = 'ALL_USERS_OBFUSCATION',
}
