export type Nugget = {
  id: string;
  title: string;
  content: string;
  tags: string[];
  createdAt: string;
};
export type CreateNugget = Omit<Nugget, 'id' | 'createdAt'>;
