export default ['$scope', '$http', function($scope, $http) {

  var urlBase = localStorage.getItem('az_admin_api');
  var userId = JSON.parse(localStorage.getItem('az_admin_user')).id;
  var entityId = JSON.parse(localStorage.getItem('az_admin_user')).entityId;
  var user_token = JSON.parse(localStorage.getItem('az_admin_login')).id;

  console.log(1, user_token);

  $scope.daysOfWeek = [
      [
        {
          dayOfWeek: 0,
          first: true
        },
        {
          dayOfWeek: 0
        }
      ],
      [{dayOfWeek: 1, first: true}, {dayOfWeek: 1}],
      [{dayOfWeek: 2, first: true}, {dayOfWeek: 2}],
      [{dayOfWeek: 3, first: true}, {dayOfWeek: 3}],
      [{dayOfWeek: 4, first: true}, {dayOfWeek: 4}],
      [{dayOfWeek: 5, first: true}, {dayOfWeek: 5}],
      [{dayOfWeek: 6, first: true}, {dayOfWeek: 6}]
  ]

  function activate() {
    console.log('hello you, hours!');
    loadEntity();
    loadHours();
    getInputs();
  }

  function getInputs() {
      var x = document.querySelectorAll('.hours');

      for (var i=0; i < x.length; i++) {
          console.log(x[i].className);
      }

      console.log('X', x);
  }


  function loadEntity() {
      $http.get(
          urlBase + 'entities/' + entityId
      ).success(function(entity) {
          $scope.entity = entity;
          console.log(entity);
      }).error(function(err) {
          console.error(err);
      });
  }

  $scope.saveHours = function() {

    var horarios = $scope.daysOfWeek;



    angular.forEach(horarios, function(h, i){
      angular.forEach(h, function(value, key){
        if(value.id){
          $http.put(urlBase + 'entities/' + entityId + '/hours/'+ value.id + '?access_token=' + user_token,
          {
              dayOfWeek: value.dayOfWeek,
              openTime: value.openTime,
              closeTime: value.closeTime,
              id: value.id,
              entityId: entityId
          }
        )
          .success(function(hour){
            console.log(hour, '<<-------hour updated');
          });
        }else{
          var open_time;
          var close_time;
          if(typeof value.openTime === 'undefined'){
            open_time = "";
          }else{
            open_time = value.openTime;
          }
          if(typeof value.closeTime === 'undefined'){
            close_time = "";
          }else{
            close_time = value.closeTime;
          }
          console.log(value, '<<value post');
          $http.post(urlBase + 'entities/' + entityId + '/hours/'+ '?access_token=' + user_token,
          {
              dayOfWeek: value.dayOfWeek,
              openTime: "",
              closeTime: "",
              entityId: entityId
          }
        )
          .success(function(hour){
            console.log(value, '<<value put');
            $http.put(urlBase + 'entities/' + entityId + '/hours/'+ hour.id + '?access_token=' + user_token,
            {
                dayOfWeek: hour.dayOfWeek,
                openTime: value.openTime,
                closeTime: value.closeTime,
                id: hour.id,
                entityId: entityId
            }
          )
            .success(function(hr){
              console.log(hr, '<<-------hour updated');
            });
          });
        }
      });
    });
      // async.series([function(cb){
      //   post(id = h.id){
      //     cb()
      //   }
      // }
      // ], function(err, res){
      //     next();
      // });
  }

  function loadHours() {
      $http.get(
          urlBase + 'entities/' + entityId  + '/hours?access_token=' + user_token
      ).success(function(hours) {
          console.log('hours', hours);

          for (var i=0; i < hours.length; i++) {
            console.log(hours[i]);

            for (var x=0; x < $scope.daysOfWeek.length; x++) {
              if (hours[i].dayOfWeek == $scope.daysOfWeek[x][0].dayOfWeek) {
                  console.log('yes');
                  console.log(hours[i].dayOfWeek, $scope.daysOfWeek[x][0].dayOfWeek, $scope.daysOfWeek[x][1].dayOfWeek)
                  $scope.daysOfWeek[x][0].openTime = hours[i].openTime;
                  $scope.daysOfWeek[x][0].closeTime = hours[i].closeTime;
                  $scope.daysOfWeek[x][0].id = hours[i].id;

                  if (i < hours.length - 1) {
                      var z = i + 1;

                      console.log('z', z);

                      if (hours[z].dayOfWeek == $scope.daysOfWeek[x][0].dayOfWeek) {
                          console.log('todo piola maigo');

                          $scope.daysOfWeek[x][1].openTime = hours[i].openTime;
                          $scope.daysOfWeek[x][1].closeTime = hours[i].closeTime;
                          $scope.daysOfWeek[x][1].id = hours[i].id;
                      }
                  }

                  console.log('PLEASE', $scope.daysOfWeek);

              } else {
                  console.log('no');
              }
            }
          }

      }).error(function(err) {
          console.error(err);
      });
  }

  activate();

}]
