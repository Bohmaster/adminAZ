// require('ng-admin'); removed here and added back as a <script> tag to hep debugging - WebPack doesn't properly handle sourcemaps of dependencies yet
// require('./api');

var async = require('async');
var adminApp = angular.module('adminApp', ['ng-admin', 'ngToast', 'ngAnimate', 'uiGmapgoogle-maps']);

// global custom api configuration
adminApp.config(['$httpProvider', 'RestangularProvider', function($httpProvider, RestangularProvider) {
  var user_token = JSON.parse(localStorage.getItem('az_admin_login')).id;
  RestangularProvider.setDefaultHeaders({'Authorization': user_token});
  RestangularProvider.setFullResponse(true);
  $httpProvider.defaults.useXDomain = true;
  delete $httpProvider.defaults.headers.common['X-Requested-With'];

}]);

// custom API flavor
var apiFlavor = require('./api_flavor');
adminApp.config(['RestangularProvider', apiFlavor.requestInterceptor]);
adminApp.config(['RestangularProvider', apiFlavor.responseInterceptor]);

// api flavours per module
adminApp.config(['RestangularProvider', require('./categories/api_flavor').requestInterceptor]);
adminApp.config(['RestangularProvider', require('./categories/api_flavor').responseInterceptor]);

adminApp.config(['RestangularProvider', require('./entities/api_flavor').requestInterceptor]);
adminApp.config(['RestangularProvider', require('./entities/api_flavor').responseInterceptor]);
adminApp.config(['$httpProvider', require('./entities/api_flavor').httpInterceptor]);

adminApp.config(['RestangularProvider', require('./adverts/api_flavor').requestInterceptor]);

adminApp.config(['RestangularProvider', require('./tags/api_flavor').requestInterceptor]);
adminApp.config(['RestangularProvider', require('./tags/api_flavor').responseInterceptor]);

adminApp.config(['RestangularProvider', require('./chatrooms/api_flavor').responseInterceptor]);
adminApp.config(['$httpProvider', require('./chatrooms/api_flavor').httpInterceptor]);


// custom 'amount' field type
adminApp.config(['NgAdminConfigurationProvider', 'FieldViewConfigurationProvider', function(nga, fvp) {
    nga.registerFieldType('amount', require('./types/AmountField'));
    fvp.registerFieldView('amount', require('./types/AmountFieldView'));
}]);

// custom directives
adminApp.directive('makeOwner', require('./entities/directives/makeOwner'));
adminApp.directive('entityImage', require('./entities/directives/entityImage'));
adminApp.directive('newEntityImage', require('./entities/directives/newEImages'));
adminApp.directive('activeEntity', require('./entities/directives/activeEntity'));
adminApp.directive('deactiveEntity', require('./entities/directives/unactiveEntity'));
adminApp.directive('services', require('./entities/directives/services'));
adminApp.directive('payment', require('./entities/directives/payment'));
adminApp.directive('addClient', require('./entities/directives/addFavoriteClient'));
adminApp.directive('geo', require('./entities/directives/geo'));
adminApp.directive('addNewTag', require('./tags/directives/addNewTag'));
adminApp.directive('subdomain', require('./subdomain/manage'));
adminApp.directive('showSubdomain', require('./subdomain/show'));
adminApp.directive('messages', require('./messages/directives/viewMessages'));
adminApp.directive('deleteRoom', require('./messages/directives/deleteRoom'));
adminApp.directive('roommate', require('./messages/directives/roommate'));
adminApp.directive('publishFacebook', require('./adverts/directives/publishFacebook'));
adminApp.directive('filelistBind', require('./products/directives/filelistBind'));
adminApp.directive('upload', require('./files/upload'));
adminApp.directive('imagenes', require('./files/imagenes'));

// custom controllers
adminApp.controller('username', ['$scope', function($scope) {
    $scope.username =  JSON.parse(localStorage.getItem('az_admin_user')).name || JSON.parse(localStorage.getItem('az_admin_user')).username;
}]);

// custom wysiwyg configuration (no permitir html tags en las opciones de formato)
adminApp.config(function($provide) {
  $provide.decorator('taOptions', ['taRegisterTool', '$delegate', function(taRegisterTool, taOptions){
    taOptions.toolbar = [
      ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'pre', 'quote'],
      ['bold', 'italics', 'underline', 'strikeThrough', 'ul', 'ol', 'redo', 'undo'],
      ['justifyLeft', 'justifyCenter', 'justifyRight', 'indent', 'outdent'],
    ];
    return taOptions;
  }]);
});

// custom states (pages)
adminApp.config(['$stateProvider', require('./messages/chatState')]);
adminApp.controller('chatController', require('./messages/chatController'));
adminApp.config(['$stateProvider', require('./entities/tags/state')]);
adminApp.controller('entityTagsController', require('./entities/tags/controller'));
adminApp.config(['$stateProvider', require('./entities/images/state')]);
adminApp.controller('entityImagesController', require('./entities/images/controller'));
adminApp.config(['$stateProvider', require('./entities/hours/state')]);
adminApp.controller('entityHoursController', require('./entities/hours/controller'));
adminApp.config(['$stateProvider', require('./adverts/state')]);
adminApp.controller('detailAdvertController', require('./adverts/controller'));
adminApp.config(['$stateProvider', require('./products/state')]);
adminApp.controller('detailProductController', require('./products/controller'));
adminApp.config(['$stateProvider', require('./entities/basica/state')]);
adminApp.controller('infoBasicaController', require('./entities/basica/controller'));

