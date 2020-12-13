import { isEmail, required, minLength, validate } from "../deps.js";

const handleErrors =async (errors, attribute) =>{
    let result = [];
    if (errors.hasOwnProperty(attribute) ){
        Object.values(errors[attribute]).forEach((err) => {
            result.push(err);
        });
    }
    return result;
}

const validateUser =async (data) =>{

    let result = [];

    const validationRules = {
        email: [required, isEmail],
        password: [required, minLength(4)],
    };
    const [passes, errors] = await validate(data, validationRules);
    if (!passes) {
        result = result.concat(await handleErrors(errors, 'email'));
        result = result.concat(await handleErrors(errors, 'password'));
    }
    return result;
}

export {handleErrors, validateUser}

