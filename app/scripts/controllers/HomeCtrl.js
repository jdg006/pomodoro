(function() {
    function HomeCtrl($scope, Task, Session, $interval) {

      //variables
      $scope.sessionType = Session.sessionType;
      $scope.formattedTime = Session.formattedTime;
      $scope.hideStartButton = Session.hideStartButton;
      this.tasks = Task.all;
      this.completedTasks = Task.getIfCompleted();
      this.pendingTasks = Task.getIfPending();

      this.completeTask = function(task){
        Task.complete(task);
      }

      var stop = $interval(update, 1000);

      //functions

      this.deleteCompletedTasks = function(){
        Task.deleteCompletedTasks();
      }

      this.newTask = function(){
        var task ={
          text:this.newTaskMessage,
          completed: false
        };
        Task.add(task);
        this.newTaskMessage="";
      };

      this.startSession = function(){
        Session.startSession();
      };

      this.stopSession = function(){
        Session.stopSession();
      };

      this.resetSession = function(){
        Session.resetSession();
      };

      function update(){
        $scope.sessionType = Session.sessionType;
        $scope.formattedTime = Session.formattedTime;
        $scope.hideStartButton = Session.hideStartButton;
      };

//controller setup
    }
    angular
        .module('pomodoro')
        .controller('HomeCtrl', ['$scope', 'Task', 'Session','$interval',HomeCtrl]);
})();
