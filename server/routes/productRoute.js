
import express from 'express'

import { getProducts, getProductId, deleteProduct, updateProduct } from '../controllers/productController.js';



const router = express.Router();


router.get('/products', getProducts);
router.get('/products/:id', getProductId); 
router.delete('/products/:id', deleteProduct); 
router.put('/products/:id', updateProduct); 

export default router;