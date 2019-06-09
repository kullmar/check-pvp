import { Router } from 'express';
import { validateCharacterQuery } from 'middleware/character-validator.middleware';
import { addToRecentChecks } from 'middleware/recent-check.middleware';
import { getCachedCharacter, searchCharacter } from 'controllers/db.controller';

const router = Router();

router.use('/character', validateCharacterQuery);
router.get('/character', getCachedCharacter);

router.get('character-search', searchCharacter);

export { router as dbRouter }