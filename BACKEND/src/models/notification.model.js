const mongoose = require("mongoose");
var Schema = mongoose.Schema;
var now = new Date();

var Notification = new Schema({
  contract: { type: mongoose.Schema.Types.ObjectId, ref: "contract" },
  message: { type: String },
  title:{type:String},
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // user editor sender
  reciever: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // user editor sender

  date: { type: Date, default: Date.now() },
  isRead: { type: Boolean, default: false },
  km_back:{type:String},
  km_out:{type:String},

  car: [{ type: Schema.Types.ObjectId, ref: "Car" }],
  status: { type: Boolean, default: false },
});
module.exports = mongoose.model("notification", Notification);