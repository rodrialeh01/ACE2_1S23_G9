import { Router } from 'express';
import { data } from '../controllers/data.controller.js';

const router = Router();

router.get('/data', data);

export default router;