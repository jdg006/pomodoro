(function() {
  function Task($firebaseArray) {
    var Task = {};
    var ref = firebase.database().ref().child("tasks");
    var tasks = $firebaseArray(ref);
    Task.all = tasks;

    Task.complete = function(task){
      for(i=0;i<tasks.length;i++){
        if(tasks[i].$id == task.$id){
          tasks[i].completed = true;
          tasks.$save(tasks[i]);
        }
      }
    }

    Task.getIfCompleted = function() {
      return  $firebaseArray(ref.orderByChild("completed").equalTo(true));
    }

    Task.getIfPending = function(){
      return  $firebaseArray(ref.orderByChild("completed").equalTo(false));
    }

    Task.add = function(task) {
      task.id = tasks.length;
      tasks.$add(task);
    }

    Task.deleteCompletedTasks = function(){
      for(i=0;i<tasks.length;i++){
        if(tasks[i].completed == true){
          tasks.$remove(tasks[i]);
        }
      }
    }
    
    return Task;

  }
  angular
    .module('pomodoro')
    .factory('Task', ['$firebaseArray', Task]);
})();
