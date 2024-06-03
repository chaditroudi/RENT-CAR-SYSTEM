const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  car: { type: mongoose.Schema.Types.ObjectId, ref: 'Car', required: true },
  contract: { type: mongoose.Schema.Types.ObjectId, ref: 'contract', required: true },

});

module.exports = mongoose.model('Report', reportSchema);
