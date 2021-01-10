var weekSelector = document.getElementById("weekNumber");
var monthSelector = document.getElementById("monthNumber");


weekSelector.oninput = function() {
    retrieveWeekSummary(weekSelector.value.slice(-2), weekSelector.value.slice(0,4));
}
monthSelector.oninput = function() {
    retrieveMonthSummary(monthSelector.value.slice(-2), monthSelector.value.slice(0,4));
}

this.onload = async () => {
    const todayDate = await retrieveDateParams();
    weekSelector.value = todayDate.year+'-W'+todayDate.week;
    monthSelector.value = todayDate.year+'-'+todayDate.month;
    retrieveMonthSummary(todayDate.month, todayDate.year);
    retrieveWeekSummary(todayDate.week, todayDate.year);
}

const createFillData = async(value, elementTag, description) => {
    let text ='';
    let text2 ='';
    if(!value || isNaN(value)){
        const element = document.createElement('h5');
        text = document.createTextNode('No data available');
        element.appendChild(text);
        document.querySelector(elementTag).replaceChildren(element);
    } else {
        const element = document.createElement('h3');
        text = document.createTextNode(value);
        const element2 = document.createElement('h4');
        text2 = document.createTextNode(description);
        element.appendChild(text);
        element2.appendChild(text2);
        element.appendChild(element2);
        document.querySelector(elementTag).replaceChildren(element);
    }
}

const retrieveDateParams = async() => {
    const responseDate = await fetch(`/api/getDateParams`);
    const dateJson = await responseDate.json();
    return dateJson.result; 
}

const retrieveWeekSummary = async(week, year) => {
    const response1 = await fetch(`/behavior/summary/week/${Number(week)}/${year}`);
    const weekJson = await response1.json();
    const weekData = weekJson.result;    

    await createFillData(weekData.sleepD, '#weekSleepD-container', 'Hrs');
    await createFillData(weekData.sportsT, '#weekSportsT-container', 'Hrs');
    await createFillData(weekData.studyT, '#weekStudyT-container', 'Hrs');
    await createFillData(weekData.sleepQ, '#weekSleepQ-container', '/5 Points');
    await createFillData(weekData.mood, '#weekMood-container', '/5 Points');

}

const retrieveMonthSummary = async(month, year) => { 
    const response2 = await fetch(`/behavior/summary/month/${Number(month)}/${year}`);
    const monthJson = await response2.json();
    const monthData = monthJson.result;    

    await createFillData(monthData.sleepD, '#monthSleepD-container', 'Hrs');
    await createFillData(monthData.sportsT, '#monthSportsT-container', 'Hrs');
    await createFillData(monthData.studyT, '#monthStudyT-container', 'Hrs');
    await createFillData(monthData.sleepQ, '#monthSleepQ-container', '/5 Points');
    await createFillData(monthData.mood, '#monthMood-container', '/5 Points');

}