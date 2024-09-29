import express from "express";
import upload from "../config/multer.js";
import { createProduct, deleteProductById, editProductById, getAllProduct, getProductByID } from "../controllers/productModule/product.controller.js";

const router = express.Router();

router.post('/createProduct', upload.array("productImage"), createProduct);
router.get("/getAllProduct", getAllProduct);
router.get("/getProductById/:productId", getProductByID);
router.put('/editProductById/:productId', upload.array("productImage"), editProductById);
router.delete('/deleteProductById/:productId', deleteProductById);

export default router;