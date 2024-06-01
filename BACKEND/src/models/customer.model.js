const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const customerSchema = new Schema({
  passport_number: { type: Number, required: true, unique: true },
  code:{type:Number},
  id_number: { type: Number, required: true, unique: true },
  title: { type: String, required: true },
  fullName: { type: String, required: true },
  date_birth: { type: String, required: false },
    license_number: { type: String, required: true },
    issued_by: { type: String, required: true },
    issued_on: { type: String, required: true },
    expiry_date: { type: String, required: true }
  ,
  passport_expiry: { type: String, required: true },
 
  operation_balance: { type: Number },
    mobile: { type: String, required: true },
    telephone: { type: String },
    email: { type: String },
    QAR_address: { type: String },
    permanent_address: { type: String },
    files:[String],
  
    person_name: { type: String },
    mobile: { type: String },
    home_country: { type: String },
    nationality: { type: String },
    branch_id: { type: Schema.Types.ObjectId, ref: 'Branch' }

}, { timestamps: true });



const customer= mongoose.model('Customer', customerSchema);
module.exports = customer;