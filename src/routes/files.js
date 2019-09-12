import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import { multerUploads } from '../middlewares/multer';
import * as fileHandlers from '../controllers/files';

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
router.use(cors());

router.get('/', fileHandlers.getAll);
router.post('/', multerUploads, fileHandlers.create);

export default router;
