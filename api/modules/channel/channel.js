/**
 * Created by Nesta on 25/10/2016.
 */
var YoutubeChannel = require('../../models/youtubeChannel');
var Youtube = require('./youtube');

module.exports = {



    getChannels: function (userChannels, callback) {
        var channelId = [];
        var youtubeChannel = [];
        for (var key in userChannels) {
            if (userChannels[key].service == 'youtube')
                youtubeChannel.push(userChannels[key].id)
        }

        Youtube.getChannels(youtubeChannel, function (data) {
            callback(data)
        })
    },
    saveYoutubeChannels: function (channels, callback) {
        Youtube.saveChannels(channels, function(channelsId){
            console.log(channelsId)
            callback(channelsId);
        })
    },
}