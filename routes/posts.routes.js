'use strict';
//================================== Import Dependencies ====================>
const Post = require('../models/posts.model');
const express = require('express');
const router = express.Router();


//================================== GET All POSTS ====================>
router.get('/post', (req,res,next) => {

  const {user} = req.query;

  const query = {};
  for (let i in req.query) {
    if (i === 'user' || i === 'title')
      query[i] = req.query[i];
  }

  Post.find(query)
    .then(response => {
      res.json(response);
    });

});



//================================== Create New Post ====================>

router.post('/post', (req,res,next) => {
  const acceptedFields = ['author','body','tags','title'];
  const newPost = {};
  let runningErr;

  acceptedFields.forEach(field => {
    if (!(field in req.body)) {
      const err = new Error();
      err.status = 400;
      err.message = `Missing ${field} field`;
      return runningErr = err;
    }

    newPost[field] = req.body[field];
  });

  if (runningErr) {
    return next(runningErr);
  }

  Post.create(newPost)
    .then(response => {
      res.json(response);
    })
    .catch(next);
  
});

router.put('/post/:id', (req,res,next) => {

  const {id} = req.params;
  const updateableFields = ['body','title','tags'];
  const updates = {};

  updateableFields.forEach(field => {
    if (field in req.body) {
      updates[field] = req.body[field];
    }
  });

  if (!Object.keys(updates).length === 0) {
    const err = new Error();
    err.status = 400;
    err.message = 'No Updates Provided';
    return next(err);
  }

  Post.findByIdAndUpdate(id, updates, {new:true})
    .then(response => {
      res.json(response);
    })
    .catch(next);

});

//================================== Delete Post ====================>


router.delete('/post/:id', (req,res,next) => {
  const {id} = req.params;
  Post.findByIdAndRemove(id)
    .then(response => {
      res.status(204).end();
    })
    .catch(next);
});



module.exports = router;