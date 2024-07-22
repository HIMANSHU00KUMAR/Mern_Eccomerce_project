import { Router } from "express";
import { delete_product, get_product, post_product, search_product, update_product } from "../controllers/productController.js";
import { admin, protect } from "../middleware/auth.js";
import { upload } from "../middleware/multer.js";
const router=Router();

router.get('/product',get_product);
router.post('/createproduct', protect, admin,upload.single("images"),post_product);
router.put('/updateproduct/:id',update_product);
router.delete('/deleteproduct/:id', protect, admin,delete_product);
router.get('/product_search',search_product);


export default router;