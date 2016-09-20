function show($http) {
    'use strict';

    return {
      restrict: 'E',
      controller: function($scope, $http) {
        $scope.subdomain = null;
        var user_token = JSON.parse(localStorage.getItem('az_admin_login')).id;
        var getSubdomain = function() {
          $http.get(urlBase + $scope.entry._entityName + "/" + $scope.entry.values['id'] + "/subdomain?access_token=" + user_token)
          .success(function (data) {
            $scope.subdomain = data.name;
          })
          .error(function(err) {
            console.error(err);
          })
        };
        getSubdomain();
      },
      template: '{{ subdomain }}',
    };
}

show.$inject = ['$http'];

export default show;
