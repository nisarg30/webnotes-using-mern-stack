var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const userSchema = new Schema({
	
	email: String,
	username: String,
	password: String,
    notes : [{
        _id : false,
        id : String,
        catagory : String,
        title : String,
        datetime : String,
        content : String
    }]
},{ collection: 'user'});

User = mongoose.model('Users', userSchema);

module.exports = User;