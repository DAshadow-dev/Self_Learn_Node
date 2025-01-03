const path = require('path')
const express = require('express')
const morgan = require('morgan')
const dotenv = require('dotenv').config()
const {engine} = require('express-handlebars')
const errorHandler = require('./resources/middleware/errorHandler')
const connectDb = require('./resources/config/dbConnection')
const app = express()
const port = process.env.PORT || 3001

connectDb();
app.use(express.static(path.join(__dirname, 'public')));

app.use(morgan('combined'))
//Template engine
app.engine('hbs', engine({
  extname: 'hbs'
}))
app.set('view engine', '.hbs')
app.set('views',path.join(__dirname, 'resources/views'))
app.get('/', (req, res) => {
  res.render('home');
})

app.get('/news', (req, res) => {
  res.render('news');
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

//Middleware parses json and renders
app.use(express.json())
app.use('/contacts',require('./resources/routes/contactRoutes'))
app.use('/users',require('./resources/routes/userRoutes'))
app.use(errorHandler)

