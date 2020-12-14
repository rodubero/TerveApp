import * as Srvcs from "../../services/generalServices.js";

const home = async({render, session}) => {
  const user = await session.get('user');
  const dataG = await Srvcs.dataGlimpse(user.id);
  render('home.ejs', {reguser: user, today : dataG.today, yesterday : dataG.yesterday, message : dataG.message, todayBar: dataG.todayBar, yesterdayBar: dataG.yesterdayBar});
};
const index = async({render}) => {
  render('index.ejs');
};
const register = async({render}) => {
  render('register.ejs', {errors:[], notifs: [], user : {email:""}});
};


 
export { home,  index, register };