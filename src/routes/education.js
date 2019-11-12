import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import * as educationHandlers from '../controllers/education';

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
router.use(cors());

router.get('/', educationHandlers.getAll);

router.post('/:userId/add', educationHandlers.addNew);
router.post('/:id/update', educationHandlers.updateDetails);

router.delete('/:id', educationHandlers.deleteEducation)

export default router;
