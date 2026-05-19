

import app from './app.js';
import dotenv from 'dotenv';
import connection from './config/db.js';

dotenv.config();
const PORT = process.env.PORT;

connection();

app.listen(PORT || 3001, ()=> {
    console.log(`this is listening from port ${PORT}`)
});