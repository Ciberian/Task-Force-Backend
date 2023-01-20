export const RABBITMQ_SERVICE = Symbol('RABBITMQ_SERVICE');

export enum Comment {
  DefaultCountLimit = 50,
  MinLength = 10,
  MaxLength = 300,
}

export enum CommentValidationMessage {
  CommentLengthNotValid = 'Comment min length is 10, max is 300',
  CommentMinLengthNotValid = 'Min length for the comment is 10 simbols',
  CommentMaxLengthNotValid = 'Max length for the comment is 300 simbols',
}
