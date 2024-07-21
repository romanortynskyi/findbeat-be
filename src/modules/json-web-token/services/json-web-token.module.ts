import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'

import JsonWebTokenService from './implementations/json-web-token.service'

@Module({
  imports: [
    JwtModule.register({}),
  ],
  providers: [JsonWebTokenService],
  exports: [JsonWebTokenService],
})
class JsonWebTokenModule {}

export default JsonWebTokenModule
