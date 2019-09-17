import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import { multerUploads } from '../middlewares/multer';
import * as dashboardHandlers from '../controllers/dashboard';

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
router.use(cors());

router.get('/', dashboardHandlers.getAll);

export default router;
