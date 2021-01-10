import * as summSrvcs from "../../services/summaryServices.js";

const summaryGeneral = async({response, session}) => {
    const user = await session.get('user');
    const today = new Date().toISOString().slice(0, 10);
    const aWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().slice(0,10);
    const fromDate=aWeekAgo.slice(5,7)+'-'+aWeekAgo.slice(-2)+'-'+aWeekAgo.slice(0,4);
    const toDate=today.slice(5,7)+'-'+today.slice(-2)+'-'+today.slice(0,4);
    const range = {      
        from: fromDate,
        to: toDate
    };
    const res = await summSrvcs.findDataBetweenDates(range, user.id);
    response.body = { from : fromDate, to : toDate, summary: res };
};

//TODO: toISOString gives time in UTC. Check how to adjutst it to local timezone

const dateParams = async({response}) => {

    const week= await summSrvcs.getWeek();
    const month= await summSrvcs.getMonth();
    const year= await summSrvcs.getYear();
    const dateVal = {
        week: String(week).padStart(2,'0'),
        month: String(month + 1).padStart(2,'0'),
        year: year
    };
    response.body  = {result :  dateVal};
    response.status = 200;
};

const summaryDate = async({request, params, response, session}) => {
    const user = await session.get('user');
    const datereq = await params.month +'-'+ await params.day + '-' + await params.year;
    const range = {      
        from: datereq,
        to: datereq
    };
    const res = await summSrvcs.findDataBetweenDates(range, user.id);
    response.body = { dateRequested: datereq, summary: res};
};

   
export {summaryDate, summaryGeneral, dateParams};