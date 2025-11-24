import type { Complaint } from './complaint';

export type Complaints = {
  items: Complaint[];
  pageNumber: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
};
