import { Injectable } from '@nestjs/common'

import Command from 'src/types/abstract-classes/command'
import SignInResponseDto from '../types/classes/dto/response/sign-in-response.dto'
import SignInCommandInput from '../types/classes/command-inputs/sign-in.command-input'
import AuthService from '../services/auth.service'

@Injectable()
class SignInCommand implements Command<SignInCommandInput, SignInResponseDto> {
  constructor(private readonly authService: AuthService) {}

  async execute(input: SignInCommandInput): Promise<void> {
    const result = await this.authService.signIn(input)

    this.result = result
  }

  result: SignInResponseDto
}

export default SignInCommand
