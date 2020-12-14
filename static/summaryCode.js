var weekSelector = document.getElementById("weekNumber");
var weekSleepT = document.getElementById("weekSleepT");


weekSelector.oninput = function() {
    retrieveSummaryFromApi(weekSelector.value);
}
  

const retrieveSummaryFromApi = async(week) => {
    const response = await fetch(`/behavior/summary/${week}`);
    const json = await response.json();    
    weekSleepT.innerHTML = json.result.sleepD;

/*    const element = document.createElement('h3');
    const text = document.createTextNode(json.sleepD);
    element.appendChild(text);
    document.querySelector('#magic-container').appendChild(element);
*/
}