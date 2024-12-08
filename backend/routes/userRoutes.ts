import express from 'express';
import { createUser, getUser, loginUser } from '../controllers/userControllers';

const router = express.Router();

router.route('/').post(createUser)
router.route('/login').post(loginUser)
router.route('/:id').get(getUser)

export default router;

