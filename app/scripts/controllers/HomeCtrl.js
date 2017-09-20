(function() {

    function HomeCtrl($interval, $scope) {
      var count = 1500;
      $scope.hideStartButton= false;
      $scope.formattedTime = format(count);

      this.startSession = function() {
        $scope.hideStartButton = true;

        if(count == 1500){
          count --;
        }
        stop = $interval(decriment, 1000);

    };

      function decriment (){
      if(count === -1 ){
        $interval.cancel(stop);
        count = 300;
        $scope.formattedTime = format(count);
        $scope.hideStartButton = false;
      }

      else {
          $scope.formattedTime = format(count);
          count --;
        }
    };



    function stopSession (){
      $scope.hideStartButton = false;
      $interval.cancel(stop);

    }
    this.resetSession = function(){
      stopSession();
      count = 1500;
      $scope.formattedTime = format(count);

    }

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

    }

    angular
        .module('pomodoro')
        .controller('HomeCtrl', ['$interval', '$scope', HomeCtrl]);
})();
