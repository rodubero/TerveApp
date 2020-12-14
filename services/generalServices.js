import { executeQuery } from "../database/database.js";
import * as sumSrvcs from "./summaryServices.js";

const findUsr = async(email) => {

  // check if the email exists in the database
  const res = await executeQuery("SELECT * FROM users WHERE email = $1;", email);
  if (res.rowCount === 0) {
    return "Not found";
  }
  const userObj = res.rowsOfObjects()[0];
  return userObj;
  
}

const createUsr = async(email, hash) => {

  // check if the email exists in the database

  await executeQuery("INSERT INTO users (email, password) VALUES ($1, $2);", email, hash);
  
}


const dataGlimpse = async(userId) => {
  const today = new Date().toISOString().slice(0, 10);
  const yesterday = new Date(Date.now() - 864e5);
  let todayMood = await sumSrvcs.findMood({from: today, to: today}, userId);
  let yesterdayMood = await sumSrvcs.findMood({from: yesterday, to: yesterday}, userId);
  if (!todayMood){
      todayMood = 0;
  }
  if (!yesterdayMood){
      yesterdayMood = 0;
  }
  let message = 'Hey! Things are looking gloomy today';
  if (Number(todayMood) < Number(yesterdayMood)){
      message = 'Well, maybe things are looking bright today :)';
  }
  const todayBar = "width:" + ((Number(todayMood)/5)*100).toFixed() + "%;";
  const yesterdayBar = "width:" +((Number(yesterdayMood)/5)*100).toFixed() + "%;";
  return {today: todayMood, yesterday : yesterdayMood, message: message, todayBar: todayBar, yesterdayBar: yesterdayBar};
}


export { findUsr, createUsr, dataGlimpse};