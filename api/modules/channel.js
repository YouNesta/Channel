/**
 * Created by Nesta on 25/10/2016.
 */
var YoutubeChannel = require('../models/youtubeChannel');

module.exports = {

    saveYoutubeChannels: function (channels, callback) {

        Array.prototype.unique = function () {
            var a = this.concat();
            for (var i = 0; i < a.length; ++i) {
                for (var j = i + 1; j < a.length; ++j) {
                    if (a[i] === a[j])
                        a.splice(j--, 1);
                }
            }

            return a;
        };

        var channelsId = [];
        saveOne(channels);
        function saveOne(channels) {
            if (channels.length > 0) {
                YoutubeChannel.findOne({
                    channelId: channels[0].channelId
                }, function (err, newChannel) {
                    if (err) throw err;
                    if (!newChannel) {
                        var newChannel = new YoutubeChannel({
                            channelId: channels[0].channelId,
                            url: 'https://www.youtube.com/channel/'+channels[0].channelId,
                            title: channels[0].title,
                            description: channels[0].description,
                            categories: [],
                            thumbnails: {
                                "default": channels[0].thumbnails.default,
                                medium: channels[0].thumbnails.medium,
                                high: channels[0].thumbnails.high,
                            }
                        });
                    } else {
                        newChannel.channelId = channels[0].channelId;
                        newChannel.url = 'https://www.youtube.com/channel/'+channels[0].channelId;
                        newChannel.title = channels[0].title;
                        newChannel.description = channels[0].description;
                        channels[0].categories.length > 0 ? newChannel.categories = channels[0].categories : newChannel.categories = newChannel.categories.concat(channels[0].categories).unique()
                        newChannel.thumbnails.default = channels[0].thumbnails.default;
                        newChannel.thumbnails.medium = channels[0].thumbnails.medium;
                        newChannel.thumbnails.high = channels[0].thumbnails.high;
                    }
                    newChannel.save(function (err) {
                        if (err) {
                            console.log(err)
                        }
                        YoutubeChannel.findOne({
                            channelId: newChannel.channelId
                        }, function (err, channel) {
                            if (err) throw err;

                            if (!channel) {
                                console.log('Error Channel not found after Save')
                            } else {
                                channelsId.push({
                                    id: newChannel._id,
                                    categories: [],
                                    service: 'youtube'
                                });
                                channels.shift();
                                saveOne(channels);
                            }
                        })

                    });

                });
            } else {
                callback(channelsId);
            }

        }
    },

    getChannels: function (userChannels, callback) {
        var channelId = [];

        for (var key in userChannels) {
            channelId.push(userChannels[key].id)
        }
        this.getYoutubeChannels(channelId, function (data) {
            callback(data)
        })
    },

    getYoutubeChannels: function (channelId, callback) {

        YoutubeChannel.find({_id: {$in: channelId}}, function (err, data) {
            if (err) {
                console.log(err)
            }

            callback(data)
        });
    }
}