import captalizeFirstLetter from './captalizeFirstLetter';

export default function (nameFields, validations) {
    var message = {};

    for (let indexNameFields = 0; indexNameFields < nameFields.length; indexNameFields++) {
        // console.log(nameFields[indexNameFields]);
        
        if (Object.keys(message).length == 0) {
            var nameField = nameFields[indexNameFields];

            for (let indexValidations = 0; indexValidations < validations[nameField].rules.length; indexValidations++) {
                var validation = validations[nameField].rules[indexValidations];

                if (validation === "required") {
                    if ((!validations[nameField].value ||
                        validations[nameField].value.length === 0)) {

                        var ruleCaptalize = captalizeFirstLetter(validation);
                        var nameFieldCaptalize = captalizeFirstLetter(nameField);
                        var property = `message${ruleCaptalize}`;

                        message[`error${nameFieldCaptalize}`] = validations[nameField][property];
                        
                        return message;
                    }
                } else if (validation === "email") {
                    var expression = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    if (!expression.test(validations[nameField].value)) {
                        var ruleCaptalize = captalizeFirstLetter(validation);
                        var nameFieldCaptalize = captalizeFirstLetter(nameField);
                        
                        var property = `message${ruleCaptalize}`;
                        
                        message[`error${nameFieldCaptalize}`] = validations[nameField][property];
                        
                        return message;

                    }

                } else if (validation == "minLength") {
                    var value = validations[nameField].rules_value[validation];
                    
                    if(validations[nameField].value.length < value) {
                        var ruleCaptalize = captalizeFirstLetter(validation);
                        var nameFieldCaptalize = captalizeFirstLetter(nameField);
                        
                        var property = `message${ruleCaptalize}`;
                        
                        message[`error${nameFieldCaptalize}`] = validations[nameField][property];
                        
                        return message;
                    }
                    
                }
            }
        }
    }

    return message;
}

