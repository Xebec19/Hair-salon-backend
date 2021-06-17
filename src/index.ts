//dependencies
const express = require('express');

//routes
const start = require ('./routes/public/start');

const app = express()
const port = process.env.PORT || 3000

app.use('/public/start',start);

app.listen(port, () => {
  console.log(`Hair-salon-backend server listening at http://localhost:${port}`)
})