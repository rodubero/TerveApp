import * as Srvcs from "../../services/generalServices.js";
import { bcrypt } from "../../deps.js";

const getHello = async({response}) => {
    response.body = { message: await Srvcs.getHello() };
};

const setHello = async({request, response}) => {
    const body = request.body({type: 'json'});
    const document = await body.value;
    Srvcs.setHello(document.message);
    response.status = 200;
};

   
export {getHello, setHello };