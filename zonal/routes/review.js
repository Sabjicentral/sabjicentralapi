import express from 'express';
import { createReview, deleteReviewById, editReviewById, getAllReview, getReviewById } from '../controllers/reviewModule/review.controller.js';

const router = express();

router.post('/create/review/:reviewUser', createReview);
router.get('/getAllReview', getAllReview);
router.get('/getReviewById/:reviewId', getReviewById);
router.put('/editReviewById/:reviewId', editReviewById);
router.delete('/deleteReviewById/:reviewId', deleteReviewById);

export default router;