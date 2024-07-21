import { ConfigService } from '@nestjs/config'
import { config } from 'dotenv'
import { DataSource } from 'typeorm'

import UserEntity from './src/entities/user.entity'

import AddUserEntity1719743389184 from './src/migrations/1719743389184-add-user-entity'
import AddUserUsername1721563834090 from './src/migrations/1721563834090-add-user-username'
import envKeys from 'src/consts/env-keys'

config({
  path: '.env.local',
})

const configService = new ConfigService()

export default new DataSource({
  type: 'postgres',
  host: configService.get(envKeys.database.host),
  port: configService.get(envKeys.database.port),
  username: configService.get(envKeys.database.username),
  password: configService.get(envKeys.database.password),
  database: configService.get(envKeys.database.name),
  entities: [
    UserEntity,
  ],
  migrations: [
    AddUserEntity1719743389184,
    AddUserUsername1721563834090,
  ],
})
