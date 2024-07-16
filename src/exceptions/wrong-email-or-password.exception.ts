import { UnauthorizedException } from '@nestjs/common'

import errorMessages from 'src/consts/error-messages'
import ErrorCode from 'src/types/enums/error-code.enum'

export class WrongEmailOrPasswordException extends UnauthorizedException {
  constructor() {
    const code = ErrorCode.WrongEmailOrPassword

    super({
      code,
      message: errorMessages[code],
    })
  }
}