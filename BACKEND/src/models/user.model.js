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
    },
    name: {
      type: String
    },
    creation_date: {
      type: Date,
      default:Date.now
    },
    role:{
      type:Number,
      default:0  // 0 -> normal user , 1 -> admin , 2-> sub admin , 3 -> editor 
    },
    accessToken:{
      type:String,
    },
    expDate:{
      type:Date

    },
    isAdmin:{
      type:Boolean
    },
    administration:{
      type:String,
    },
    branch_id: { type: Schema.Types.ObjectId, ref: 'Branch' }

    

})

module.exports = mongoose.model('User', userSchema);