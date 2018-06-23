'use strict';
//================================== Import Dependencies ====================>
const express =require('express');
const app = express();
const morgan = require('morgan');
const {PORT} = require('./config');
// const usersRoute = require('./routes/users.routes');
const postsRoute = require('./routes/posts.routes');
const mongoose = require('mongoose');
const cors = require('cors');

//================================== Configure Cors ====================>
app.use(cors());

//================================== Set Up Logger ====================>
app.use(morgan('common'));

//================================== Set up JSON Body Parsing ====================>
app.use(express.json());


//================================== Set up Routes ====================>
// app.use('/api',usersRoute);
app.use('/api', postsRoute);



//================================== Connect to Database ====================>
mongoose.connect('mongodb://localhost/blogdb', () => {
  console.log('DB connected');
});



//================================== Custom Error Handler ====================>
app.use((err,req,res,next) => {
  err.status = err.status || 500;
  err.message = err.message || 'Internal Server Error';
  res.status(err.status).json(err);
});

//================================== Listen on Provided Port  ====================>
app.listen(PORT, () => {
  console.log(`App listening on ${PORT}`);
});