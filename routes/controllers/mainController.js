const home = async({render, session}) => {
  const reguser = await session.get('user');
  render('home.ejs', {reguser: reguser});
};
const index = async({render}) => {
  render('index.ejs');
};
const register = async({render}) => {
  render('register.ejs', {errors:[], notifs: [], user : {email:""}});
};


 
export { home,  index, register };