import * as reportSrvcs from "../../services/reportingServices.js";
import * as valSrvcs from "../../services/validationServices.js";

const reporting = async({render, session}) => {
    const user = await session.get('user');
    const reports = await reportSrvcs.todayReport(user.id);
    const data = {morning : await reportSrvcs.getBlankMorning(), evening : await reportSrvcs.getBlankEvening()};
    render('reporting.ejs', {errors:[], notifs: [], reguser: user, reports : reports, data : data});
};

const morningReport = async({request, session, render}) => {

    const body = request.body();
    const paramet = await body.value;
    const user = await session.get('user');
    let error = [];
    let notif = [];

    const report = {
        userId : user.id,
        date : await paramet.get('dateM'),
        sleepDuration : Number(await paramet.get('sleepT')),
        sleepQuality : Number(await paramet.get('sleepQ')),
        mood : Number(await paramet.get('moodM'))
    }

    let data = {morning : report, evening : await reportSrvcs.getBlankEvening()};

    const reportObj = await reportSrvcs.findReport(report.userId, report.date, true);
    if (reportObj.hasOwnProperty('id')){
        error.push('The date submitted was reported already');
    }

    error = error.concat(await valSrvcs.validateMorning(report));

    if (!reportObj.hasOwnProperty('id') && error.length === 0){
        await reportSrvcs.morningReport(report);
        notif.push('Morning report saved');
        data.morning= await reportSrvcs.getBlankMorning();
    }

    const reports = await reportSrvcs.todayReport(user.id);   
    render('reporting.ejs', {errors : error, notifs : notif, reguser : user, reports : reports, data : data});
};

const eveningReport = async({request, session, render}) => {

    const body = request.body();
    const paramet = await body.value;
    const user = await session.get('user');

    let error = [];
    let notif = [];

    const report = {
        userId : user.id,
        date : await paramet.get('dateE'),
        sportsTime : Number(await paramet.get('sportsT')),
        studyingTime : Number(await paramet.get('studyQ')),
        eatingRegularity : Number(await paramet.get('eatingR')),
        mood : Number(await paramet.get('moodE'))
    }

    let data = {morning : await reportSrvcs.getBlankMorning(), evening : report};

    const reportObj = await reportSrvcs.findReport(report.userId, report.date, false);
    if (reportObj.hasOwnProperty('id')){
        error.push('The date submitted was reported already');
    }

    error = error.concat(await valSrvcs.validateEvening(report));

    if (!reportObj.hasOwnProperty('id') && error.length === 0){
        await reportSrvcs.eveningReport(report);
        notif.push('Evening report saved');
        data.evening= await reportSrvcs.getBlankEvening();
    } 

    const reports = await reportSrvcs.todayReport(user.id);  
    render('reporting.ejs', {errors : error, notifs : notif, reguser : user, reports : reports, data : data});
};

   
export { morningReport, eveningReport, reporting };
