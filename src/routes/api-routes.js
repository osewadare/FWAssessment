const {requestValidatorAPIModel, requestBodyValidator} = require("../validation/ruleValidation-validator");
const express = require("express");


//controllers
const {generateMockData}  = require("../controllers/homeController");
const {ruleValidator}  = require("../controllers/ruleValidationController");

var jsonParser = express.json()



module.exports = function(app)
{
    app.get("/",  generateMockData);
    app.post("/validate-rule", jsonParser, requestValidatorAPIModel, requestBodyValidator, ruleValidator)
}
