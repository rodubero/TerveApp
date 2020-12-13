import { executeQuery } from "../database/database.js";

const findReport = async(userId, date, morning) => {
    let res = '';
    // check if the report already exists in the database 
    if (morning){
        res = await executeQuery("SELECT * FROM morning WHERE userId = $1 AND date = $2;", userId, date);
    } else {
        res= await executeQuery("SELECT * FROM evening WHERE userId = $1 AND date = $2;", userId, date);
    }

    if (res.rowCount === 0) {
      return "Not found";
    }
    const reportObj = res.rowsOfObjects()[0];
    return reportObj;
    
  }

const morningReport = async(report) => {
    await executeQuery("INSERT INTO morning (userId, date, sleepDuration, sleepQuality, genericMood) VALUES ($1, $2, $3, $4, $5);", report.userId, report.date, report.sleepT, report.sleepQ, report.genericM);
}
const eveningReport = async(report) => {
    await executeQuery("INSERT INTO evening (userId, date, sportsTime, exerciseTime, studyTime, eatingRegularity, eatingQuality, genericMood) VALUES ($1, $2, $3, $4, $5, $6, $7, $8);", report.userId, report.date, report.sportsT, report.exerciseT, report.studyT, report.eatingR, report.eatingQ, report.genericM);
}

const todayReport = async (id) => {
    const today = new Date().toISOString().slice(0, 10);
    let reports = {
        morning : false,
        evening : false,
        date : today
    }
    const todayMorning = await findReport(id,today,true);
    const todayEvening = await findReport(id,today,false);
    if (todayMorning.hasOwnProperty('id')){
        reports.morning = true;
    }
    if (todayEvening.hasOwnProperty('id')){
        reports.evening = true;
    }
    return reports;
}

export { findReport, morningReport, eveningReport, todayReport };