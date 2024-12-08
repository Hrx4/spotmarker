import express from 'express';
import { createLabel, deleteLabel, getLabels } from '../controllers/labelControllers';

const router = express.Router();

router.route('/').post(createLabel)
router.route('/:id').get(getLabels).delete(deleteLabel)

export default router;