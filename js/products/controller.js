export default ['$scope', '$http', '$stateParams', function ($scope, $http, $stateParams) {



    var urlBase = localStorage.getItem('az_admin_api');
    var userId = JSON.parse(localStorage.getItem('az_admin_user')).id;
    var entityId = JSON.parse(localStorage.getItem('az_admin_user')).entityId;
    var user_token = JSON.parse(localStorage.getItem('az_admin_login')).id;

    var target = 'product';
    var containerUrl = 'http://104.131.113.114:3002/api/containers/entity_' + entityId;

    $scope.product = {};
    $scope.entity = {};
    $scope.entityId = entityId;

    $scope.imgAvailable=false;
    $scope.img = {};

    $scope.date = new Date().getDate();

    $http.get(urlBase + 'entities/' + entityId + '?access_token=' + user_token)
        .success(function (entity) {
            console.log(entity);
            $scope.entity = entity;
        });

    if ($stateParams.productId) {
        $http.get(urlBase + 'products/' + $stateParams.productId + '?access_token=' + user_token)
            .success(function (product) {
                $scope.product = product;

                if (product.banner) {
                    $scope.type = "banner";
                } else {
                    $scope.type = "text";
                }
            });
    } else {
        $scope.createproduct = function (type) {

            $scope.type = type;

            $http.post(urlBase + 'products?access_token=' + user_token, {
                title: $scope.product.title,
                description: $scope.product.description,
                cost: $scope.product.cost,
                entityId: entityId
            })
                .success(function (product) {
                    console.log(product);
                    $scope.product.id = product.id;
                    return true;
                });
        }
    }

    $scope.upsertproduct = function (type) {

        if (type === 'banner') {
            $http.put(urlBase + 'entities/' + entityId + '/products/' + $scope.product.id + '?access_token=' + user_token, {
                title: $scope.product.title,
                subtitle: $scope.product.subtitle,
                description: $scope.product.description,
                cost: $scope.product.cost,
                banner: true
            }).success(function (product) {
                console.log('UPDATED', product);
                $location.path('/products/list');
            });
        } else {
            $http.put(urlBase + 'entities/' + entityId + '/products/' + $scope.product.id + '?access_token=' + user_token, {
                title: $scope.product.title,
                subtitle: $scope.product.subtitle,
                description: $scope.product.description,
                cost: $scope.product.cost,
                banner: false
            }).success(function (product) {
                console.log('UPDATED', product);
            });
        }

    }

    $scope.uploadImage = function ($file) {
        if (!$file) {
            return false;
        }


        if (!$scope.product.id) {
            $http.post(urlBase + 'products?access_token=' + user_token, {
                title: $scope.product.title,
                description: $scope.product.description,
                cost: $scope.product.cost,
                entityId: entityId
            }).success(function (product) {
                console.log(product);
                $scope.product.id = product.id;

                var formData = new FormData();
                formData.append('file', $file);

                var url = containerUrl + '/upload?type=' + target;
                if (target === 'product') {
                    url += '&productId=' + $scope.product.id;
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
                                $('.divpromo').css('background-image', 'url("http://104.131.113.114:3002/api/containers/entity_' + entityId + '/download/' + $scope.product.id + '.product?t=' + new Date().getTime() + '")');
                            })
                        }
                    }
                });
            });
        } else {
            var formData = new FormData();
            formData.append('file', $file);

            console.log('FILE', $file);

            var url = containerUrl + '/upload?type=' + target;
            if (target === 'product') {
                url += '&productId=' + $scope.product.id;
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
                            $('.divpromo').css('background-image', 'url("http://104.131.113.114:3002/api/containers/entity_' + entityId + '/download/' + $scope.product.id + '.product?t=' + new Date().getTime() + '")');
                        })
                    }
                }
            });
        }


    };

}]
