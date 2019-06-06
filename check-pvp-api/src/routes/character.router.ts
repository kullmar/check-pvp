import { Router } from 'express';
import controller from 'controllers/character.controller';
import { saveCharacter } from 'middleware/db.middleware';
import { addToRecentChecks } from 'middleware/recent-check.middleware';
import { validateCharacterQuery } from 'middleware/character-validator.middleware';

const router = Router();

router.use('/', validateCharacterQuery);
router.get('/', controller.getCharacter);
router.use('/', saveCharacter);
router.use('/', addToRecentChecks);

router.get('/:id/raw', controller.getCharacterRaw);

export default router;