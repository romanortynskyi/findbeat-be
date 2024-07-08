import { ConflictException } from '@nestjs/common'

import errorMessages from 'src/consts/error-messages'
import ErrorCode from 'src/types/enums/error-code.enum'

export class EmailAlreadyExistsException extends ConflictException {
  constructor() {
    const code = ErrorCode.EmailAlreadyExists

    super({
      code,
      message: errorMessages[code],
    })
  }
}