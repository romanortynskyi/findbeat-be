import ErrorCode from 'src/types/enums/error-code.enum'

const errorMessages = {
  [ErrorCode.EmailAlreadyExists]:
    'A user with the specified email already exists.',
  [ErrorCode.WrongEmailOrPassword]:
    'The provided email or password is incorrect.',
}

export default errorMessages
