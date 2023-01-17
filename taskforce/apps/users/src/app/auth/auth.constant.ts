export const AGE_OF_MAJORITY = 18;
export const AUTH_USER_NOT_LEGAL_AGE = 'The user is not of legal age (18 years old)';
export const AUTH_USER_EXISTS = 'User with this email exists';
export const AUTH_USER_NOT_FOUND = 'User not found';
export const AUTH_USER_PASSWORD_WRONG = 'User password is wrong';
export const AUTH_USER_EMAIL_NOT_VALID = 'The email is not valid';
export const AUTH_USER_PASSWORD_NOT_VALID = 'Password min length is 6, max is 12';
export const AUTH_USER_BIRTH_DATE_NOT_VALID = 'The user date birth is not valid';
export const AUTH_USER_NAME_NOT_VALID = 'Name min length is 3, max is 50';
export const USER_PERSONAL_INFO_NOT_VALID = 'Personal information of the user is no more than 300 characters';
export const SPECIALIZATION_NOT_VALID = 'Specialization field must be an array of string';
export const MAX_SPECIALIZATIONS_COUNT = 5;
export const FILE_NAME_LENGTH = 32;

export const REVIEW_TEXT_NOT_VALID = 'Min length for review text is 50 simbols, max is 500';
export const MIN_REVIEW_RATING_NOT_VALID = 'Minimal value for user rating is 1';
export const MAX_REVIEW_RATING_NOT_VALID = 'Maximum value for user rating is 5';
export const REVIEW_ALREADY_EXISTS = 'Review for this task is already exists';

export const AVATAR_FILE_TYPE = /.(jpg|jpeg|png)$/;
export const AVATAR_FILE_MAX_SIZE = 500 * 1024;

export const RABBITMQ_SERVICE = Symbol('RABBITMQ_SERVICE');
