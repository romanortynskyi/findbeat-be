import { Module } from '@nestjs/common'
import AuthController from './auth.controller'
import AuthService from './services/auth.service'
import SignUpCommand from './commands/sign-up.command'

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    SignUpCommand,
  ],
})
class AuthModule {

}

export default AuthModule
