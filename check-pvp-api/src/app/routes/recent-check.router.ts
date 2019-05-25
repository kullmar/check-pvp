import { Router } from 'express';
import { RecentCheckController } from 'controllers';

const router = Router();
const controller = new RecentCheckController();

router.get('/recent-check-stream', controller.openStream);