const mockDataService = require("../services/mockDataService");

exports.generateMockData  = (req, res) =>
{
    var data = mockDataService.generateMockData();
    var response = 
    {
        message: "My Rule-Validation API",
        status: "success",
        data: data
    }
    return res.send(response);
}
