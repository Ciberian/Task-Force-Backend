export const TASK_TITLE_NOT_VALID = 'Title min length is 20, max is 50';
export const TASK_DESCRIPTION_NOT_VALID = 'Description min length is 100, max is 1024';
export const DEADLINE_DATE_NOT_VALID = 'The deadline date is not valid';
export const TAGS_NOT_VALID = 'Tegs field must be an array of string';
export const TAGS_СONTAIN_INVALID_SIMBOLS = 'The tag must start with a letter and not contain spaces';
export const MAX_TAGS_COUNT = 5;
export const MIN_TAG_LENGTH = 3;
export const MAX_TAG_LENGTH = 10;

export const DEFAULT_PAGE = 1;
export const DEFAULT_TASK_COUNT_LIMIT = 25;
export const DEFAULT_SORT_DIRECTION = 'desc';
export const DEFAULT_SORT_TYPE = 'createdAt';

export const RABBITMQ_SERVICE = Symbol('RABBITMQ_SERVICE');
export const AUTH_USER_EMAIL_NOT_VALID = 'The email is not valid';
