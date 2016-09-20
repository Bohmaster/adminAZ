function roommate() {
    'use strict';

    return {
      restrict: 'EA',
      template: '{{ entry.roommate.username }}',
      link: function($scope) {
        var userId = JSON.parse(localStorage.getItem('az_admin_user')).id;
        for (var user in $scope.value) {
          if ($scope.value[user].id == userId) {
          } else {
            $scope.entry.roommate = $scope.value[user];
            $scope.entry.values.with = $scope.value[user].id;
          }
        }
      }
    }
}

export default roommate;
