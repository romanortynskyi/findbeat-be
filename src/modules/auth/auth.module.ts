import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { TypeOrmModule } from '@nestjs/typeorm'

import AuthController from './auth.controller'
import AuthService from './services/auth.service'
import UserEntity from 'src/entities/user.entity'
import JoinCommand from './commands/join.command'
import SignInCommand from './commands/sign-in.command'

@Module({
  imports: [
    JwtModule.register({}),
    TypeOrmModule.forFeature([
      UserEntity,
    ]),
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
