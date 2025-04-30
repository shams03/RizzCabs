const { uniqueID } = require("mocha/lib/utils");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minlength: [3,'First name must be at least 3 characters long'],
            maxlength: [50,'First name must be at most 50 characters long']
        },
        lastname: {
            type: String,
            minlength: [3,'Last name must be at least 3 characters long'],
            maxlength: [50,'Last name must be at most 50 characters long']
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: [5,'Email must be at least 5 characters long'],
        maxlength: [50,'Email must be at most 50 characters long']
    },
    password: {
        type: String,
        required: true,
        select: false, //to hide the password from the response
        minlength: [8,'Password must be at least 8 characters long'],
        maxlength: [100,'Password must be at most 100 characters long'] 
    },
    socketId: {
       type: String
    }
});

userSchema.methods.generateAuthToken =  function() {
    const user = this;
    const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET,{
        expiresIn:'24h'
    });
   
    return token;
}

userSchema.methods.comparePassword = async function(candidatePassword) {
    const user = this;
    const isMatch = await bcrypt.compare(candidatePassword, user.password);
    return isMatch;
}

userSchema.statics.hashPassword = async function(password) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
}

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;

