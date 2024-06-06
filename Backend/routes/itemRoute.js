import { Router } from 'express';
import { get_items, post_item, update_item, delete_item } from '../controllers/itemControllers.js';
import { upload } from '../middleware/multer.js';
const router = Router();

router.get('/items', get_items);

router.post('/createitems',upload.single("image"),post_item);

router.put('/updateitems/:id',update_item);
router.delete('/deleteitems/:id',delete_item);

export default router;