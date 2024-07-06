import { Injectable } from '@nestjs/common'

import Command from 'src/types/abstract-classes/command'
import SignUpResponseDto from '../types/classes/dto/response/sign-up-response.dto'
import SignUpCommandInput from '../types/classes/command-inputs/sign-up.command-input'
import AuthService from '../services/auth.service'

@Injectable()
class SignUpCommand implements Command<SignUpCommandInput, SignUpResponseDto> {
  constructor(private readonly authService: AuthService) {}

  async execute(dto: SignUpCommandInput): Promise<void> {
    const result = await this.authService.signUp(dto)

    this.result = result
  }

  result: SignUpResponseDto
}

export default SignUpCommand
