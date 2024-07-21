import { ApiResponse } from '@opensearch-project/opensearch/.'
import { BulkStats } from '@opensearch-project/opensearch/lib/Helpers'

import OpenSearchIndex from 'src/types/enums/open-search-index.enum'

abstract class AbstractOpenSearchService {
  abstract indexExists(index: OpenSearchIndex): Promise<boolean>
  abstract ensureIndexExists(index: OpenSearchIndex, body): Promise<void>
  abstract index(
    index: OpenSearchIndex,
    document: any,
  ): Promise<ApiResponse<Record<string, any>, unknown>>
  abstract bulkIndex(
    index: OpenSearchIndex,
    documents: any[],
  ): Promise<BulkStats>
  abstract search(index: OpenSearchIndex, query: any): Promise<any[]>
  abstract delete(index: OpenSearchIndex, id: string): Promise<void>
  abstract bulkDelete(
    index: OpenSearchIndex,
    ids: string[],
  ): Promise<BulkStats>
}

export default AbstractOpenSearchService
