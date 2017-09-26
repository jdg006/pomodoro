(function() {
  function Session($interval) {
    var Session = {};

    //Session variables

    Session.sessionType = "work";
    Session.hideStartButton = false;
    Session.sessionsCount = 0;
    Session.count = 1500;
    Session.formattedTime = format(Session.count);
    Session.stop = null;
    var currentBuzzObject = new buzz.sound("/assets/sounds/40725^DING1", {
        formats: ['mp3'],
        preload: true });

    //Session functions

    Session.startSession = function() {
      Session.hideStartButton = true;
      if(Session.sessionType == "work"){
        Session.sessionsCount ++;
      }
      if(Session.count == 1800 || Session.count == 1500 || Session.count == 300){
        Session.count --;
      }
      Session.stop = $interval(decriment, 1000);

    };

    Session.stopSession = function(){
      Session.hideStartButton = false;
      $interval.cancel(Session.stop);
    }

    Session.resetSession = function(){
      $interval.cancel(Session.stop);
      Session.hideStartButton = false;
      if(Session.sessionType == "work"){
        Session.sessionsCount --;
        Session.count = 1500;
      }
      else if(Session.sessionType == "short break"){
        Session.count = 300;
      }
      else {
        Session.count = 1800;
      }
      Session.formattedTime = format(Session.count);
    }

  function decriment (){

    if(Session.count === -1 && Session.sessionType == "work" && Session.sessionsCount < 4){
      currentBuzzObject.play();
      $interval.cancel(Session.stop);
      Session.count = 300;
      Session.sessionType = "short break"
      Session.formattedTime = format(Session.count);
      Session.hideStartButton = false;
    }
    else if (Session.count == -1 && Session.sessionType == "short break" && Session.sessionsCount < 4){
      currentBuzzObject.play();
      $interval.cancel(Session.stop);
      Session.count = 1500;
      Session.sessionType = "work"
      Session.formattedTime = format(Session.count);
      Session.hideStartButton = false;
      }
    else if(Session.count == -1 && Session.sessionType == "long break"){
      currentBuzzObject.play();
      $interval.cancel(Session.stop);
      Session.count = 1500;
      Session.sessionType = "work"
      Session.formattedTime = format(Session.count);
      Session.hideStartButton = false;
      }
    else if(Session.count == -1 && Session.sessionType == "work" && Session.sessionsCount == 4) {
      currentBuzzObject.play();
      Session.sessionsCount = 0;
      $interval.cancel(Session.stop);
      Session.count = 1800;
      Session.sessionType = "long break"
      Session.formattedTime = format(Session.count);
      Session.hideStartButton = false;
    }
    else {
      Session.formattedTime = format(Session.count);
      Session.count --;
      }

  };

  function format(count){
     var min = Math.floor(count/60);
     var sec = Math.floor(count%60);
     if (sec<10){
       return min+":0"+sec;
     }
     else{
       return min+":"+sec;
     }
   };

    return Session;
  }

  angular
    .module('pomodoro')
    .factory('Session', [ '$interval', Session]);
})();
