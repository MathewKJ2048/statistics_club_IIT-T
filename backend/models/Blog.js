const mongoose = require('mongoose');
const { Schema } = mongoose;

const BlogSchema = new Schema({
   
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true, 
    },
    author:
    {
        type: String,
        required: true
    },
    author_link:
    {
        type: String,
        required: true
    },
    tag:{
        type: String,
        default: "General"
    },
    urltoimage:{
        type:String,
        default: "..."
    },
    date:{
        type: Date,
        default: Date.now
    },
  });

  module.exports = mongoose.model('Blog', BlogSchema);