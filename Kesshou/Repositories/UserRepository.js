/*
*Author: blackkite0206233,yoyo930021
*Description: This file is used to control the user's data.
*/
var Promise = require('bluebird');
var models  = Promise.promisifyAll(require('../../models'));

var GroupRepository = require('./GroupRepository');

/*
*Author: blackkite0206233,yoyo930021
*Description:
    This function is used to get the use's password.  Used promise.
*Usage:
    account: user's account(email).
    return:
        resolve: user's password.
        reject: "帳號有誤".
*/
var getUserPassword = function(account) {
    return new Promise(function(resolve, reject) {
        models.Account.findOne({ where: {email: account} }).then(function(result){
            if(result) {
                resolve(result.get("pwd"));
            } else {
                reject("帳號有誤");
            }
        }).catch(function(error) {
            console.log(error);
            reject("帳號有誤");
        });
    });
}

/*
*Author: blackkite0206233
*Description:
    This function is used to get the use's data via user's id.  Used promise.
*Usage:
    id: user's id.
    return:
        resolve: user's data.
        reject: the reason of error.
*/
var getUserById = function(id) {
    return new Promise(function(resolve, reject) {
        models.Account.findOne({ where: {id: id} }).then(function(result) {
            resolve(result.get());
        }).catch(function(error) {
            reject(error);
        });
    });
}

/*
*Author: blackkite0206233,yoyo930021
*Description:
    This function is used to check if database has the same nick.  Used promise.
*Usage:
    nick: user's nick.
    oldNick: if it didn't has oldNick, it is "".
    return:
        resolve: Nan.
        reject: "暱稱已被使用".
*/
var checkSameNick = function(nick, oldNick) {
    return new Promise(function(resolve, reject) {
        if(nick == oldNick && oldNick != "")
            resolve();
        models.Account.findOne({ where: {nick: nick} }).then(function(result) {
            if(result) {
                reject("暱稱已被使用");
            } else {
                resolve();
            }
        }).catch(function(error) {
            resolve();
        });
    });
}

/*
*Author: blackkite0206233,yoyo930021
*Description:
    This function is used to create a new user.  Used promise.
*Usage:
    email: user's email(account).
    password: user's password.
    userGroup: user's status(student or graduated or outside).
    schoolAccount: user's school account(optional).
    schoolPwd: user's school password(optional).
    nick: user's nick.
    return:
        reject: the reason of error.
*/
var createUser = function (email, password, userGroup, schoolAccount, schoolPwd, nick, name, userClass, finishYear) {
    return new Promise(function(resolve, reject) {
        GroupRepository.getGroupID(userGroup).then(function(group){
            var NewAccount = {
                email: email,
                pwd: password,
                group_id: group,
                school_account: schoolAccount,
                school_pwd: schoolPwd,
                nick: nick,
                name: name,
                class: userClass,
                finish_year: finishYear
            };
            models.Account.create(NewAccount).then(function(account) {
                resolve();
            }).catch(function(error) {
                console.log(error);
                reject(error);
            });
        }).catch(function(error) {
            console.log(error);
            reject(error);
        });
    });
}

/*
*Author: blackkite0206233,yoyo930021
*Description:
    This function is used to update user's info.  Used promise.
*Usage:
    account: user's old account.
    newSchoolPwd: user's new school password(optional).
    newNick: user's new nick.
    newPassword: user's new password.
    newEmail: user's new email.
    newName: user's new name.
    return:
        reject: the reason of error.
*/
var updateUserInfo = function (account, newSchoolPwd, newNick, newPassword, newEmail, newName) {
    return new Promise(function(resolve, reject){
        models.Account.findOne({ where: {email: account} }).then(function(result){
            return result.update({school_pwd: newSchoolPwd, nick: newNick, pwd: newPassword, email: newEmail, name: newName});
        }).then(function(result){
            resolve();
        }).catch(function(error){
            console.log(error);
            reject(error);
        });
    });

}

/*
*Author: blackkite0206233,yoyo930021
*Description:
    This function is used to get user's information.  Used promise.
*Usage:
    account: user's account.
    return:
        resolve: user's infomation.
        reject: error.
*/
var getUserInfo = function (account) {
    return new Promise(function(resolve, reject) {
        models.Account.findOne({ where: {email: account} }).then(function(result) {
            resolve(result.get());
        }).catch(function(error) {
            reject(error);
        });
    });

}

/*
*Author: yoyo930021
*Description:
    This function is used to set user's noti.  Used promise.
*Usage:
    account: user's account.
    fcm_noti: fcm's token.
    is_noti: is want noti? 
    return:
        reject: error.
*/
var setNoti = function (account,fcm_token,is_noti) {
    return new Promise(function (resolve, reject) {
        models.Account.findOne({where: {email: account}}).then(function (result) {
            return result.update({fcm_token: fcm_token, is_noti: is_noti});
        }).then(function (result) {
            resolve();
        }).catch(function (error) {
            console.log(error);
            reject(error);
        });
    });
}


module.exports = {

    getUserPassword: getUserPassword,

    getUserById: getUserById,

    checkSameNick: checkSameNick,

    createUser: createUser,

    updateUserInfo: updateUserInfo,

    getUserInfo: getUserInfo,

    setNoti: setNoti
};
