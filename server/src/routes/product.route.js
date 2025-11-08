import express from 'express';
import { authMiddleware } from '../middlewares/auth.js';
import { getProductById, getProducts, searchProducts } from '../controllers/product-buyers.controller.js';
import { createProduct, getStoreProducts } from '../controllers/product-admin.controller.js';
import { sellerMiddleware } from '../middlewares/seller.js';


const router = express.Router();
//customer routes
router.get('/', getProducts);
router.get('/search', searchProducts);
router.get('/:id', getProductById);

//seller routes
router.post('/', sellerMiddleware, createProduct);
router.get('/store',sellerMiddleware, getStoreProducts);

export default router;