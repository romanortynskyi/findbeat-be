import { Module, OnModuleInit } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule } from '@nestjs/config'

import ormOptions from './configs/orm.config'
import envConfig from './configs/env.config'
import AuthModule from './modules/auth/auth.module'
import OpenSearchService from './modules/open-search/services/implementations/open-search.service'
import OpenSearchIndex from './types/enums/open-search-index.enum'
import OpenSearchModule from './modules/open-search/open-search.module'

@Module({
  imports: [
    ConfigModule.forRoot(envConfig),
    TypeOrmModule.forRootAsync(ormOptions),
    AuthModule,
    OpenSearchModule,
  ],
})

class AppModule implements OnModuleInit {
  constructor(private readonly openSearchService: OpenSearchService) {}

  async onModuleInit(): Promise<void> {
    await this.openSearchService.ensureIndexExists(OpenSearchIndex.Users, {})
  }
}

export default AppModule
