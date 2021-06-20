import express from 'express'
const app = express()
const port = 3000

import start from './routes/public/start';
import auth from './routes/public/auth';

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use('/public',start);
app.use('/public/auth',auth)

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})