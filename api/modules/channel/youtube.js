/**
 * Created by Nesta on 28/10/2016.
 */
var YoutubeChannel = require('../../models/youtubeChannel');

module.exports = {
    saveChannels: function (channels, callback) {
        var channelsId = [];
        var tus = this;
        saveMany(channels)
        function saveMany(channels) {
            tus.saveChannel(channels[0], function(channel) {
                channelsId.push({
                    id : channel._id,
                    categories: [],
                    service: 'youtube'
                });
                channels.shift();
                if (channels.length > 0) {
                    saveMany(channels)
                }else {
                    callback(channelsId);
                }
            });
        }

    },
    saveChannel: function(channel, callback){
        YoutubeChannel.findOne({
            channelId: channel.channelId
        }, function (err, newChannel) {
            if (err) throw err;
            if (!newChannel) {
                var newChannel = new YoutubeChannel({
                    channelId: channel.channelId,
                    url: 'https://www.youtube.com/channel/'+channel.channelId,
                    title: channel.title,
                    description: channel.description,
                    categories: [],
                    thumbnails: {
                        "default": channel.thumbnails.default,
                        medium: channel.thumbnails.medium,
                        high: channel.thumbnails.high,
                    }
                });
            } else {
                newChannel.channelId = channel.channelId;
                newChannel.url = 'https://www.youtube.com/channel/'+channel.channelId;
                newChannel.title = channel.title;
                newChannel.description = channel.description;
                channel.categories.length > 0 ? newChannel.categories = channel.categories : newChannel.categories = newChannel.categories.concat(channel.categories)
                newChannel.thumbnails.default = channel.thumbnails.default;
                newChannel.thumbnails.medium = channel.thumbnails.medium;
                newChannel.thumbnails.high = channel.thumbnails.high;
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
                        callback(channel);
                    }
                })

            });

        });

    },

    getChannels: function (channelId, callback) {
        console.log(channelId)
        YoutubeChannel.find({_id: {$in: channelId}}, function (err, data) {
            if (err) {
                console.log(err)
            }
            console.log(data)
            callback(data)
        });
    },
    getSubscription: function(access_token, callback){
        var header = {
            'Authorization': 'Bearer '+access_token
        };
        var options = {
            url: 'https://www.googleapis.com/youtube/v3/subscriptions?part=snippet&maxResult=50&mine=true',
            headers: header
        };

        request.get(options, function(error, response, subscriptionBody) {
            var subscriptionBody = JSON.parse(subscriptionBody);
            var items = [];

            for(var key in subscriptionBody.items){
                items.push({
                    channelId: subscriptionBody.items[key].snippet.resourceId.channelId,
                    title: subscriptionBody.items[key].snippet.title,
                    description: subscriptionBody.items[key].snippet.description,
                    categories: [],
                    thumbnails: {
                        "default": subscriptionBody.items[key].snippet.thumbnails.default.url,
                        medium: subscriptionBody.items[key].snippet.thumbnails.medium.url,
                        high: subscriptionBody.items[key].snippet.thumbnails.high.url
                    }
                })
            }

            getNext(items, subscriptionBody.nextPageToken)


        });

        function getNext(items, nextPageToken){
            console.log(nextPageToken);
            var options = {
                url: 'https://www.googleapis.com/youtube/v3/subscriptions?part=snippet&mine=true&maxResults=50&pageToken='+nextPageToken,
                headers: header
            };

            request.get(options, function(error, response, subscriptionBody) {
                var subscriptionBody = JSON.parse(subscriptionBody);

                for (var key in subscriptionBody.items) {
                    items.push({
                        channelId: subscriptionBody.items[key].snippet.resourceId.channelId,
                        title: subscriptionBody.items[key].snippet.title,
                        description: subscriptionBody.items[key].snippet.description,
                        categories: [],
                        thumbnails: {
                            "default": subscriptionBody.items[key].snippet.thumbnails.default.url,
                            medium: subscriptionBody.items[key].snippet.thumbnails.medium.url,
                            high: subscriptionBody.items[key].snippet.thumbnails.high.url
                        }
                    })
                }

                if(subscriptionBody.nextPageToken){
                    getNext(items, subscriptionBody.nextPageToken)
                }else{
                    callback(items);
                }
            })
        }
    }

};
