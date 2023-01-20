export const DEFAULT_PAGE = 1;
export const RABBITMQ_SERVICE = Symbol('RABBITMQ_SERVICE');
export const EMAIL_NOT_VALID = 'The email is not valid';

export enum TaskValidationMessage {
  TitleNotValid = 'Title min length is 20, max is 50',
  DescriptionNotValid = 'Description min length is 100, max is 1024',
  AddressNotValid = 'Address min length is 10, max is 255',
  DeadlineDateNotValid = 'The deadline date is not valid',
  TagsNotValid = 'Tegs field must be an array of string',
  TagsContainInvalidSymbols = 'The tag must start with a letter and not contain spaces',
}

export enum StatusUpdateErrorMessage {
  CurrentStatusNotCompatibleWithNewStatus = 'The current status is not compatible with the new status',
  CustomerNotCreatedThisTask = 'The customer can only change the status of his tasks',
  ContractorCannotBeSelected = 'You can select only those contractors who are on the list of responded users',
  ContractorNotFound = 'Only task contractor can change task to "Failed" status',
  ContractorIsBusy = 'The selected user, already has a task at work',
}

export enum TaskStatus {
  New = "New",
  Cancelled = "Cancelled",
  AtWork = "AtWork",
  Completed = "Completed",
  Failed = "Failed"
}

export enum Task {
  DefaultCountLimit = 25,
  DefaultSortDirection = 'desc',
  DefaultSortType = 'createdAt',
}

export enum Tag {
  MaxCount = 5,
  MinLength = 3,
  MaxLength = 10,
}

export const Image = {
  NameLength: 32,
  FileMaxSize: 500 * 1024,
  FileType: /.(jpg|jpeg|png)$/
} as const
