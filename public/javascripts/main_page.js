/*
fetch('http://example.com/movies.json')
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    console.log(myJson);
  });
*/



window.addEventListener("load", function () {

    function sendData(url) {
      var data = {};
      data.key = document.getElementById("mykey").value;
      data.code = document.getElementById("mycode").value;
      var json = JSON.stringify(data);

      var xhr = new XMLHttpRequest();
      xhr.open("POST", url, true);
      xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
      xhr.onload = function () {
        var res = JSON.parse(xhr.responseText);
        if (xhr.readyState === 4 && xhr.status === 200) {
          //console.log(res);
          if (res.status === "ok") {
            document.getElementById("myform").style.display = 'none';
            document.getElementById("myprize").style.display = 'block';
          } else {
            document.getElementById("retry").style.display = 'block';
          }
        } else {
          //console.log(res);
        }
      }
      xhr.send(json);
    }


    document.getElementById("myform").addEventListener("submit", function (event) {
      event.preventDefault();
      sendData("/check");
    });

    document.getElementById("mytest").addEventListener("click", function (event) {
      sendData("/code");
    });



    //________________ AUDIOS __________________________

    var MUSIC = true;
    var countdown = new Audio('https://res.cloudinary.com/dvxsqwrwm/video/upload/v1544008518/countdown_reduce.mp3');
    var tenSecs = new Audio('https://res.cloudinary.com/dbrbgqgfg/video/upload/v1544005322/tensecs_nhtj8r.mp3');

    countdown.currentTime = 5;
    countdown.play();

    document.getElementById("volumeBtn").addEventListener('click', () => {
      let sounds = [countdown, tenSecs];
      sounds.map(sound => {
        return sound.muted = MUSIC;
      });
      MUSIC = !MUSIC;
      document.getElementById("volumeIcon").classList.toggle('fa-volume-up');
      document.getElementById("volumeIcon").classList.toggle('fa-volume-off');
      document.getElementById("volumeBtn").classList.toggle('disable');
    });


});