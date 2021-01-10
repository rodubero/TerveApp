import * as sumSrvcs from "../../services/summaryServices.js";

const summary = async({render, session}) => {
    const user = await session.get('user');
    render('summary.ejs', {reguser: user});
};

const getDataDates = async({session, params, response}) => {
    const user = await session.get('user');
    let weekn = await params.week;
    const yearn = await params.year;
    const dates = sumSrvcs.getWeekRange(weekn, yearn);
    const result = await sumSrvcs.findDataBetweenDates(dates, user.id);
    response.body = {result : result, week : weekn, dates : dates};
    response.code=200;

};

const getDataMonth = async({session, params, response}) => {
    const user = await session.get('user');
    let monthn = await params.month;
    const yearn = await params.year;
    const result = await sumSrvcs.findMonthData(monthn, yearn, user.id);
    response.body = {result : result, month : monthn};
    response.code=200;
};

export {summary, getDataDates, getDataMonth}
