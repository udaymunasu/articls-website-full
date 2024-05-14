var mongoose = require("mongoose");

var UserSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    username: String,
    email: String,
    password: String,
    profileimage: {
        type: String,
        default: "https://vectorified.com/images/profile-image-icon-1.png"
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    roles: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "role"
    }
},
    {
        timestamps: true
    }
);


module.exports = mongoose.model('user', UserSchema);