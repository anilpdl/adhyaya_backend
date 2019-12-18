import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import * as contactHandlers from '../controllers/contactDetail';

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
router.use(cors());

router.get('/', contactHandlers.getDetail);

router.post('/:userId/add', contactHandlers.addOrUpdate);
router.post('/:id/update', contactHandlers.updateDetails);

router.delete('/:contactId', contactHandlers.deleteContact)

export default router;
