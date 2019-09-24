let mongoose = require('mongoose');

var organisationSchema = mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email: {
        type:String,
        require:true,
    },
    password: {
        type:String,
        require:true,
    },
    location: {
        type:String,
        require:true,
    },
    did:{
        type:String,
        default:''
    },
    verKey:{
        type:String,
        default:''
    },
    type:{
        type:String,
        default:'Organisation'
    },
    isActive:{
        type:Boolean,
        default:0
    },
    isDelete:{
        type:Boolean,
        default:0
    },
    createdDate:{
        type:Date,
        default:Date.now
    }
});

var Organisation = module.exports = mongoose.model('organisation',organisationSchema);

module.exports.get = function(callback,limit){
    Organisation.find(callback).limit(limit);
}

