export interface ISearchResult<T> {
  count: number; // 总数
  data: T[]; // 数据
  errors: string[]; // 错误信息
}
