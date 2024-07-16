import {
  Body,
  Controller,
  HttpCode,
  Post,
} from '@nestjs/common'

import Route from 'src/types/enums/route.enum'
import JoinCommand from './commands/join.command'
import JoinCommandInput from './types/classes/command-inputs/join.command-input'
import JoinRequestDto from './types/classes/dto/request/join-request.dto'
import SignInRequestDto from './types/classes/dto/request/sign-in-request.dto'
import SignInCommandInput from './types/classes/command-inputs/sign-in.command-input'
import SignInCommand from './commands/sign-in.command'

@Controller(Route.Auth)
class AuthController {
  constructor(
    private readonly joinCommand: JoinCommand,
    private readonly signInCommand: SignInCommand,
  ) {}

  @Post('/join')
  async join(@Body() dto: JoinRequestDto) {
    const {
      email,
      password,
      firstName,
      lastName,
    } = dto

    const input: JoinCommandInput = {
      email,
      password,
      firstName,
      lastName
    }

    await this.joinCommand.execute(input)

    return this.joinCommand.result
  }

  @HttpCode(200)
  @Post('/sign-in')
  async signIn(@Body() dto: SignInRequestDto) {
    const { email, password } = dto

    const input: SignInCommandInput = {
      email,
      password,
    }

    await this.signInCommand.execute(input)

    return this.signInCommand.result
  }
}

export default AuthController
