import { Router } from 'express';
import { loginHandler, refreshTokenHandler, signupHandler } from '../Controllers/user.js';

const router = Router();

router.post('/signup', signupHandler);
router.post('/login', loginHandler);
router.get('/refresh-token', refreshTokenHandler);

export default router;