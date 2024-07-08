import { InternalServerErrorException as NestInternalServerErrorException } from '@nestjs/common'

import ErrorCode from 'src/types/enums/error-code.enum'

export class InternalServerErrorException extends NestInternalServerErrorException {
  constructor(message: string) {
    const code = ErrorCode.InternalServerError

    super({
      code,
      message,
    })
  }
}