adminApp.config(['NgAdminConfigurationProvider', function (nga) {

    urlBase = "http://104.131.113.114:3002/api/";
    //var urlBase = "/api/";
    localStorage.setItem('az_admin_api',urlBase);

    var entity = null;

    // create the admin application
    var admin = nga.application('AZ Club Administración')
        .baseApiUrl(urlBase);

    admin.header(require('./header.html'));

    if(JSON.parse(localStorage.getItem('az_admin_user')).superuser) {
      // admin az config

      admin.addEntity(nga.entity('categories'));
      admin.addEntity(nga.entity('entities'));
      admin.addEntity(nga.entity('adverts'));
      admin.addEntity(nga.entity('tags'));
      admin.addEntity(nga.entity('cities'));
      admin.addEntity(nga.entity('states'));
      admin.addEntity(nga.entity('usuarios'));
      admin.addEntity(nga.entity('chatrooms'));

      require('./categories/config')(nga, admin);
      require('./entities/config')(nga, admin);
      require('./adverts/config')(nga, admin);
      require('./tags/config')(nga, admin);
      require('./cities/config')(nga, admin);
      require('./usuarios/config')(nga, admin);
      require('./chatrooms/config')(nga, admin);

      admin.dashboard(require('./dashboard/config')(nga, admin));
      admin.menu(require('./menu')(nga, admin));

    } else {
      // entity owner config
      if(!JSON.parse(localStorage.getItem('az_admin_user')).entityId) {
        window.location = "./login.html";
      } else {

        adminApp.config(['RestangularProvider', require('./clients/api_flavor').requestInterceptor]);

        // add entities
        admin.addEntity(nga.entity('entities'));
        admin.addEntity(nga.entity('adverts'));
        admin.addEntity(nga.entity('tags'));
        admin.addEntity(nga.entity('chatrooms'));
        admin.addEntity(nga.entity('usuarios'));
        admin.addEntity(nga.entity('clients'));
        admin.addEntity(nga.entity('products'));

        require('./entities/configComercio')(nga, admin);
        require('./tags/configComercio')(nga, admin);
        require('./adverts/configComercio')(nga, admin);
        require('./usuarios/configComercio')(nga, admin);
        require('./chatrooms/configComercio')(nga, admin);
        require('./clients/configComercio')(nga, admin);
        require('./products/configComercio')(nga, admin);

        admin.dashboard(require('./dashboard/configComercio')(nga, admin));
        admin.menu(require('./menuComercio')(nga, admin));
      }
    }

    // attach the admin application to the DOM and execute it
    nga.configure(admin);
}]);

adminApp.config(['ngToastProvider', '$stateProvider', function(ngToastProvider, $stateProvider) {
  console.log('pre');
  ngToastProvider.configure({
    animation: 'fade' // or 'fade'
  });

  // uiGmapGoogleMapApiProvider.configure({
  //     key: 'AIzaSyAMdV-HX0rtJd1njvA714X8mE1-ge--9EI',
  //     v: '3.20' //defaults to latest 3.X anyhow
  //     // libraries: 'weather,geometry,visualization, places'
  // });

  // $stateProvider.state('advertDetail', {
  //   parent: 'main',
  //   url: '/tutoriales',
  //   params: { id: null },
  //   template: ''
  // });
}]);

adminApp.run(function($state, $rootScope, $http) {

    var subscription = JSON.parse(localStorage.getItem('az_admin_subscription'));
    var user = JSON.parse(localStorage.getItem('az_admin_user'));
    var user_token = JSON.parse(localStorage.getItem('az_admin_login')).id;

    $rootScope.$on('$stateChangeStart', function(e, to, toP, from, fromP){
       if(to.data && to.data.subscriptions && to.data.subscriptions.length > 0 && typeof subscription !== 'undefined'){
           if(to.data.subscriptions.indexOf(subscription.name) === -1){
               e.preventDefault();
               $state.go('entityHours'); //TODO: Change to correct page
           }else{
             if(to.data.limited && to.data.limit_type && typeof user !== 'undefined'){
               switch (to.data.limit_type) {
                 case 'advert':
                    $http.get(urlBase + 'entities/' + user.entityId + '/adverts/count?access_token=' + user_token )
                    .success(function(quantity){
                      console.log(quantity);
                      if(subscription.adverts_limit >= quantity.count){
                        e.preventDefault();
                        $state.go('entityHours'); //TODO: Change to correct page
                      }
                    });
                   break;
                 case 'product':
                    $http.get(urlBase + 'entities/' + user.entityId + '/products/count?access_token=' + user_token )
                    .success(function(quantity){
                      console.log(quantity);
                      if(subscription.products_limit >= quantity.count){
                        e.preventDefault();
                        $state.go('entityHours'); //TODO: Change to correct page
                      }
                    });
                   break;
               }
             }
           }
        }
    });
  });
