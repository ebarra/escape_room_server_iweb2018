
function chrono(stopQuickCountDown) {
  var seconds = Math.abs(rem_time);

  var secs = Math.floor(seconds % 60);
  var mins = Math.floor((seconds/60) % 60);
  var hours = Math.floor((seconds/(60*60)) % 24);
  function pad(num) {
    return (num < 10 ? "0" + num : num);
  }
  document.getElementById('hours').innerHTML = pad(hours);
  document.getElementById('hours').setAttribute('data-text', pad(hours));
  document.getElementById('mins').innerHTML = pad(mins);
  document.getElementById('mins').setAttribute('data-text', pad(mins));
  document.getElementById('secs').innerHTML = pad(secs);
  document.getElementById('secs').setAttribute('data-text', pad(secs));

  if (rem_time === 0 || rem_time < 0) {
    [...document.getElementsByClassName("clock")].forEach((e) => {
      e.classList.add('red');
    });
  }
  if (rem_time === 0) {
    //clearInterval(countdownChrono);
    document.getElementById('explosion').style.display = "inline-block";
    document.getElementById('time').style.display = "none";
    //document.getElementById('boom').innerHTML = "BOOOOOM!";
    //document.getElementById('boom').setAttribute('data-text', "BOOOOOM!");
  } else if (rem_time < 0) {
    document.getElementById('explosion').style.display = "none";
    document.getElementById('time').style.display = "inline-block";
    document.getElementById('minus').style.display = "inline-block";
  }

  rem_time--;
  if(rem_time<stopQuickCountDown){
    clearInterval(countdownChronoQuick);
    countdownChrono = setInterval('chrono()', 1000);
  }

}

//init penalty to 0
if(localStorage && !localStorage.penalty ){
  localStorage.penalty = 0;
} else {
  rem_time = rem_time - Number(localStorage.penalty);
}

chrono();

var countdownChrono = setInterval('chrono()', 1000);
var countdownChronoQuick;

function applyPenalty(penalty){
  //console.log("PENALIZACION anterior " + localStorage.penalty);
  localStorage.penalty = Number(localStorage.penalty) + Number(penalty);
  clearInterval(countdownChrono);
  var stopQuickCountDown = rem_time - Number(penalty);
  countdownChronoQuick = setInterval(()=>chrono(stopQuickCountDown), 10);
}
