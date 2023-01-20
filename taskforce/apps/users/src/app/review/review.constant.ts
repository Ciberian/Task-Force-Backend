export enum Review {
  MinTextLength = 50,
  MaxTextLength = 500,
  MinReviewRating = 1,
  MaxReviewRating = 5,
}

export enum ReviewValidationMessage {
  ReviewAlreadyExist = 'Review for this task is already exists',
  ReviewTextNotValid = 'Min length for review text is 50 symbols, max is 500',
  TextMinLengthNotValid = 'Min length for the review text is 50 symbols',
  TextMaxLengthNotValid = 'Max length for the review text is 500 symbols',
  MinReviewRatingNotValid = 'Minimal value for user rating is 1',
  MaxReviewRatingNotValid = 'Maximum value for user rating is 5',
}
