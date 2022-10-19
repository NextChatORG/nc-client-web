export type ObjectId = number | string;

export enum OrderDirection {
  ASC = 'ASC',
  DESC = 'DESC',
}

export interface Pagination {
  orderBy?: string;
  orderDirection?: OrderDirection;
  page: number;
  perPage: number;
}
