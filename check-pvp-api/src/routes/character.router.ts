import { Router } from 'express';
import controller from 'controllers/character.controller';

const router = Router();

router.get(`/:id`, controller.getCharacterData);

router.get('/:id/raw', controller.getCharacterRaw);

export default router;