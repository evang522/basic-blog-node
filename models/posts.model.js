'use strict';
//================================== Import Dependencies ====================>
const mongoose = require('mongoose');


//================================== Initialize Post Schema ====================>

const PostSchema = new mongoose.Schema({
  author: {
    type:String,
    required:true
  },
  body: {
    type:String,
    require:true
  },
  tags: {
    type:Array,
  },
  title: {
    type:String,
    required:true
  }
});

module.exports = mongoose.model('post', PostSchema);