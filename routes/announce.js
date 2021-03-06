/*
*Author: blackkite0206233
*Description: This file is the API of announcementdisplay.
*/
var express = require('express');
var RedisRepository = require('../Kesshou/Repositories/RedisRepository');
var AnnounceRepository = require('../Kesshou/Repositories/AnnounceRepository');
var UserRepository = require('../Kesshou/Repositories/UserRepository');

var ErrorCodeService = require('../Kesshou/Services/ErrorCodeService');

var router = express.Router();

/*
*Author: blackkite0206233
*Description:
    This function is the API which was used to return announcement.
*Usage:
    return:
        announce: the announcement which was found.
        error: the reason of error.
        code:
            400:server error.
*/
router.get('/:sort', function(req, res, next) {
    var announce;
    var sort =  req.params.sort;
    if(sort != "collect") {
        AnnounceRepository.getAnnouncement("sort", sort).then(function(result) {
            res.status(200).json(result);
        }).catch(function(error) {
            res.status(400).json(ErrorCodeService.serverError);
        });
    } else {
        // RedisRepository.getAccount(req.body.token).then(function(result) {
        //     return UserRepository.getUserInfo(result);
        // }).then(function(result) {
        //     return AnnounceRepository.getCollection(result);
        // }).then(function(result) {
        //     res.status(200).json({"announce" : result});
        // }).catch(function(error) {
        //     res.status(500).json({"error" : error});
        // });
    }
});

module.exports = router;
