import * as Srvcs from "../../services/generalServices.js";
import * as valSrvcs from "../../services/validationServices.js";
import { bcrypt, isEmail, required, minLength, validate } from "../../deps.js";

const login = async({render}) => {
    render('login.ejs', {errors:[], notifs: [], user: {email:""}});
};

const logout = async ({response, session}) => {
    await session.set('authenticated', null);
    await session.set('user', null);
    response.redirect('/');
}

const postRegistration = async({request, render}) => {
    const body = request.body();
    const paramet = await body.value;

    const data = {
        email: await paramet.get('email'),
        password: await paramet.get('password'),
        verification: await paramet.get('passwordV')
    };

    let error = [];
    let notif = [];

    error = error.concat(await valSrvcs.validateUser(data));

    if (data.password !== data.verification) {
        error.push('The entered passwords did not match')
    } 
    const userObj = await Srvcs.findUsr(data.email);
    if (userObj.hasOwnProperty('id')) {
        error.push('The email is already reserved');
    }
    if (error.length === 0) {
        notif.push('Registration successful! Go to the login page to access your Terve account');
        const hash = await bcrypt.hash(data.password);
        Srvcs.createUsr(data.email, hash);
    }
    render('register.ejs', {errors : error, notifs : notif, user: {email: data.email}});
};

export {login, logout, postRegistration}