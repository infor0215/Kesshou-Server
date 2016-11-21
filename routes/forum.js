/*
*Author: blackkite0206233
*Description: This file is the API of forum.
*/
var express = require('express');
var ForumlistRepository = require('../Kesshou/Repositories/ForumlistRepository');
var ForumarticleRepository = require('../Kesshou/Repositories/ForumarticleRepository');
var ForumresponseRepository = require('../Kesshou/Repositories/ForumresponseRepository');
var RedisRepository = require('../Kesshou/Repositories/RedisRepository');

var CheckCharactersService = require('../Kesshou/Services/CheckCharactersService');
var ErrorCodeService = require('../Kesshou/Services/ErrorCodeService');
var ImgurService = require('../Kesshou/Services/ImgurService');

var router = express.Router();

/*
*Author: blackkite0206233
*Description:
    This function is the API which was used to return forum list.
*Usage:
    return:
        status code:
            200: get forum list successfully.
            406: inputs have some illegal chars.
            400: server error.
        forumlist: forum list.
        error: it is a string to explain the reason of error.
        code:
            300: inputs have some illegal chars.
            400: server error.
*/
router.post('/getList', function(req, res, next) {
    var search = (req.body.search != undefined) ? req.body.search : "";
    if(search) {
        ForumlistRepository.searchForumlist(search).then(function(result) {
            res.status(200).json(result);
        }).catch(function(error) {
            res.status(400).json({"error" : "伺服器錯誤", "code" : ErrorCodeService.serverError});
        });
    } else {
        ForumlistRepository.getForumlist().then(function(result) {
            res.status(200).json(result);
        }).catch(function(error) {
            res.status(400).json({"error" : "伺服器錯誤", "code" : ErrorCodeService.serverError});
        });
    }
});

/*
*Author: blackkite0206233
*Description:
    This function is the API which was used to return forum article.
*Usage:
    return:
        status code:
            200: get forum list successfully.
            406: inputs have some illegal chars.
            400: server error.
        forumartivle: forum article.
        error: it is a string to explain the reason of error.
        code:
            300: inputs have some illegal chars.
            400: server error.
*/
router.post('/getArticle', function(req, res, next) {
    var forumlistId = req.body.formlistId;
    var search = (req.body.search != undefined) ? req.body.search : "";
    if(search) {
        ForumarticleRepository.searchForumarticle(forumlistId, search).then(function(result) {
            res.status(200).json(result);
        }).catch(function(error) {
            res.status(400).json({"error" : "伺服器錯誤", "code" : ErrorCodeService.serverError});
        });
    } else {
        ForumarticleRepository.getForumarticle(forumlistId).then(function(result) {
            res.status(200).json(result);
        }).catch(function(error) {
            res.status(400).json({"error" : "伺服器錯誤", "code" : ErrorCodeService.serverError});
        });
    }
});

/*
*Author: blackkite0206233
*Description:
    This function is the API which was used to return forum article.
*Usage:
    return:
        status code:
            200: get forum list successfully.
            406: inputs have some illegal chars.
            400: server error.
        forumartivle: forum article.
        error: it is a string to explain the reason of error.
        code:
            300: inputs have some illegal chars.
            400: server error.
*/
router.post('/getResponse', function(req, res, next) {
    var articleId = req.body.articleId;
    ForumresponseRepository.getForumresponse(articleId).then(function(result) {
        res.status(200).json(result);
    }).catch(function(error) {
        res.status(400).json({"error" : "伺服器錯誤", "code" : ErrorCodeService.serverError});
    });
});

router.post('/list', function(req, res, next) {
    var name = req.body.name;
    ForumlistRepository.createForum(name).then(function(reault) {
        res.status(200).json({"status" : "新增成功"});
    }).catch(function(error) {
        res.status(400).json({"error" : "伺服器錯誤", "code" : ErrorCodeService.serverError});
    });
});

router.post('/article', function(req, res, next) {
    var article = req.body;
    var Article = {
        forum_id: article.forumID,
        title: article.title,
        content: article.comtent,
        hidden: 0,
    };

});

router.post('/response', function(req, res, next) {
    var response = req.body;
});

router.post('/addPicture', function(req, res, next) {
    var pic = req.body.picture;
    ImgurService.upload(pic).then(function(result) {
        res.status(200).json({"picture" : result});
    }).catch(function(error) {
        res.status(400).json({"error" : "伺服器錯誤", "code" : ErrorCodeService.serverError});
    });
});

module.exports = router;
