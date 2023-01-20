export enum SubscriberValidationMessage {
  EmailNotUnique = 'The subscriber with same email already exists',
  EmailNotValid = 'The email format is not valid',
  NameNotValid = 'The name is empty',
  UserIdNotValid = 'The userId is empty',
}

export const SUBSCRIBERS_COLLECTION_NAME = 'email-subscribers';
