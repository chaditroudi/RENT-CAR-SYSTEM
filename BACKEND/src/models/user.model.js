const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new mongoose.Schema({
    email: {
      type: String,
      unique: true,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    username: {
      type: String
    },
    creation_date: {
      type: Date,
      default:Date.now
    },
    role:{
      type:Number,
      default:0  // 0 -> normal user , 1 -> admin , 2-> sub admin , 3 -> editor 
    }
})

module.exports = mongoose.model('User', userSchema);