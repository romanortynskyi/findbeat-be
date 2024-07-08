import { Body, Controller, Post } from '@nestjs/common'

import Route from 'src/types/enums/route.enum'
import JoinCommand from './commands/join.command'
import JoinCommandInput from './types/classes/command-inputs/join.command-input'
import JoinRequestDto from './types/classes/dto/request/join-request.dto'

@Controller(Route.Auth)
class AuthController {
  constructor(
    private readonly joinCommand: JoinCommand,
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
}

export default AuthController
