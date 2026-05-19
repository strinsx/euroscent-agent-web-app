

import express from 'express';
import cors from 'cors';
import userAuth from './routes/userRoute.js'


const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/auth', userAuth);


export default app