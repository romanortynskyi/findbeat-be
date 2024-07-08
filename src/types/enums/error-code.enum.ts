enum ErrorCode {
  EmailAlreadyExists = 'EMAIL_ALREADY_EXISTS',
  WrongEmailOrPassword = 'WRONG_EMAIL_OR_PASSWORD',
  UserNotFound = 'USER_NOT_FOUND',
  InternalServerError = 'INTERNAL_SERVER_ERROR',
  FileIsRequired = 'FILE_IS_REQUIRED',
  Forbidden = 'FORBIDDEN',
  EmailNotSent = 'EMAIL_NOT_SENT',
  TemplateNotFound = 'TEMPLATE_NOT_FOUND',
  IncorrectRecoveryCode = 'INCORRECT_RECOVERY_CODE',
  EventNotFound = 'EVENT_NOT_FOUND',
  FileNotFound = 'FILE_NOT_FOUND',
  CategoryTranslationExists = 'CATEGORY_TRANSLATION_EXISTS',
  CategoryNotFound = 'CATEGORY_NOT_FOUND',
  PlaceNotFound = 'PLACE_NOT_FOUND',
  TicketVariantNotFound = 'TICKET_VARIANT_NOT_FOUND',
  CardNotFound = 'CARD_NOT_FOUND',
  InvalidFacebookAccessToken = 'INVALID_FACEBOOK_ACCESS_TOKEN',
}

export default ErrorCode
