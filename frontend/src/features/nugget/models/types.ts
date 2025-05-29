export type Nugget = {
  id: string;
  title: string;
  content: string;
  tags: string[];
};
export type CreateNugget = Omit<Nugget, 'id' | 'createdAt'>;
export type PaginatedNuggets = {
  totalPages: number;
  totalNuggets: number;
  currentPage: number;
  nextPage: number;
  prevPage: number;
  isLastPage: boolean;
  nuggets: Nugget[];
};
