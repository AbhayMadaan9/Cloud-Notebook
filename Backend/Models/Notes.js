const mongoose = require('mongoose');
const user = require('./user');
const {Schema} = mongoose

const userSchema = new Schema({
  user:{     //this is like forign key we will have user details in this schema via objectid of each user. This will help in distinguishing the notes for each user through its objectid which is unique for all users
    type:mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  title:{
    type: String,
    Required: true
  },
  description:{
    type:String,
    Required: true
  },
  tag:{
    type:String,
    default:"Announcement"
  },
  date:{
    type:Date, 
    default: Date.now
  }
});



module.exports = mongoose.model('notes', userSchema)