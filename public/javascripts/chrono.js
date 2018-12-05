
function chrono() {
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
}

chrono();

var countdownChrono = setInterval('chrono()', 1000);
