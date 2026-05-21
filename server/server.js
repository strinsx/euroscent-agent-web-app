import dotenv from 'dotenv';
dotenv.config();

import app from './app.js';
import connection from './config/db.js';

const PORT = process.env.PORT;

connection();

app.listen(PORT || 5000, () => {
  console.log(`this is listening from port ${PORT}`);
});