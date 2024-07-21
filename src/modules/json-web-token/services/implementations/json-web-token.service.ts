import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { instanceToPlain } from 'class-transformer'

import AbstractJsonWebTokenService from '../abstract/abstract-json-web-token.service'
import UserEntity from 'src/entities/user.entity'
import { ConfigService } from '@nestjs/config'
import envKeys from 'src/consts/env-keys'

@Injectable()
class JsonWebTokenService implements AbstractJsonWebTokenService {
  secret: string
  expiresIn: string
  
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {
    this.secret = configService.get(envKeys.jwt.secret)
    this.expiresIn = configService.get(envKeys.jwt.expiresIn)
  }

  signToken(user: UserEntity): Promise<string> {
    return this.jwtService.signAsync(instanceToPlain(user), {
      secret: this.secret,
      expiresIn: this.expiresIn,
    })
  }
}

export default JsonWebTokenService
