const mongoose = require('mongoose');
const { Schema } = mongoose;

const contractSchema = new mongoose.Schema({


  car:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Car',
    required: true
},
    version: {
      type: Number,
      required: true
    },
    sponsor: {
      type: String,
      required: true
    },
    car_out: {
      type: Date,
    },
    car_back:{
        type: Date,
    },
    select_one: {
        type:String,
        required: true
    },
    deposit:{
        type:String,
        required: true
    },
    location:{
        type:String,
        required: true
    },
    hirer:{
        type:String,
        required: true
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
        required: true
      },
      no_km_back: {
        type: String,
        required: true
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