const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// var AutoIncrement = require('mongoose-sequence')(mongoose);

// Create a schema for the data
const carSchema = new Schema({
    serial:{
        type:Number,
        default:0
    },
    code:Number,
    car:String,
    year:Number,
    plate:{
      type:Number,
      unique:true
    },
    next_service: Number,
    current:Number,
    insurance: Date,
    registration: Date,
    createdBy:{
        type:String
      },
      updatedBy:{
        type:String
      },
    engine_no: String,
    chassis_no: String,
    fuel: String,
    comment: String,
    out_of_service: Boolean,
    petrol_charge: String,
    daily: Number,
    weekly: Number,
    monthly: Number,
    annual: Number,

    color:String,
    category:String,
    origin:String,
    doors:Number,
    seats:Number,
    cylinders:Number,
    insurance_company:String,

    owner_name:String,
    owner_id:Number,
    
    nationality:String,

    rented:Boolean,
    branch_id: { type: Schema.Types.ObjectId, ref: 'Branch' }





});

// carSchema.plugin(AutoIncrement, {id:'serial_seq',inc_field: 'serial'});

// Create a model using the schema
const car = mongoose.model('Car', carSchema);



module.exports = car;