import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import * as personalInfoHandlers from '../controllers/personalInfo';

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
router.use(cors());

// router.get('/', personalInfoHandlers.getAll);

router.post('/:userId/add', personalInfoHandlers.addOrUpdate);
router.post('/:id/update', personalInfoHandlers.updateDetails);

router.delete('/:infoId', personalInfoHandlers.deleteInfo)

export default router;
