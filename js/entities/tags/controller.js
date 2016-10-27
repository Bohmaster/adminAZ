export default ['$scope', '$http', 'ngToast', function($scope, $http, ngToast) {

  $scope.availableTags = [];
  $scope.tag = {};

  var urlBase = localStorage.getItem('az_admin_api');
  var userId = JSON.parse(localStorage.getItem('az_admin_user')).id;
  var entityId = JSON.parse(localStorage.getItem('az_admin_user')).entityId;
  var user_token = JSON.parse(localStorage.getItem('az_admin_login')).id;

  function activate() {
    loadTags();
  }

  /*
    Trae las tags por categoria, o todas
   */
  function loadTags() {
    $http.get(
      urlBase + 'entities/' + entityId + '/tags?access_token=' + user_token
    ).success(function(tags) {
      $scope.availableTags = tags;
    }).error(function(err) {
      console.error(err);
    });
  }

  $scope.agregarTag = function(name) {

    console.log(name);

    $http.post(urlBase + 'tags?access_token=' + user_token, { name: name, ownerId: userId})
    .success(function (tag) {
      $scope.availableTags.push(tag);
      console.log(tag);

      $http.put(urlBase + 'tags/' + tag.id + '/entities/rel/' + entityId + '?access_token=' + user_token)
        .success(function (rel) {
          ngToast.create('Created');

        }).error(function(err) {
          console.error(err);
        });

      }).error(function(err) {
        console.error(err);
      }
    );
  }

  $scope.borrarTag = function(id) {


    console.log(id);

    $http.delete(urlBase + 'tags/' + id + '?access_token=' + user_token)
    .success(function (res) {
      // var index = $scope.availableTags.indexOf(id);
      // if(index!== -1){
      //   $scope.availableTags.slice(index, 1);
      // }

      $http.delete(urlBase + 'tags/' + tag.id + '/entities/rel/' + entityId + '?access_token=' + user_token)
        .success(function (rel) {
          ngToast.create('deleted');

        }).error(function(err) {
          console.error(err);
        });

      }).error(function(err) {
        console.error(err);
      }
    );
  }

  activate();

}]
