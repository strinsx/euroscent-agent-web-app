
import express from 'express'

import { getProducts, getProductId } from '../controllers/productController.js';



const router = express.Router();


router.get('/products', getProducts);
router.get('/products/:id', getProductId); 

export default router;