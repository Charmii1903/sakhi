import express from 'express';
import { listProducts, addProduct, removeProduct, singleProduct, editProduct, addRating } from '../controllers/productController.js';
import upload from '../middleware/multer.js';
import adminAuth from '../middleware/adminAuth.js';
import authUser from '../middleware/Auth.js';

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
productRouter.post('/single/:id', singleProduct);

// Route to list all products
productRouter.get('/list', listProducts);

// Add a root route to handle `/api/product`
productRouter.get('/:id', listProducts);

productRouter.post('/edit', adminAuth, editProduct);
productRouter.post('/rating', addRating);




export default productRouter;
