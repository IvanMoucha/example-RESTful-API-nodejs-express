var express = require('express');
var db = require('../db/db');
var validator = require('validator');
var User = require('../model/User');

var router = express.Router();

function checkInput(user, res) {
    if (!validator.isAscii(user.name)) {
        console.log("Bad name: " + user.name)
        res.status(400).send();
        return false;
    }

    if (!validator.isEmail(user.email)) {
        console.log("Bad email: " + user.email)
        res.status(400).send();
        return false;
    }

    return true;
}

/* GET users */
router.get('/', function(req, res, next) {
  res.json(db.users);
});

/* GET user */
router.get('/:uid', function(req, res, next) {
    var uid = req.params.uid;

    db.users.forEach(function(part, index, arr) {
        if (part.uid == uid) {
            res.json(part);
            return;
        }
    });
});

/* Create new user */
router.post('/', function(req, res, next) {
    var user = req.body;

    if (!checkInput(user, res)) {
        return;
    }

    db.users.push(new User(db.getNewUID(), user.name, user.email));

    res.status(204).send()
});

router.put('/:uid', function(req, res, next) {
    var uid = req.params.uid;
    var user = req.body;

    if (!checkInput(user, res)) {
        return;
    }

    db.users.forEach(function(part, index, arr) {
        if (part.uid == uid) {
            arr[index] = new User(uid, user.name, user.email)
        }
    });

    res.status(204).send()
});

router.delete('/:uid', function(req, res, next) {
    var uid = req.params.uid;

    db.users.forEach(function(part, index, arr) {
        if (part.uid == uid) {
            arr.splice(index, 1);
        }
    });

    res.status(204).send()
});

module.exports = router;