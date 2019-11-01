import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import { multerUploads, multerAvatarUpload } from '../middlewares/multer';
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
router.post('/forgot_password', userHandlers.forgotPassword);
router.post('/reset_password', userHandlers.resetPassword);
router.post('/:userId/avatar', multerAvatarUpload, fileHandlers.createAvatar)
router.post('/:userId/file', multerUploads, fileHandlers.create);
router.post('/:userId/password', userHandlers.changePassword);
router.post('/:userId', userHandlers.updateDetails);

export default router;
