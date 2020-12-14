import { isEmail, required, minLength, validate, isDate, numberBetween, isNumber } from "../deps.js";

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

const validateMorning =async (data) =>{

    let result = [];

    const validationRules = {
        date: [required, isDate],
        sleepDuration: [required, isNumber, numberBetween(0,24)],
        sleepQuality: [required, isNumber, numberBetween(0,5)],
        mood: [required, isNumber, numberBetween(0,5)]
    };
    const [passes, errors] = await validate(data, validationRules);
    if (!passes) {
        result = result.concat(await handleErrors(errors, 'date'));
        result = result.concat(await handleErrors(errors, 'sleepDuration'));
        result = result.concat(await handleErrors(errors, 'sleepQuality'));
        result = result.concat(await handleErrors(errors, 'mood'));
    }
    return result;
}

const validateEvening =async (data) =>{

    let result = [];

    const validationRules = {
        date: [required, isDate],
        sportsTime: [required, isNumber, numberBetween(0,24)],
        studyingTime: [required, isNumber, numberBetween(0,24)],
        eatingRegularity: [required, isNumber, numberBetween(0,5)],
        Mood: [required, isNumber, numberBetween(0,5)]
    };
    const [passes, errors] = await validate(data, validationRules);
    if (!passes) {
        result = result.concat(await handleErrors(errors, 'date'));
        result = result.concat(await handleErrors(errors, 'sportsTime'));
        result = result.concat(await handleErrors(errors, 'studyingTime'));
        result = result.concat(await handleErrors(errors, 'eatingRegularity'));
        result = result.concat(await handleErrors(errors, 'mood'));
    }
    return result;
}

export {handleErrors, validateUser, validateMorning, validateEvening}

