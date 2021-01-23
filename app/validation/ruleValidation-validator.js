const {check, validationResult, body} = require("express-validator");

const requestValidatorAPIModel = [
    check("rule.field", "rule.field is required.").not().isEmpty(),
    check("rule.field", "rule.field should be a string.").isString(),
    check("rule.condition", "rule.condition is required.").not().isEmpty(),
    check("rule.condition_value", "rule.condition_value is required.").not().isEmpty(),
]

const requestBodyValidator = function requestBodyValidator (req, res, next)
{
    var objectConstructor = ({}).constructor;
    var arrayConstructor = [].constructor;
    var stringConstructor = "".constructor;

    if (!req.body.rule)
    {
        var response = {
            message: "rule is required.",
            status: "error",
            data: null};
        return res.status(400).jsonp(response);  
    }

    if (req.body.rule.constructor != objectConstructor)
    {
        var response = {
            message: "rule should be an object.",
            status: "error",
            data: null          
        }; 
     return res.status(400).jsonp(response);  
    } 

    if (!req.body.data)
    {
        var response = {
            message: "data is required.",
            status: "error",
            data: null};
    return res.status(400).jsonp(response);  
    }
    
    if (req.body.data.constructor == objectConstructor || req.body.data.constructor == arrayConstructor || req.body.data.constructor == stringConstructor)
    {  
    } 
    else{
        var response = {
            message: "data should be a JSON object, array or string.",
            status: "error",
            data: null          
        }; 
     return res.status(400).jsonp(response);  

    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) 
    {
        const requestValidationErrors = errors.array().map(error => ({
                message: error.msg,
                status: "error",
                data: null
        }));      
      return res.status(400).jsonp(requestValidationErrors[0]);
    } 
    else 
    {
      next();
    }

}

exports.requestBodyValidator = requestBodyValidator;
exports.requestValidatorAPIModel = requestValidatorAPIModel;

