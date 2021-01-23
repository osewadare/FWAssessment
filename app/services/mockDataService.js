const User = require("../models/User");

exports.generateMockData = () =>
{
    var user = new User("Dare Osewa", "@osewadare", "osewa.dare@gmail.com", "08160613889", "@darejosewa");
    return user;
}


