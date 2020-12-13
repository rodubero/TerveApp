import * as reportSrvcs from "../../services/reportingServices.js";

const reporting = async({render, session}) => {
    const user = await session.get('user');
    const reports = await reportSrvcs.todayReport(user.id);
    render('reporting.ejs', {errors:[], notifs: [], reguser: user, reports : reports});
  };

const morningReport = async({request, session, render}) => {

    const body = request.body();
    const paramet = await body.value;
    const date = await paramet.get('date');
    const sleepT = await paramet.get('sleepT');
    const sleepQ = await paramet.get('sleepQ');
    const mood = await paramet.get('mood');
    const user = await session.get('user');
    let error = [];
    let notif = [];

    const reportObj = await reportSrvcs.findReport(user.id, date, true);
    if (!reportObj.hasOwnProperty('id')){
        const report = {
            userId : user.id,
            date : date,
            sleepT : sleepT,
            sleepQ : sleepQ,
            genericM : mood
        }
        reportSrvcs.morningReport(report);
        notif.push('Morning report saved');

    } else {
        error.push('The date submitted was reported already')
    } 
    const reports = await reportSrvcs.todayReport(user.id);   
    render('reporting.ejs', {errors : error, notifs : notif, reguser : user, reports : reports});
};

const eveningReport = async({request, session, render}) => {
    const body = request.body();
    const paramet = await body.value;
    const date = await paramet.get('date');
    const sportsT = await paramet.get('sportsT');
    const studyT = await paramet.get('studyT');
    const eatingR = await paramet.get('eatingR');
    const mood = await paramet.get('mood');
    const user = await session.get('user');
    let error = [];
    let notif = [];

    const reportObj = await reportSrvcs.findReport(user.id, date, false);
    console.log(!reportObj.hasOwnProperty('id'));
    if (!reportObj.hasOwnProperty('id')){
        const report = {
            userId : user.id,
            date : date,
            sportsT : sportsT,
            studyT : studyT,
            eatingR : eatingR,
            genericM : mood
        }
        reportSrvcs.eveningReport(report);
        notif.push('Evening report saved');

    } else {
        error.push('The date submitted was reported already')
    } 
    const reports = await reportSrvcs.todayReport(user.id);  
    render('reporting.ejs', {errors : error, notifs : notif, reguser : user, reports : reports});
};

   
export { morningReport, eveningReport, reporting };
