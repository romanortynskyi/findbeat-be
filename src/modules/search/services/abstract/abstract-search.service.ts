abstract class AbstractSearchService<IndexEnum, ResponseType, BulkStatsType> {
  abstract ensureIndexExists(index: IndexEnum, body: any): Promise<void>
  abstract index(index: IndexEnum, document: any): Promise<ResponseType>
  abstract bulkIndex(
    index: IndexEnum,
    documents: any[],
  ): Promise<BulkStatsType>
  abstract search(index: IndexEnum, query: any): Promise<any[]>
  abstract delete(index: IndexEnum, id: string): Promise<void>
  abstract bulkDelete(index: IndexEnum, ids: string[]): Promise<BulkStatsType>
}

export default AbstractSearchService
