import * as reportSrvcs from "../../services/reportingServices.js";
import * as sumSrvcs from "../../services/summaryServices.js";

const summary = async({render, session}) => {
    const user = await session.get('user');
    const reports = await reportSrvcs.todayReport(user.id);
    console.log( sumSrvcs.getLastWeekRange(50,2020));
    render('summary.ejs', {errors:[], notifs: [], reguser: user, reports : reports});
};

export {summary}
