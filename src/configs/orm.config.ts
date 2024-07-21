import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm'

import envKeys from 'src/consts/env-keys'
import UserEntity from 'src/entities/user.entity'

const ormOptions: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => ({
    type: 'postgres',
    host: configService.get(envKeys.database.host),
    port: parseInt(configService.get(envKeys.database.port)),
    username: configService.get(envKeys.database.username),
    password: configService.get(envKeys.database.password),
    database: configService.get(envKeys.database.name),
    entities: [
      UserEntity,
    ],
    logging: 'all',
    extra: {
      max: 50,
    },
  }),
}

export default ormOptions
