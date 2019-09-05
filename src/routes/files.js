import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import * as fileHandlers from '../controllers/files';

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
router.use(cors());

router.post('/', fileHandlers.create);
export default router;
