export type User = {
  id: string;
  name: string;
  surname: string;
};

export type UserEvent = {
  eventType: EventType;
  data: string;
};

export enum EventType {
  USER_OBFUSCATION = "USER_OBFUSCATION",
  ALL_USERS_OBFUSCATION = "ALL_USERS_OBFUSCATION",
}

export type Users = Array<User>;
