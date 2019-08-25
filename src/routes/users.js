import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import * as userHandlers from '../controllers/users';

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
router.use(cors());

router.get('/:userId', userHandlers.getDetail);
router.post('/signup', userHandlers.sign_up);
router.post('/signin', userHandlers.sign_in);

export default router;
