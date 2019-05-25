import { Router } from 'express';
import { CharacterController } from 'controllers';

export const router = Router();
const controller = new CharacterController();

router.get(`/character/:id`, controller.getCharacterData)