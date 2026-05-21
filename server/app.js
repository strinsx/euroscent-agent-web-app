

import express from 'express';
import cors from 'cors';
import userAuth from './routes/userRoute.js'
import protectedAuth from './routes/protectedRoute.js'
import createListing from './routes/listingRoute.js'
import { authMiddleware } from './middleware/authmiddleware.js'; // ← import the actual function
import getProducts from './routes/productRoute.js';
import orders from './routes/orderRoute.js'


const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/auth', userAuth);
app.use('/api/auth', protectedAuth)
app.use('/api', getProducts);
app.use('/api', orders)
app.use('/api', authMiddleware , createListing);


export default app