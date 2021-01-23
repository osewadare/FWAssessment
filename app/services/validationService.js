exports.mainValidationService = function validationService(field, condition, conditionValue, data) 
{
    let result;
    var fieldLevels = field.split(".");

    if(fieldLevels.length > 2)
         return "invalidField";

    var fieldValue = getNestedValue(data, fieldLevels);

    if(!fieldValue)
        return null;

    switch(condition)
    {
        case "eq":
            result = EqualtoValidator(fieldValue, conditionValue);
            break;
        case "neq":
            result = NotEqualtoValidator(fieldValue, conditionValue);
            break;
        case "gt":
            result = GreaterThanValidator(fieldValue, conditionValue);
            break;
        case "gte":
            result = GreaterThanOrEqualToValidator(fieldValue, conditionValue);
            break;
        case "contains":
            result = ContainsValidator(fieldValue, conditionValue);
            break;
    }
    var data = {
        validation: {
            error: (result == "failed") ? true : false,
            field: field,
            field_value: fieldValue,
            condition: condition,
            condition_value: conditionValue
        }
    }
    return data;
}


   
function getNestedValue(obj, fieldLevels) 
{
    return fieldLevels.reduce((obj, level) => obj && obj[level], obj)
}

function EqualtoValidator(fieldValue, conditionValue)
{
    if(fieldValue == conditionValue){
        return "success";
    }
    return "failed";

}

function NotEqualtoValidator(fieldValue, conditionValue)
{
    if(fieldValue != conditionValue){
        return "success";
    }
    return "failed";
}

function GreaterThanValidator(fieldValue, conditionValue){
    if(fieldValue > conditionValue){
        return "success";
    }
    return "failed";
}

function GreaterThanOrEqualToValidator(fieldValue, conditionValue)
{
    if(fieldValue >= conditionValue){
        return "success";
    }
    return "failed";
}

function ContainsValidator(fieldValue, conditionValue){

    if(fieldValue.includes(conditionValue)){
        return "success";
    }
    return "failed";
}