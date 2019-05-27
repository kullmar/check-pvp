import { Router } from 'express';
import controller from 'controllers/character.controller';

const router = Router();

router.get(`/:id`, controller.getCharacterData);

export default router;