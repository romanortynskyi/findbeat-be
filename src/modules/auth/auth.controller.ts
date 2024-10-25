import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common'

import Route from 'src/types/enums/routes/route.enum'
import SignUpCommand from './commands/sign-up.command'
import SignUpCommandInput from './types/classes/command-inputs/sign-up.command-input'
import SignUpRequestDto from './types/classes/dto/request/sign-up-request.dto'
import SignInRequestDto from './types/classes/dto/request/sign-in-request.dto'
import SignInCommandInput from './types/classes/command-inputs/sign-in.command-input'
import SignInCommand from './commands/sign-in.command'
import AuthRoute from 'src/types/enums/routes/auth-route.enum'

@Controller(Route.Auth)
class AuthController {
  constructor(
    private readonly signUpCommand: SignUpCommand,
    private readonly signInCommand: SignInCommand,
  ) {}

  @HttpCode(HttpStatus.CREATED)
  @Post(AuthRoute.SignUp)
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

  @HttpCode(HttpStatus.OK)
  @Post(AuthRoute.SignIn)
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
