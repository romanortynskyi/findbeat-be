import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import AuthController from './auth.controller'
import AuthService from './services/implementations/auth.service'
import UserEntity from 'src/entities/user.entity'
import SignUpCommand from './commands/sign-up.command'
import SignInCommand from './commands/sign-in.command'
import JsonWebTokenModule from '../json-web-token/services/json-web-token.module'
import SearchModule from '../search/search.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
    ]),
    JsonWebTokenModule,
    SearchModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    SignUpCommand,
    SignInCommand,
  ],
})
class AuthModule {

}

export default AuthModule
