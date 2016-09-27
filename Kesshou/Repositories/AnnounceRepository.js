/*
*Author: blackkite0206233
*Description: This file is used to control the announcement data.
*/
var Promise = require('bluebird');
var models  = Promise.promisifyAll(require('../../models'));

/*
*Author: blackkite0206233
*Description:
    This function is used to return the announcement found by specific field and value.  Used promise.
*Usage:
    field: the field which you want to designate.
    value: the value which you hope the field's value is match
    return:
        resolve(if execute successfully): the announce which was found.
        reject(if execute failed): the error message.
*/
var getAnnouncement = function(field, value) {
    return new Promise(function(resolve, reject) {
        var whereObj = {};
        whereObj[field] = value;
        models.News.findAll({ where: whereObj }).then(function(result) {
            var announce = [];
            var promises = [];
            if (announce) {
                for(var i = 0; i < result.length; i++) {
                    announce.push(result[i].get());
                    promises.push(getAnnouncementFile(announce[i]));
                }
                Promise.all(promises).then(function(result) {
                    console.log(announce);
                    resolve(announce);
                });
            } else {
                resolve("don't have announce");
            }
        }).catch(function(error) {
            reject(error);
        });
    });
}

/*
*Author: blackkite0206233
*Description:
    This function is used to add the announcement's files or images found by announcement's id
        to the announcement object.  Used promise.
*Usage:
    news: the announcement's id.
    return:
        resolve(if execute successfully):
*/
var getAnnouncementFile = function(news) {
    return new Promise(function(resolve, reject) {
        models.News_file.findAll({ where: {news_key: news.id} }).then(function(result) {
            for(var i = 0; i < result.length; i++) {
                news.file = result[i].get();
            }
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
    This is the function in the future.
    This function is used to return the announcement collected by user.  Used promise.
*Usage:
    user: the user's id.
    return:
        news: the ammounce which was found.
*/
// var getCollection = function(user) {
//     return new Promise(function(resolve, reject) {
//         models.News_collection.findOne({ where: {user_id: user} }).then(function(result) {
//             var newsID = result.get("news_id").split(",");
//             var news = new Array();
//             var promises = [];
//             if(newsID) {
//                 for(i = 0; i < newsID.length; i ++) {
//                     promises.push(This.getAnnouncement("news_id", newsID[i]).then(function(result) {
//                         news[i] = result;
//                     }));
//                 }
//                 Promise.all(promises).then(function() {
//                     resolve(news);
//                 });
//             } else {
//                 resolve("don't have any collection");
//             }
//         }).catch(function(error) {
//             reject(error);
//         });
//     });
// }

module.exports = {

    getAnnouncement: getAnnouncement,

    //getCollection: getCollection
};