const mongoose = require('mongoose');
const { Schema } = mongoose;

const contractSchema = new mongoose.Schema({


  serial:{
    type:Number,
    default:0
    
  },


  car:{
    type:String
  },
    version: {
      type: Number,
      
    },
    sponsor: {
      type: String,
      
    },
    car_out: {
      type: Date,
    },
    days:{
      type:Number
    },
    car_back:{
        type: Date,
    },
    select_one: {
        type:String,
        
    },
    deposit:{
        type:String,
        
    },
    location:{
        type:String,
        
    },
    hirer:{
        type:String,
        
    },
    comments:{
        type:String,
        required: false
    },
    daily:{
        type:Number,
        required: false
    },
    monthly:{
        type:Number,
        required: false
    },
    weekly:{
        type:Number,
        required: false
    },
    annual:{
        type:Number,
        required: false
    },
    fuel_out: {
        type: String,
      },
      no_km_out:{
          type:String,
      },
  
      fuel_back: {
        type: String,
        
      },
      no_km_back: {
        type: String,
        
      },
      features:{
          type:Array,
          required: false
      },
      daily_val1:{
        type:Number,
      },
      daily_val2:{
        type:Number,
      },
      daily_result:{
        type:Number,
      },
      sum:{
        type:Number,
      },
      discount:{
        type:Number,
      },
      advance:{
        type:Number,
      },
      payable:{
        type:Number,
      }
    
})


module.exports = mongoose.model('contract', contractSchema);