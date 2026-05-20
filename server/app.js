

import express from 'express';
import cors from 'cors';
import userAuth from './routes/userRoute.js'
import protectedAuth from './routes/protectedRoute.js'


const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/auth', userAuth);
app.use('/api/auth/', protectedAuth)


export default app