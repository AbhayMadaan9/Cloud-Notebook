const mongoose = require('mongoose');

const {Schema} = mongoose

const userSchema = new Schema({
  name:{
    type: String,
    Required: true
  },
  email:{
    type:String,
    Required: true
  },
  password:{
    type:String,
    Required: true,
    unique:true    //its like candidate/primary key 
  },
  phone:{
    type:Number, 
    Required: true
  }
});



module.exports = mongoose.model('user', userSchema)