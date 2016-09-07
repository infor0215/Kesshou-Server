/*
*Author: blackkite0206233
*Description: This file is used to control the announcement data.
*/
var Promise = require('bluebird');
var models  = Promise.promisifyAll(require('../../models'));

/*
*Author: blackkite0206233
*Description:
    This function is used to return the announcement found by specific field and value.
*Usage:
    field: the field which you want to designate.
    value: the value which you hope the field's value is match
    return:
        news: the ammounce which was found.
*/
var getAnnouncement = function(field, value) {
    return new Promise(function(reslove, reject) {
        var whereObj = {};
        whereObj[field] = value;
        models.News.findAll({ where: whereObj }).then(function(result) {
            var announce = result;
            var promises = [];
            for(var i = 0; i < announce.length; i++) {
                promises.push(getAnnouncementFile(announce[i]));
            }
            Promise.all(promises).then(function(result) {
                resolve(announce);
            })
            // Promise.map(announce, function(announce, index) {
            //     return getAnnouncementFile(announce);
            // }).then(function(result) {
            //
            // });
            //var news = result;
            /*for (var i=0; i < news.length; i ++) {
                models.News_file.findAll({ where: {news_key: news[i].key} })
                .then(function(result) {
                    news.file = result;
                });
            }
            */
            // Promise.each(getAnnouncementFile(result))
            //     .then(function(result) {
            //         reslove(result);
            //     });
        })
    });
}

var getAnnouncementFile = function(news) {
    return new Promise(function(reslove, reject) {
        models.News_file.findAll({ where: {news_key: news.key} }).then(function(result) {
            news.file = result;
            resolve();
        }).catch(function(error) {
            news.file = "";
            resolve();
        });
    });
}

/*
*Author: blackkite0206233
*Description:
    This function is used to return the announcement collected by user.
*Usage:
    user: the user's id.
    return:
        news: the ammounce which was found.
*/
var getCollection = function(user) {
    return new Promise(function(reslove, reject) {
        models.News_collection.findOne({ where: {user_id: user} }).then(function(result) {
            var newsID = result.split(",");
            var news = new Array();
            var promises = [];
            for(i = 0; i < newsID.length; i ++) {
                promises.push(This.getAnnouncement("news_id", newsID[i]).then(function(result) {
                    news[i] = result;
                }));
            }
            Promise.all(promises).then(function() {
                resolve(news);
            }).catch(function(error) {
                reject(error);
            })
        });
    });
}

module.exports = {

    getAnnouncement: getAnnouncement,

    getCollection: getCollection
};
