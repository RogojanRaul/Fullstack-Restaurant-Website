import express from 'express';
import { signup } from '../controllers/auth.controller.js';
import { login } from '../controllers/auth.controller.js';
import { google } from '../controllers/auth.controller.js';
import { logout } from '../controllers/auth.controller.js';

const router = express();

router.post('/signup', signup);
router.post('/login', login);
router.post('/google', google);
router.get('/logout', logout);

export default router;
