import { Injectable } from '@nestjs/common'

import Command from 'src/types/abstract-classes/command'
import SignUpResponseDto from '../types/classes/dto/response/sign-up-response.dto'
import SignUpCommandInput from '../types/classes/command-inputs/sign-up.command-input'
import AuthService from '../services/implementations/auth.service'

@Injectable()
class SignUpCommand implements Command<SignUpCommandInput, SignUpResponseDto> {
  constructor(private readonly authService: AuthService) {}

  async execute(input: SignUpCommandInput): Promise<void> {
    const result = await this.authService.signUp(input)

    this.result = result
  }

  result: SignUpResponseDto
}

export default SignUpCommand
