import express from 'express'
import passport from 'passport'
import './security/jwtStrategy'
const app = express()
const port = 3000

import auth from './routes/public/auth'
import profile from './routes/api/profile'
import dbConnection from './setup/database'

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(passport.initialize());

dbConnection();

app.use('/public/auth',auth)
app.use('/api/profile',profile)

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})