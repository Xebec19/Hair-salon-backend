import express from 'express'
const app = express()
const port = 3000

import auth from './routes/public/auth';
import dbConnection from './setup/database';

app.use(express.urlencoded({extended: false}));
app.use(express.json());

dbConnection();

app.use('/public/auth',auth)

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})