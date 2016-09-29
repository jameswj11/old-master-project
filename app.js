'use strict'
const express    = require('express')
const logger     = require('morgan')
const path       = require('path')
const bodyParser = require('body-parser')

const homeRoute  = require('./routes/home')
const apiRoute   = require('./routes/api')

//initialize server
const app  = express()
const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
  console.log('server started on port', PORT)
})

//logging
app.use(logger('dev'))

//parse JSON
app.use(bodyParser.json())

//public files
app.use(express.static(path.join(__dirname, 'public')))

//views and view engine
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

//routes
app.use('/', homeRoute)
app.use('/api', apiRoute)
