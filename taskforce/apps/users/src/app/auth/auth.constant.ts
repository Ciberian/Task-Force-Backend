export const AGE_OF_MAJORITY = 18;
export const MAX_SPECIALIZATIONS_COUNT = 5;
export const RABBITMQ_SERVICE = Symbol('RABBITMQ_SERVICE');

export enum UserUpdateErrorMessage {
  UserAlreadyExist = 'User with this email exists',
  UserNotFound = 'User with this email not found',
  UserPasswordWrong = 'User password is wrong',
  UserNotInLegalAge = 'The user is not of legal age (18 years old)',
}

export const Image = {
  DefaultNameLength: 32,
  FileMaxSize: 500 * 1024,
  FileType: /.(jpg|jpeg|png)$/
} as const
