/*
*Author: blackkite0206233
*Description: This file is the API of announcementdisplay.
*/
var express = require('express');
var RedisRepository = require('../Kesshou/Repositories/RedisRepository');
var router = express.Router();

router.get('/announce', function(req, res, next) {

});

router.post('/announce', function(req, res, next) {
    var newAnnounce = req.body;

});

router.put('/announce', function(req, res, next) {
    var updateAnnounce = req.body;

});

router.delete('/announce', function(req, res, next) {
    var deleteAnnounce = req.body;

});

module.exports = router;