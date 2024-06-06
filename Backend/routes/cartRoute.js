import { Router } from 'express';
import { get_cart_items, add_cart_item, delete_item } from '../controllers/cartControllers.js';
const router = Router();

router.get('/cart/:id',get_cart_items);
router.post('/addcart/:id',add_cart_item);
router.delete('/deletecart/:userId/:itemId',delete_item);

export default router;