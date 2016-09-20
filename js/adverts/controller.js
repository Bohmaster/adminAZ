export default ['$scope', '$http', '$stateParams', function ($scope, $http, $stateParams) {

    var urlBase = localStorage.getItem('az_admin_api');
    var userId = JSON.parse(localStorage.getItem('az_admin_user')).id;
    var entityId = JSON.parse(localStorage.getItem('az_admin_user')).entityId;
    var user_token = JSON.parse(localStorage.getItem('az_admin_login')).id;

    var target = 'advert';
    var containerUrl = 'http://104.131.113.114:3002/api/containers/entity_' + entityId;

    $scope.advert = {};
    $scope.entity = {};
    $scope.entityId = entityId;

    $scope.date = new Date().getDate();

    $http.get(urlBase + 'entities/' + entityId + '?access_token=' + user_token)
        .success(function (entity) {
            console.log(entity);
            $scope.entity = entity;
        });

    if ($stateParams.advertId) {
        $http.get(urlBase + 'adverts/' + $stateParams.advertId + '?access_token=' + user_token)
            .success(function (advert) {
                $scope.advert = advert;

                if (advert.banner) {
                    $scope.type = "banner";
                } else {
                    $scope.type = "text";
                }
            });
    } else {
        $scope.createAdvert = function (type) {

            $scope.type = type;

            $http.post(urlBase + 'entities/' + entityId + '/adverts?access_token=' + user_token, {
                title: $scope.advert.title,
                description: $scope.advert.description,
                date_description: $scope.advert.date_description
            })
                .success(function (advert) {
                    console.log(advert);
                    $scope.advert.id = advert.id;
                    return true;
                });
        }
    }

    $scope.upsertAdvert = function (type) {

        if (type === 'banner') {
            $http.put(urlBase + 'entities/' + entityId + '/adverts/' + $scope.advert.id + '?access_token=' + user_token, {
                title: $scope.advert.title,
                subtitle: $scope.advert.subtitle,
                description: $scope.advert.description,
                date_description: $scope.advert.date_description,
                banner: true
            }).success(function (advert) {
                console.log('UPDATED', advert);
                $location.path('/adverts/list');
            });
        } else {
            $http.put(urlBase + 'entities/' + entityId + '/adverts/' + $scope.advert.id + '?access_token=' + user_token, {
                title: $scope.advert.title,
                subtitle: $scope.advert.subtitle,
                description: $scope.advert.description,
                date_description: $scope.advert.date_description,
                banner: false
            }).success(function (advert) {
                console.log('UPDATED', advert);
            });
        }

    }

    $scope.uploadImage = function ($file) {
        if (!$file) {
            return false;
        }

        if (!$scope.advert.id) {
            $http.post(urlBase + 'entities/' + entityId + '/adverts?access_token=' + user_token, {
                title: $scope.advert.title,
                description: $scope.advert.description,
                date_description: $scope.advert.date_description
            }).success(function (advert) {
                console.log(advert);
                $scope.advert.id = advert.id;

                var formData = new FormData();
                formData.append('file', $file);

                var url = containerUrl + '/upload?type=' + target;
                if (target === 'advert') {
                    url += '&advertId=' + $scope.advert.id;
                }

                // Para upload es necesario usar jquery ajax con FormData object
                $.ajax({
                    url: url,
                    type: 'POST',
                    data: formData,
                    processData: false,
                    contentType: false,
                    success: function (res, success) {
                        if (success) {
                            $scope.$apply(function () {
                                console.log('SOME', res, success);
                                $('.divpromo').css('background-image', 'url("http://104.131.113.114:3002/api/containers/entity_' + entityId + '/download/' + $scope.advert.id + '.advert?t=' + new Date().getTime() + '")');
                            })
                        }
                    }
                });
            });
        } else {
            var formData = new FormData();
            formData.append('file', $file);

            var url = containerUrl + '/upload?type=' + target;
            if (target === 'advert') {
                url += '&advertId=' + $scope.advert.id;
            }

            // Para upload es necesario usar jquery ajax con FormData object
            $.ajax({
                url: url,
                type: 'POST',
                data: formData,
                processData: false,
                contentType: false,
                success: function (res, success) {
                    if (success) {
                        $scope.$apply(function () {
                            console.log('SOME', res, success);
                            $('.divpromo').css('background-image', 'url("http://104.131.113.114:3002/api/containers/entity_' + entityId + '/download/' + $scope.advert.id + '.advert?t=' + new Date().getTime() + '")');
                        })
                    }
                }
            });
        }


    };

}]