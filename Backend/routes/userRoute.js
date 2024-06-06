import { Router } from 'express';
import { signup, login, get_user, Adminsignup } from '../controllers/userControllers.js';
const router = Router();
// import auth from '../middleware/auth.js';
router.post('/adminregister', Adminsignup);
router.post('/register', signup);
router.post('/login', login);
router.get('/user/:userId', get_user);

export default router;