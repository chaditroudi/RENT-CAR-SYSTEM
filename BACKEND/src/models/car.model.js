const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create a schema for the data
const carSchema = new Schema({
    code:Number,
    car:String,
    year:Number,
    
    next_service: Date,
    insurance: Date,
    registration: Date,
    engine_no: String,
    chassis_no: String,
    fuel: String,
    comment: String,
    out_of_service: Boolean,
    petrol_charge: Number,
    daily: Number,
    weekly: Number,
    monthly: Number,
    annual: Number
});

// Create a model using the schema
const car = mongoose.model('car', carSchema);

module.exports = car;