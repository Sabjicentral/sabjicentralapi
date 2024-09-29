import express from 'express';
import { getAllProductByFilter } from '../controllers/filterModule/filter.controller.js';

const router = express.Router();

router.get('/getAllProductByFilter', getAllProductByFilter);

export default router;