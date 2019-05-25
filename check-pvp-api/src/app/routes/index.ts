import { Router } from 'express';
import * as fromCharacter from './character.router';

const router = Router();

router.use('/character', fromCharacter.router);
