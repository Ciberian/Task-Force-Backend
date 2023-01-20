export const SALT_ROUNDS = 10;

export enum User {
  MinNameLength = 3,
  MaxNameLength = 50,
  MaxPersonalInfoLength = 300,
}

export enum UserValidationMessage {
  EmailNotValid = 'The email format is not valid',
  PasswordNotValid = 'Password min length is 6, max is 12 symbols',
  NameLengthNotValid = 'Name min length is 3, max length is 50 symbols',
  NameMinLengthNotValid = 'Min length for the name is 3 symbol',
  NameMaxLengthNotValid = 'Max length for the name is 50 symbols',
  BirthDateNotValid = 'The user date birth is not valid',
  SpecializationNotValid = 'Specialization field must be an array of string',
  PersonalInfoMaxLengthNotValid = 'Max length for personal info is 300 simbols',
  ImageFormatNotValid = 'Only jpg/jpeg or png format is allowed',
}
