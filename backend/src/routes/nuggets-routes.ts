import * as express from 'express';
import { NuggetsController } from '../controllers/nuggets-controllers';
import { NuggetsDao } from '../dao/nuggets-dao';
import { NuggetsService } from '../services/nuggets-service';

const router = express.Router();
export class NuggetsRoutes {
  constructor(private readonly nuggetsController: NuggetsController) {
    router.get('/', this.nuggetsController.getPaginatedNuggets);
    router.get('/:id', this.nuggetsController.getNuggetById);
    router.post('/', this.nuggetsController.createNugget);
    router.post('/verify', this.nuggetsController.verifyNuggetWithAI);
    router.post('/explain', this.nuggetsController.explainNuggetWithAI);
    router.put('/:id', this.nuggetsController.updateNugget);
    router.delete('/:id', this.nuggetsController.deleteNugget);
  }
  getRoutes() {
    return router;
  }
}
const nuggetsRoutes = new NuggetsRoutes(
  new NuggetsController(new NuggetsService(new NuggetsDao()))
);
export default nuggetsRoutes.getRoutes();
