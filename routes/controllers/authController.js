import * as Srvcs from "../../services/generalServices.js";
import * as valSrvcs from "../../services/validationServices.js";
import { bcrypt} from "../../deps.js";

const authenticateUser = async({request, session, render}) => {

    const body = request.body();
    const paramet = await body.value;

    let error = [];
    let notif = [];

    const data = {
        email: await paramet.get('email'),
        password: await paramet.get('password')
    };

    error = error.concat(await valSrvcs.validateUser(data));

    if (error.length === 0) {
        const userObj = await Srvcs.findUsr(data.email);
        if (!userObj.hasOwnProperty('id')){
            error.push('User not found');
        } else {
            const hash = userObj.password;
            const passwordCorrect = await bcrypt.compare(data.password, hash);
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
    }      
    render('login.ejs', {errors : error, notifs : notif, user: {email: data.email}});
  };
  
export {authenticateUser}
