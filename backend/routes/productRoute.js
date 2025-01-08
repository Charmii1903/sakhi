import express from 'express';
import { listProducts, addProduct, removeProduct, singleProduct, editProduct } from '../controllers/productController.js';
import upload from '../middleware/multer.js';
import adminAuth from '../middleware/adminAuth.js';

const productRouter = express.Router();

// Route to add a product
productRouter.post(
  '/add',
  adminAuth,
  upload.fields([
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'image3', maxCount: 1 },
    { name: 'image4', maxCount: 1 },
  ]),
  addProduct
);

// Route to remove a product
productRouter.post('/remove', adminAuth, removeProduct);

// Route to get a single product
productRouter.post('/single', singleProduct);

// Route to list all products
productRouter.get('/list', listProducts);

// Add a root route to handle `/api/product`
productRouter.get('/', listProducts);

productRouter.post('/edit', adminAuth, editProduct);

export default productRouter;
