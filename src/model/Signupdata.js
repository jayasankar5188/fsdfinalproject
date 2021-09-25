const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/Cinefacts');
const Schema = mongoose.Schema;

var SignupSchema = new Schema({
    
    email: String,
    password: String,
    name: String,

});
var Signupdata = mongoose.model('signup', SignupSchema);
module.exports = Signupdata;
