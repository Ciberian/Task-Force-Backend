export const TASK_TITLE_NOT_VALID = 'Title min length is 20, max is 50';
export const TASK_DESCRIPTION_NOT_VALID = 'Description min length is 100, max is 1024';
export const TASK_ADDRESS_NOT_VALID = 'Address min length is 10, max is 255';
export const DEADLINE_DATE_NOT_VALID = 'The deadline date is not valid';
export const TAGS_NOT_VALID = 'Tegs field must be an array of string';
export const TAGS_СONTAIN_INVALID_SIMBOLS = 'The tag must start with a letter and not contain spaces';
export const MAX_TAGS_COUNT = 5;
export const MIN_TAG_LENGTH = 3;
export const MAX_TAG_LENGTH = 10;
export const FILE_NAME_LENGTH = 32;

export const DEFAULT_PAGE = 1;
export const DEFAULT_TASK_COUNT_LIMIT = 25;
export const DEFAULT_SORT_DIRECTION = 'desc';
export const DEFAULT_SORT_TYPE = 'createdAt';

export const RABBITMQ_SERVICE = Symbol('RABBITMQ_SERVICE');
export const AUTH_USER_EMAIL_NOT_VALID = 'The email is not valid';
export const CUSTOMER_NOT_CREATED_THIS_TASK = 'The customer can only change the status of his tasks';
export const CONTRACTOR_IS_BUSY = 'The selected user, already has a task at work';
export const CONTRACTOR_CANNOT_BE_SELECTED = 'You can select only those contractors who are on the list of those who responded to the task';
export const CONTRACTOR_NOT_FOUND = 'Only task contractor can change task to "Failed" status';
export const CURRENT_STATUS_NOT_COMPATIBLE_WITH_NEW_STATUS = 'The current status is not compatible with the new status';

export const IMAGE_FILE_TYPE = /.(jpg|jpeg|png)$/;
export const IMAGE_FILE_MAX_SIZE = 500 * 1024;
