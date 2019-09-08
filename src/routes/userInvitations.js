import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import * as userInvitationHandlers from '../controllers/userInvitations';

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
router.use(cors());

router.get('/all', userInvitationHandlers.getAll);
router.post('/new', userInvitationHandlers.create);
router.get('/:userInvitationId', userInvitationHandlers.getDetail);
router.post('/:userInvitationId', userInvitationHandlers.resendInvitation);

router.delete('/:userInvitationId', userInvitationHandlers.deleteInvitation)
export default router;
