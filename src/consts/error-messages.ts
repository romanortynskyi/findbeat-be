import ErrorCode from 'src/types/enums/error-code.enum'

const errorMessages = {
  [ErrorCode.EmailAlreadyExists]:
    'A user with the specified email already exists.',
}

export default errorMessages
