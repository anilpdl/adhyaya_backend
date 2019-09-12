import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import { multerUploads } from '../middlewares/multer';
import * as fileHandlers from '../controllers/files';
import * as userHandlers from '../controllers/users';

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
router.use(cors());

router.get('/all', userHandlers.getAll);
router.get('/:userId', userHandlers.getDetail);
router.post('/signup', userHandlers.sign_up);
router.post('/signin', userHandlers.sign_in);
router.post('/:userId/file', multerUploads, fileHandlers.create);

export default router;
