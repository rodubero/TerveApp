import { executeQuery } from "../database/database.js";

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

export { findUsr, createUsr };