import { Router } from 'express';
import controller from '../controllers/character.controller';
import { getCachedCharacter } from 'middleware/db.middleware';

const router = Router();

router.use('/:id', getCachedCharacter);
router.get('/:id', controller.getCharacterData);

router.get('/:id/raw', controller.getCharacterRaw);

export default router;