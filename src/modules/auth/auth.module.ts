import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { TypeOrmModule } from '@nestjs/typeorm'

import AuthController from './auth.controller'
import AuthService from './services/auth.service'
import SignUpCommand from './commands/join.command'
import UserEntity from 'src/entities/user.entity'

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
    SignUpCommand,
  ],
})
class AuthModule {

}

export default AuthModule
