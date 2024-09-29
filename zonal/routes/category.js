import express from 'express';
import { createCategory, deleteCategoryById, editCategoryById, getAllCategory, getCategoryById } from '../controllers/categoryModule/category.controller.js';
import upload from '../config/multer.js';

const  router = express.Router();

router.post('/create/category',upload.single('categoryImage'), createCategory);
router.get('/getAllCategories', getAllCategory);
router.get('/getCategoryById/:categoryId', getCategoryById);
router.put('/editCategoryById/:categoryId',upload.single('categoryImage'), editCategoryById);
router.delete('/deleteCategoryById/:categoryId', deleteCategoryById); 

export default router;