import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule } from '@nestjs/config'

import ormOptions from './configs/orm.config'
import envConfig from './configs/env.config'
import AuthModule from './modules/auth/auth.module'

@Module({
  imports: [
    ConfigModule.forRoot(envConfig),
    TypeOrmModule.forRootAsync(ormOptions),
    AuthModule,
  ],
})

class AppModule {}

export default AppModule
