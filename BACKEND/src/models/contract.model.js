const mongoose = require('mongoose');
const { Schema } = mongoose;

const contractSchema = new mongoose.Schema({


  serial:{
    type:Number,
    default:0
    
  },

  rented:{type:Boolean}
,
    status: { type: String },

  car:{
    type:Schema.Types.ObjectId,
    ref:'Car'
  },

  owner:{
    type:Schema.Types.ObjectId,
    ref:'Customer'
  },
    version: {
      type: Number,
      
    },
    sponsor: {
      type: String,
      
    },
    car_out: {
      type: String,
    },
    days:{
      type:Number
    },
    car_back:{
        type: String,
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
          required: false,
      },
      features_back:{
        type:Array,
        required: false,
    },
      daily_val1:{
        type:Number,
        default:0

      },
      daily_val2:{
        type:Number,
        default:0

      },
      daily_result:{
        type:Number,
        default:0

      },
      sum:{
        type:Number,
        default:0

      },
      discount:{
        type:Number,
        default:0
      },
      advance:{
        type:Number,
        default:0

      },
      status_contract:{
        type:String
      },
      amount:{
        type:Number,
        default:0

      },
      payable:{
        type:Number,
        default:0

      },
      createdBy:{
        type:String
      },
      files:[String],

      
  
      branch_id: { type: Schema.Types.ObjectId, ref: 'Branch' }

})


module.exports = mongoose.model('contract', contractSchema);