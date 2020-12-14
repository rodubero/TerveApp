import { executeQuery } from "../database/database.js";
import { weekOfYear } from "../deps.js";

const getWeek =async () =>{
    const today = new Date();
    const weekn = weekOfYear(today);
    return weekn;
}

//function from https://codepen.io/Venugopal46/pen/WrxdLY

Date.prototype.getWeek = function() {
    var date = new Date(this.getTime());
    date.setHours(0, 0, 0, 0);
    // Thursday in current week decides the year.
    date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
    // January 4 is always in week 1.
    var week1 = new Date(date.getFullYear(), 0, 4);
    // Adjust to Thursday in week 1 and count number of weeks from date to week1.
    return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
  }

function getWeekRange(weekNo, y){
    //last week
    var d1, numOfdaysPastSinceLastMonday, rangeIsFrom, rangeIsTo;
    d1 = new Date(''+y+'');
    numOfdaysPastSinceLastMonday = d1.getDay() - 1;
    d1.setDate(d1.getDate() - numOfdaysPastSinceLastMonday);
    d1.setDate(d1.getDate() + (7 * (weekNo - d1.getWeek())));
    rangeIsFrom = (d1.getMonth() + 1) + "-" + d1.getDate() + "-" + d1.getFullYear();
    d1.setDate(d1.getDate() + 6);
    rangeIsTo = (d1.getMonth() + 1) + "-" + d1.getDate() + "-" + d1.getFullYear() ;
    const range = { from: rangeIsFrom, to: rangeIsTo};
    return range;
};

const findDataBetweenDates = async(range, userId) => {
    // range is a JSON object like {from: $dateForm, to: $dateTo}

    //const year = new Date();
    //const range = getLastWeekRange(week, year.getFullYear())
    let res = {
        sleepD : 0,
        sportsT : 0,
        studyT : 0,
        sleepQ : 0,
        mood : 0
    }

    const sleepD = await executeQuery("SELECT AVG (sleepDuration) FROM morning WHERE (date BETWEEN $1 AND $2) AND userID = $3", range.from, range.to, userId);
    const sportsT = await executeQuery("SELECT AVG (sportsTime) FROM evening WHERE (date BETWEEN $1 AND $2) AND userID = $3", range.from, range.to, userId);
    const studyT = await executeQuery("SELECT AVG (studyTime) FROM evening WHERE (date BETWEEN $1 AND $2) AND userID = $3", range.from, range.to, userId); 
    const sleepQ = await executeQuery("SELECT AVG (sleepQuality) FROM morning WHERE (date BETWEEN $1 AND $2) AND userID = $3", range.from, range.to, userId);
    const moodM = await executeQuery("SELECT SUM (genericMood) FROM morning WHERE (date BETWEEN $1 AND $2) AND userID = $3", range.from, range.to, userId);
    const moodE = await executeQuery("SELECT SUM (genericMood) FROM evening WHERE (date BETWEEN $1 AND $2) AND userID = $3", range.from, range.to, userId);
    const moodMCount = await executeQuery("SELECT COUNT (genericMood) FROM morning WHERE (date BETWEEN $1 AND $2) AND userID = $3", range.from, range.to, userId);
    const moodECount = await executeQuery("SELECT COUNT (genericMood) FROM evening WHERE (date BETWEEN $1 AND $2) AND userID = $3", range.from, range.to, userId);
    const sumMood = Number(await moodM.rowsOfObjects()[0].sum) + Number(await moodE.rowsOfObjects()[0].sum);
    const divMood = Number(await moodMCount.rowsOfObjects()[0].count) + Number(await moodECount.rowsOfObjects()[0].count);
    res.mood = sumMood / divMood;
    res.sleepD = await sleepD.rowsOfObjects()[0].avg;
    res.sportsT = await sportsT.rowsOfObjects()[0].avg;
    res.studyT = await studyT.rowsOfObjects()[0].avg;
    res.sleepQ = await sleepQ.rowsOfObjects()[0].avg;

    return res;
}

const findMonthData = async(month, userId) => {

    let res = {
        sleepD : 0,
        sportsT : 0,
        studyT : 0,
        sleepQ : 0,
        mood : 0
    }

    const sleepD = await executeQuery("SELECT AVG (sleepDuration) FROM morning WHERE (MONTH (date) = $1) AND userID = $2", month, userId);
    const sportsT = await executeQuery("SELECT AVG (sportsTime) FROM evening WHERE (MONTH (date) = $1) AND userID = $2", month, userId);
    const studyT = await executeQuery("SELECT AVG (studyTime) FROM evening WHERE (MONTH (date) = $1) AND userID = $2", month, userId); 
    const sleepQ = await executeQuery("SELECT AVG (sleepQuality) FROM morning WHERE (MONTH (date) = $1) AND userID = $2", month, userId);
    const moodM = await executeQuery("SELECT SUM (genericMood) FROM morning WHERE (MONTH (date) = $1) AND userID = $2", month, userId);
    const moodE = await executeQuery("SELECT SUM (genericMood) FROM evening WHERE (MONTH (date) = $1) AND userID = $2", month, userId);
    const moodMCount = await executeQuery("SELECT COUNT (genericMood) FROM morning WHERE (MONTH (date) = $1) AND userID = $2", month, userId);
    const moodECount = await executeQuery("SELECT COUNT (genericMood) FROM evening WHERE (MONTH (date) = $1) AND userID = $2", month, userId);
    const sumMood = Number(await moodM.rowsOfObjects()[0].sum) + Number(await moodE.rowsOfObjects()[0].sum);
    const divMood = Number(await moodMCount.rowsOfObjects()[0].count) + Number(await moodECount.rowsOfObjects()[0].count);
    res.mood = sumMood / divMood;
    res.sleepD = await sleepD.rowsOfObjects()[0].avg;
    res.sportsT = await sportsT.rowsOfObjects()[0].avg;
    res.studyT = await studyT.rowsOfObjects()[0].avg;
    res.sleepQ = await sleepQ.rowsOfObjects()[0].avg;

    return res;
}




export {getWeek, getWeekRange, findDataBetweenDates, findMonthData}