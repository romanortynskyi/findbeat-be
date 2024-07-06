import { Body, Controller, Post } from '@nestjs/common'

import Route from 'src/types/enums/route.enum'
import SignUpCommand from './commands/sign-up.command'
import SignUpRequestDto from './types/classes/dto/request/sign-up-request.dto'
import SignUpCommandInput from './types/classes/command-inputs/sign-up.command-input'

@Controller(Route.Auth)
class AuthController {
  constructor(
    private readonly signUpCommand: SignUpCommand,
  ) {}

  @Post('/sign-up')
  async signUp(@Body() dto: SignUpRequestDto) {
    const {
      email,
      password,
      firstName,
      lastName,
    } = dto

    const input: SignUpCommandInput = {
      email,
      password,
      firstName,
      lastName
    }

    await this.signUpCommand.execute(input)

    return this.signUpCommand.result
  }
}

export default AuthController
