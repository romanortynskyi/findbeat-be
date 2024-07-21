import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import AuthController from './auth.controller'
import AuthService from './services/implementations/auth.service'
import UserEntity from 'src/entities/user.entity'
import JoinCommand from './commands/join.command'
import SignInCommand from './commands/sign-in.command'
import JsonWebTokenModule from '../json-web-token/services/json-web-token.module'
import OpenSearchModule from '../open-search/open-search.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
    ]),
    JsonWebTokenModule,
    OpenSearchModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JoinCommand,
    SignInCommand,
  ],
})
class AuthModule {

}

export default AuthModule
