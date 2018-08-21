var User = require('../model/User')

//create FAKE DB records
var db = {
    lastUID : 0,
    users: [],
    getNewUID : function () {
        this.lastUID += 1;
        return this.lastUID;
    }
}

db.users.push(new User(db.getNewUID(), "Test 0", "test@test.test"));
db.users.push(new User(db.getNewUID(), "Test 1", "test@test.test"));
db.users.push(new User(db.getNewUID(), "Test 2", "test@test.test"));

module.exports = db;