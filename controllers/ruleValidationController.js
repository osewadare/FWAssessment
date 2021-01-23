const {mainValidationService} = require("../services/validationService");


const ruleValidator = function ruleValidator(req, res)
{
    var field = req.body.rule.field;
    var condition = req.body.rule.condition;
    var conditionValue = req.body.rule.condition_value;
    var data = req.body.data

    var result = mainValidationService(field, condition, conditionValue, data);

    if(result == "invalidField")
    {
        var response = {
            message: `field greater than 2 levels.`,
            status: "error",
            data: null
        };
        return res.status(400).jsonp(response);
    }

    if(result == null)
    {
        var response = {
            message: `field ${field} is missing from data.`,
            status: "error",
            data: null
        };
        return res.status(400).jsonp(response);
    }

    var status = (result.validation.error) ? "error" : "success" ;
    var message = (result.validation.error)  ? `field ${field} failed validation.` : `field ${field} successfully validated.` 

    var response = {
        message: message,
        status: status,
        data: result
    };

    return res.send(response);
}

exports.ruleValidator = ruleValidator;