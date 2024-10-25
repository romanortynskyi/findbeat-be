import { Module } from '@nestjs/common'

import OpenSearchService from './services/implementations/open-search.service'

@Module({
  providers: [OpenSearchService],
  exports: [OpenSearchService],
})
class OpenSearchModule {}

export default OpenSearchModule
