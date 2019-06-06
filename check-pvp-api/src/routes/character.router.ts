import { Router } from 'express';
import controller from 'controllers/character.controller';
import { getCachedCharacter, saveCharacter } from 'middleware/db.middleware';
import { addToRecentChecks } from 'middleware/recent-check.middleware';
import { validateCharacterQuery } from 'middleware/character-validator.middleware';

const router = Router();

router.use('/:id', validateCharacterQuery);
router.use('/:id', getCachedCharacter);
router.get('/:id', controller.getCharacterData);
router.use('/:id', saveCharacter);
router.use('/:id', addToRecentChecks);

router.get('/:id/raw', controller.getCharacterRaw);

export default router;