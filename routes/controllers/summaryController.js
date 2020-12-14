import * as sumSrvcs from "../../services/summaryServices.js";

const summary = async({render, session}) => {
    const user = await session.get('user');
    const weekn = await sumSrvcs.getWeek() - 1;
    const monthn = await sumSrvcs.getMonth() - 1;
    const yearn = await sumSrvcs.getYear();
    console.log(yearn);
    const dates = sumSrvcs.getWeekRange(weekn, yearn);
    const weekData = await sumSrvcs.findDataBetweenDates(dates, user.id);
    const monthData = await sumSrvcs.findMonthData(monthn, user.id);
    render('summary.ejs', {reguser: user, week : weekData, month: monthData, week : weekn, month : monthn });
};

const getDataDates = async({session, params, response}) => {
    const user = await session.get('user');
    const dates = sumSrvcs.getWeekRange(params.week, 2020);
    const result = await sumSrvcs.findDataBetweenDates(dates, user.id);
    response.body = {result : result, dates : result};
    response.code=200;

};

const getDataMonth = async({session, params, response}) => {
    const user = await session.get('user');
    const result = await sumSrvcs.findMonthData(params.month, user.id);
    response.body = {result : result, month : monthn};
    response.code=200;
};

export {summary, getDataDates, getDataMonth}
