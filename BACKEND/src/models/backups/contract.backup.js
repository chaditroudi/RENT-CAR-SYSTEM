const mongoose = require('mongoose');
const { Schema } = mongoose;

const contractBackupSchema = new mongoose.Schema({


  serial:{
    type:Number,
    default:0
    
  },

  data: Object,

  
    
})


module.exports = mongoose.model('backup_contract', contractBackupSchema);