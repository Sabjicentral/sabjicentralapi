import express from 'express';
import { createOffer, deleteOfferById, editOfferById, getAllOffer, getOfferById } from '../controllers/offerModule/offer.controller.js';

const router = express.Router();

router.post('/create/offer', createOffer);
router.get('/getAllOffer', getAllOffer);
router.get('/getOfferById/:offerId', getOfferById);
router.put('/editOfferById/:offerId', editOfferById);
router.delete('/deleteOfferById/:offerId', deleteOfferById);


export default router;

