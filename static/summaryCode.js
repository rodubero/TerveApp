var weekSelector = document.getElementById("weekNumber");
var monthSelector = document.getElementById("monthNumber");


weekSelector.oninput = function() {
    retrieveWeekSummary(weekSelector.value);
}
monthSelector.oninput = function() {
    retrieveMonthSummary(monthSelector.value);
}

const createFillData = async(value, elementTag, description) => {
    let text ='';
    let text2 ='';
    if(value){
        const element = document.createElement('h3');
        text = document.createTextNode(value);
        const element2 = document.createElement('h4');
        text2 = document.createTextNode(description);
        element.appendChild(text);
        element2.appendChild(text2);
        element.appendChild(element2);
        document.querySelector(elementTag).replaceChildren(element);
    } else {
        const element = document.createElement('h5');
        text = document.createTextNode('No data available');
        element.appendChild(text);
        document.querySelector(elementTag).replaceChildren(element);
    }
}

const retrieveWeekSummary = async(week) => {
    const response1 = await fetch(`/behavior/summary/week/${week}`);
    const weekJson = await response1.json();
    const weekData = weekJson.result;    

    await createFillData(weekData.sleepD, '#weekSleepD-container', 'Hrs');
    await createFillData(weekData.sportsT, '#weekSportsT-container', 'Hrs');
    await createFillData(weekData.studyT, '#weekStudyT-container', 'Hrs');
    await createFillData(weekData.sleepQ, '#weekSleepQ-container', '/5 Points');
    await createFillData(weekData.mood, '#weekMood-container', '/5 Points');
    weekSelector.selectedIndex = weekJson.week-1;

}

const retrieveMonthSummary = async(month) => { 
    const response2 = await fetch(`/behavior/summary/month/${month}`);
    const monthJson = await response2.json();
    const monthData = monthJson.result;    

    await createFillData(monthData.sleepD, '#monthSleepD-container', 'Hrs');
    await createFillData(monthData.sportsT, '#monthSportsT-container', 'Hrs');
    await createFillData(monthData.studyT, '#monthStudyT-container', 'Hrs');
    await createFillData(monthData.sleepQ, '#monthSleepQ-container', '/5 Points');
    await createFillData(monthData.mood, '#monthMood-container', '/5 Points');
    monthSelector.selectedIndex = monthJson.month-1;

}