import * as reportSrvcs from "../../services/reportingServices.js";
import * as sumSrvcs from "../../services/summaryServices.js";

const summary = async({render, session}) => {
    const user = await session.get('user');
    const reports = await reportSrvcs.todayReport(user.id);
    render('summary.ejs', {errors:[], notifs: [], reguser: user, reports : reports});
};

const getDataDates = async({session, params, response}) => {
    const user = await session.get('user');
    const dates = sumSrvcs.getWeekRange(params.week, 2020);
    const result = await sumSrvcs.findDataBetweenDates(dates, user.id);
    response.body = {result : result};
    response.code=200;
};


export {summary, getDataDates}
