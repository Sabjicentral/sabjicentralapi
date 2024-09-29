import express from 'express';
import { createOrder, deleteOrderById, editOrderById, getAllOrder, getOrderById } from '../controllers/orderModule/order.controller.js';

const  router = express.Router();

router.post('/create/order/:userId', createOrder);
router.get('/getAllOrder', getAllOrder);
router.get('/getOrderById/:orderId',getOrderById);
router.put('/editOrderById/:orderId', editOrderById);
router.delete('/deleteOrderById/:orderId', deleteOrderById); 

export default router;