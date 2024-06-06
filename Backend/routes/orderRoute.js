import { Router } from 'express';
import { get_orders, checkout } from '../controllers/orderControllers.js';
const router = Router();

router.get('/order/:id',get_orders);
router.post('/createorder/:id',checkout);

export default router;