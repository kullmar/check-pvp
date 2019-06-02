import { Router } from 'express';
import controller from 'controllers/recent-check.controller';

const router = Router();

router.get('/', controller.openStream);

export default router;