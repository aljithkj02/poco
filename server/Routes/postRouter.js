import { Router } from 'express';
import { getPosts } from '../Controllers/post.js';
import authorize from '../Middlewares/authorize.js';

const router = Router();

router.get('/', authorize, getPosts);

export default router;