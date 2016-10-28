/**
 * Created by Nesta on 24/10/2016.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model
var YoutubeChannelSchema = new Schema({
    channelId: {
        type: String,
        unique: true,
        required: true,
        index: true
    },
    title: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    categories: [String],
    thumbnails:  {
        "default": String,
        medium: String,
        high: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    LastUpdated: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('YoutubeChannel', YoutubeChannelSchema);