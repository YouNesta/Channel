/**
 * Created by Nesta on 24/10/2016.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

// set up a mongoose model
var UserSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        index: true
    },
    pseudo: {
        type: String,
        unique: true,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        unique: true,
        required: false
    },
    password: {
        type: String,
        required: true
    },
    services: [{
        serviceName: String,
        profile: {},
        token: {}
    }],
    channels:[{
        id: String,
        categories: [String],
        service: String
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    LastUpdated: {
        type: Date,
        default: Date.now
    }
});

UserSchema.pre('save', function (next) {
    var user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});

UserSchema.methods.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('User', UserSchema);