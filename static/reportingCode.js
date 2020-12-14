var sliderSleepQ = document.getElementById("sleepQ");
var outputSleepQ = document.getElementById("sleepQVal");
var sliderMoodM = document.getElementById("moodM");
var outputMoodM = document.getElementById("moodMVal");
var sliderMoodE = document.getElementById("moodE");
var outputMoodE = document.getElementById("moodEVal");
var sliderEatingR = document.getElementById("eatingR");
var outputEatingR = document.getElementById("eatingRVal");

this.onload = function () {
  outputSleepQ.innerHTML = sliderSleepQ.value; 
  outputMoodM.innerHTML = sliderMoodM.value;
  outputMoodE.innerHTML = sliderMoodE.value; 
  outputEatingR.innerHTML = sliderEatingR.value;
}


sliderEatingR.oninput = function() {
  outputEatingR.innerHTML = this.value;
}

sliderMoodE.oninput = function() {
  outputMoodE.innerHTML = this.value;
}

sliderMoodM.oninput = function() {
  outputMoodM.innerHTML = this.value;
}

sliderSleepQ.oninput = function() {
  outputSleepQ.innerHTML = this.value;
}
