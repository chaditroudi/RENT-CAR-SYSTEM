const mongoose = require('mongoose');
const Schema =  mongoose.Schema;
const branchSchema = new Schema({

    branch_name:{
        type:String,
        required:true
    },
    state:{
        type:Boolean,
    },
    administrations:{
        type:String
    },

    users: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
}, { timestamps: true });


module.exports = mongoose.model('Branch', branchSchema);