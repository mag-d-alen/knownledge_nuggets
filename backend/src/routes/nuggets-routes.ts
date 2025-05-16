import * as express from 'express';
const router = express.Router();
import {
  getNuggets,
  getNuggetById,
  createNugget,
  updateNugget,
  deleteNugget,
} from '../controllers/nuggets-controllers';

router.get('/', getNuggets);

router.get('/:id', getNuggetById);

router.post('/', createNugget);

router.put('/:id', updateNugget);

router.delete('/:id', deleteNugget);

export default router;
