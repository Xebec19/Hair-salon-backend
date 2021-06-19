//dependencies
import express from 'express';

//routes PUBLIC
import start from './routes/public/start';
import login from './routes/public/login';


const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({extended:false}));
app.use(express.json);

app.use('/public/start',start);
app.use('/public/auth',login);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})