import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ApiResponse, Client } from '@opensearch-project/opensearch'
import { BulkStats } from '@opensearch-project/opensearch/lib/Helpers'

import OpenSearchIndex from 'src/types/enums/open-search-index.enum'
import AbstractSearchService from '../abstract/abstract-search.service'
import envKeys from 'src/consts/env-keys'

@Injectable()
class OpenSearchService
  implements
    AbstractSearchService<
      OpenSearchIndex,
      ApiResponse<Record<string, any>, unknown>,
      BulkStats
    > {
  client: Client

  constructor(private configService: ConfigService) {
    this.client = new Client({
      node: configService.get(envKeys.openSearch.endpoint),
      ssl: {
        rejectUnauthorized: false,
      },
      auth: {
        username: configService.get(envKeys.openSearch.username),
        password: configService.get(envKeys.openSearch.password),
      },
    })
  }

  async indexExists(index: OpenSearchIndex): Promise<boolean> {
    const indexExistsResponse = await this.client.indices.exists({ index })

    return indexExistsResponse.statusCode !== 404
  }

  async ensureIndexExists(index: OpenSearchIndex, body): Promise<void> {
    const indexExists = await this.indexExists(index)

    if (!indexExists) {
      await this.client.indices.create({
        index,
        body,
      })
    }
  }

  async index(
    index: OpenSearchIndex,
    document: any,
  ): Promise<ApiResponse<Record<string, any>, unknown>> {
    const response = await this.client.index({
      id: document.id,
      index,
      body: document,
      refresh: true,
    })
  
    return response
  }

  async bulkIndex(
    index: OpenSearchIndex,
    documents: any[],
  ): Promise<BulkStats> {
    const response = await this.client.helpers.bulk({
      datasource: documents,
      onDocument(doc) {
        return {
          index: {
            _index: index,
            _id: doc.id,
          },
        }
      }
    })

    return response
  }

  async search(index: OpenSearchIndex, query: any): Promise<any> {
    const response = await this.client.search({
      index,
      body: query,
    })
  
    return response.body.hits
  }

  async delete(index: OpenSearchIndex, id: string): Promise<void> {
    await this.client.delete({
      index,
      id,
    })
  }

  async bulkDelete(index: OpenSearchIndex, ids: string[]): Promise<BulkStats> {
    const response = await this.client.helpers.bulk({
      datasource: ids.map((id) => ({ id })),
      onDocument(doc) {
        return {
          delete: {
            _index: index,
            _id: doc.id,
          },
        }
      },
    })

    return response
  }
}

export default OpenSearchService
