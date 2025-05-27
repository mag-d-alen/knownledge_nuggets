import type { Request, Response } from 'express';
import type { NuggetsService } from '../services/nuggets-service';
type Nugget = {
  id: number;
  name: string;
  description: string;
  price: number;
};
type FilteredNuggets = {
  nuggets: Nugget[];
  totalNuggets: number;
  totalPages: number;
  currentPage: number;
  nextPage: number;
  prevPage: number;
  isLastPage: boolean;
};
export class NuggetsController {
  constructor(private readonly nuggetsService: NuggetsService) {}

  getPaginatedNuggets = async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    if (page < 1) throw new Error('Page number must be 1 or greater.');
    if (limit < 1) throw new Error('Limit must be 1 or greater.');
    const isFirstPage = page === 1;
    const startIndex = isFirstPage ? 0 : (page - 1) * limit;
    const endIndex = page * limit;
    const { count, data } = await this.nuggetsService.getPaginatedNuggets({
      startIndex,
      endIndex,
      limit,
    });

    const result: FilteredNuggets = {
      totalPages: count ? Math.ceil(count / limit) : 0,
      totalNuggets: count || 0,
      nuggets: data || [],
      currentPage: page,
      nextPage: page + 1,
      prevPage: page - 1,
      isLastPage: page === Math.ceil(Number(count) / limit),
    };
    res.json(result);
  };

  getNuggetById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const nugget = await this.nuggetsService.getNuggetById(id);
    if (!nugget) {
      throw new Error('Controller Error: Nugget not found');
    }
    res.status(200).json(nugget);
  };

  createNugget = async (req: Request, res: Response): Promise<void> => {
    const data = await this.nuggetsService.createNugget(req.body);
    res.status(201).json(data);
  };

  updateNugget = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const data = await this.nuggetsService.updateNugget(id, req.body);
    if (!data) {
      throw new Error('Controller Error: Nugget not updated');
    }
    res.status(204).send();
  };

  deleteNugget = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const data = await this.nuggetsService.deleteNugget(id);
    if (!data) {
      res.status(404).send();
    }
    res.status(204).send();
  };
}
