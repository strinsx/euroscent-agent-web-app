import express from 'express';
import { createListing } from '../controllers/listingController.js'; // ← curly braces
import multer from 'multer';

const upload = multer({dest: 'uploads/'})


const router = express.Router();


router.post('/create-listing', upload.array('images'), createListing);

export default router