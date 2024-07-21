import { Injectable } from '@nestjs/common'

import Command from 'src/types/abstract-classes/command'
import JoinResponseDto from '../types/classes/dto/response/join-response.dto'
import JoinCommandInput from '../types/classes/command-inputs/join.command-input'
import AuthService from '../services/implementations/auth.service'

@Injectable()
class JoinCommand implements Command<JoinCommandInput, JoinResponseDto> {
  constructor(private readonly authService: AuthService) {}

  async execute(input: JoinCommandInput): Promise<void> {
    const result = await this.authService.join(input)

    this.result = result
  }

  result: JoinResponseDto
}

export default JoinCommand
