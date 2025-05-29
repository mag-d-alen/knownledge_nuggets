import type { NuggetsDao } from '../dao/nuggets-dao';
import type { Nugget } from '../types';

export class NuggetsService {
  constructor(private readonly nuggetsDao: NuggetsDao) {}

  async getPaginatedNuggets({
    startIndex,
    endIndex,
    limit,
  }: {
    startIndex: number;
    endIndex: number;
    limit: number;
  }): Promise<{
    data: Nugget[];
    count: number;
  }> {
    const { data, count } = await this.nuggetsDao.getPaginatedNuggets({
      startIndex,
      endIndex,
      limit,
    });
    return { data, count: count || 0 };
  }
  async getNuggetById(id: string): Promise<Nugget | null> {
    const data = await this.nuggetsDao.getNuggetById(id);
    return data;
  }
  async createNugget(nugget: Nugget): Promise<Nugget> {
    const data = await this.nuggetsDao.insertNugget(nugget);
    if (!data) throw new Error('Service Error: Nugget not created');
    return data;
  }
  async updateNugget(id: string, nugget: Nugget): Promise<Nugget | null> {
    const data = await this.nuggetsDao.updateNugget(id, nugget);
    return data;
  }
  async deleteNugget(id: string): Promise<boolean> {
    const isDeleted = await this.nuggetsDao.deleteNugget(id);
    return isDeleted;
  }
}
