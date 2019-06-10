import characterRouter from './character.router';
import recentCheckRouter from './recent-check.router';
import { dbRouter } from './db.router';
import { Router } from 'express';
import { searchCharacter } from 'controllers/db.controller';

const router = Router()
router.use('/character', characterRouter);
router.use('/db', dbRouter);
router.post('/character-search', searchCharacter);
router.use('/recent-check-stream', recentCheckRouter);

export default router;