export default ['$scope', '$http', function($scope, $http) {

  // $scope.availableTags = [];

  var urlBase = localStorage.getItem('az_admin_api');
  var userId = JSON.parse(localStorage.getItem('az_admin_user')).id;
  var entityId = JSON.parse(localStorage.getItem('az_admin_user')).entityId;
  var user_token = JSON.parse(localStorage.getItem('az_admin_login')).id;

  function activate() {
    // loadTags();
    console.log('hello you!');
  }

  // function loadTags() {
  //   $http.get(
  //     urlBase + 'tags?access_token=' + user_token
  //   ).success(function(tags) {
  //     $scope.availableTags = tags;
  //   }).error(function(err) {
  //     console.error(err);
  //   });
  // }
  //
  // $scope.agregarTag = function(name) {
  //
  //   $http.post(urlBase + 'tags?access_token=' + user_token, { name: name, ownerId: userId})
  //   .success(function (tag) {
  //     $scope.availableTags.push(tag);
  //
  //     $http.put(urlBase + 'tags/' + tag.id + '/entities/rel/' + entityId + '?access_token=' + user_token)
  //       .success(function (rel) {
  //         // agregar a la lista de tags de esta entidad
  //
  //       }).error(function(err) {
  //         console.error(err);
  //       });
  //
  //     }).error(function(err) {
  //       console.error(err);
  //     }
  //   );
  // }

  activate();

}]
