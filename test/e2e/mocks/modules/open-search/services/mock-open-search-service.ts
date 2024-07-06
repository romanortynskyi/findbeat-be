/* eslint-disable @typescript-eslint/no-unused-vars */
import OpenSearchIndex from 'src/enums/open-search-index.enum'

const mockOpenSearchService = {
  indexExists: (_index: OpenSearchIndex) => {},

  ensureIndexExists: (_index: OpenSearchIndex, body) => {},

  index: (_index: OpenSearchIndex, _document: any) => {
    return Promise.resolve()
  },

  bulkIndex: (_index: OpenSearchIndex, _documents: any[]) => {},
  
  search: (_index: OpenSearchIndex, _query: any) => {},
  
  delete: (_index: OpenSearchIndex, _id: string) => {},
  
  bulkDelete: (_index: OpenSearchIndex, _ids: string[]) => {},
}

export default mockOpenSearchService
