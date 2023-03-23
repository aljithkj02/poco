import { Router } from 'express';
import { loginHandler, signupHandler } from '../Controllers/user.js';

const router = Router();

router.post('/signup', signupHandler);
router.post('/login', loginHandler);

export default router;