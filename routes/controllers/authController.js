import * as Srvcs from "../../services/generalServices.js";
import { bcrypt } from "../../deps.js";

const login = async({render}) => {
    render('login.ejs', {errors:[], notifs: []});
};

const logout = async ({response, session, render}) => {
    await session.set('authenticated', null);
    await session.set('user', null);
    response.redirect('/');
}


const authenticateUser = async({request, session, render, response}) => {

    const body = request.body();
    const paramet = await body.value;

    const email = await paramet.get('email');
    const password = await paramet.get('password');

    let error = [];
    let notif = [];
  
    const userObj = await Srvcs.findUsr(email);
    if (!userObj.hasOwnProperty('id')){
        error.push('User not found');
    } else {
        const hash = userObj.password;
        const passwordCorrect = await bcrypt.compare(password, hash);
        if (!passwordCorrect) {
            error.push('Wrong password');
        } else {
            await session.set('authenticated', true);
            await session.set('user', {
                id: userObj.id,
                email: userObj.email
            });
            const reguser = await session.get('user');
            render('home.ejs', {reguser: reguser});
            return;
        }
    }   
    render('login.ejs', {errors : error, notifs : notif, user});
  };

const postRegistration = async({request, render}) => {
    const body = request.body();
    const params = await body.value;

    const email = params.get('email');
    const password = params.get('password');
    const verification = params.get('passwordV');

    let error = [];
    let notif = [];

    if (password !== verification) {
        error.push('The entered passwords did not match')
    } 
    const userObj = await Srvcs.findUsr(email);
    if (userObj.hasOwnProperty('id')) {
        error.push('The email is already reserved');
    }
    if (error.length === 0) {
        notif.push('Registration successful! Go to the login page to access your Terve account');
        const hash = await bcrypt.hash(password);
        Srvcs.createUsr(email, hash);
    }
    render('register.ejs', {errors : error, notifs : notif});
};

export {login, logout, authenticateUser, postRegistration}