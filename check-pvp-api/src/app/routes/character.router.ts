import { Router } from 'express';
import { CharacterController } from 'controllers';

const router = Router();
const controller = new CharacterController();

router.get(`/:id`, controller.getCharacterData);

export default router;