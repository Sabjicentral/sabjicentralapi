import express from 'express';
import { createCart, deleteCartById, getAllCart, getAllCartByUserId, getCartById } from '../controllers/cartModule/cart.controller.js';

const  router = express.Router();

router.post('/create/cart/:userId', createCart);
router.get('/getCartOrder', getAllCart);
router.get('/getCartById/:cartId', getCartById);
router.get('/getAllCartByUserId/:userId', getAllCartByUserId);
router.delete('/deleteCartById/:cartId', deleteCartById);

export default router;