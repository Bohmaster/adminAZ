export default ['$scope', '$http', '$stateParams', '$timeout', function($scope, $http, $stateParams, $timeout) {
  var roomId = $stateParams.id;
  $scope.messages = [];
  $scope.userId = JSON.parse(localStorage.getItem('az_admin_user')).id;

  var urlBase = localStorage.getItem('az_admin_api');
  var user_token = JSON.parse(localStorage.getItem('az_admin_login')).id;

  $scope.you = null;
  $scope.him = null;

  function activate() {
    loadMessages();
    getUsers();
    $("#messageLink").removeClass("yellow");
  }

  function loadMessages() {
    $http.get(
      urlBase + 'chatrooms/' + roomId + '/messages?access_token=' + user_token
    ).success(function(messages) {
      $scope.messages = messages;

      for (var m in $scope.messages) {
        var date = messages[m].date
        messages[m].date = moment(date).format('DD-MM-YYYY, h:mm:ss a');
      }

      $timeout(function(){
        var messageThread = document.getElementById('chatWindow');
        messageThread.scrollTop = messageThread.scrollHeight;
      }, 200);

    }).error(function(err) {
      console.error(err);
    });
  }

  function getUsers() {
    $http.get(
      urlBase + 'chatrooms/' +roomId + '/users?access_token=' + user_token
    ).success(function(users) {

      for (var i in users) {
        if (users[i].id == $scope.userId) {
          $scope.you = users[i];
        } else {
          $scope.him = users[i];
        }
      }
    }).error(function(err) {
      console.error(err);
    });
  }

  $scope.$on('new-message-received', function(evt, data) {
    $scope.$apply(function(){
      $scope.messages.push(data.content);
      $timeout(function(){
        var messageThread = document.getElementById('chatWindow');
        messageThread.scrollTop = messageThread.scrollHeight;
      }, 200);
    });
  });

  $scope.reply = function() {
    var data = {
      'text': $scope.message,
      'user': $scope.userId,
      'room': roomId
    };

    $http.post(
      urlBase + 'chatmessages/direct?access_token=' + user_token,
      { data: data }
    ).success(function(yes) {
      $scope.message = "";
      loadMessages();
    }).error(function(err) {
      console.error(err);
    });
  }

  activate();
}]
