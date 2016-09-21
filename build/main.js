/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/build";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	module.exports = __webpack_require__(71);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	// require('ng-admin'); removed here and added back as a <script> tag to hep debugging - WebPack doesn't properly handle sourcemaps of dependencies yet
	// require('./api');
	
	'use strict';
	
	var adminApp = angular.module('adminApp', ['ng-admin', 'ngToast', 'ngAnimate']);
	
	// global custom api configuration
	adminApp.config(['$httpProvider', 'RestangularProvider', function ($httpProvider, RestangularProvider) {
	  var user_token = JSON.parse(localStorage.getItem('az_admin_login')).id;
	  RestangularProvider.setDefaultHeaders({ 'Authorization': user_token });
	  RestangularProvider.setFullResponse(true);
	  $httpProvider.defaults.useXDomain = true;
	  delete $httpProvider.defaults.headers.common['X-Requested-With'];
	}]);
	
	// custom API flavor
	var apiFlavor = __webpack_require__(2);
	adminApp.config(['RestangularProvider', apiFlavor.requestInterceptor]);
	adminApp.config(['RestangularProvider', apiFlavor.responseInterceptor]);
	
	// api flavours per module
	adminApp.config(['RestangularProvider', __webpack_require__(3).requestInterceptor]);
	adminApp.config(['RestangularProvider', __webpack_require__(3).responseInterceptor]);
	
	adminApp.config(['RestangularProvider', __webpack_require__(4).requestInterceptor]);
	adminApp.config(['RestangularProvider', __webpack_require__(4).responseInterceptor]);
	adminApp.config(['$httpProvider', __webpack_require__(4).httpInterceptor]);
	
	adminApp.config(['RestangularProvider', __webpack_require__(5).requestInterceptor]);
	
	adminApp.config(['RestangularProvider', __webpack_require__(6).requestInterceptor]);
	adminApp.config(['RestangularProvider', __webpack_require__(6).responseInterceptor]);
	
	adminApp.config(['RestangularProvider', __webpack_require__(7).responseInterceptor]);
	adminApp.config(['$httpProvider', __webpack_require__(7).httpInterceptor]);
	
	// custom 'amount' field type
	adminApp.config(['NgAdminConfigurationProvider', 'FieldViewConfigurationProvider', function (nga, fvp) {
	  nga.registerFieldType('amount', __webpack_require__(8));
	  fvp.registerFieldView('amount', __webpack_require__(12));
	}]);
	
	// custom directives
	adminApp.directive('makeOwner', __webpack_require__(13));
	adminApp.directive('entityImage', __webpack_require__(14));
	adminApp.directive('newEntityImage', __webpack_require__(15));
	adminApp.directive('activeEntity', __webpack_require__(16));
	adminApp.directive('deactiveEntity', __webpack_require__(17));
	adminApp.directive('services', __webpack_require__(18));
	adminApp.directive('payment', __webpack_require__(19));
	adminApp.directive('addClient', __webpack_require__(20));
	adminApp.directive('geo', __webpack_require__(21));
	adminApp.directive('addNewTag', __webpack_require__(22));
	adminApp.directive('subdomain', __webpack_require__(23));
	adminApp.directive('showSubdomain', __webpack_require__(24));
	adminApp.directive('messages', __webpack_require__(25));
	adminApp.directive('deleteRoom', __webpack_require__(26));
	adminApp.directive('roommate', __webpack_require__(27));
	adminApp.directive('publishFacebook', __webpack_require__(28));
	adminApp.directive('upload', __webpack_require__(29));
	adminApp.directive('imagenes', __webpack_require__(30));
	
	// custom controllers
	adminApp.controller('username', ['$scope', function ($scope) {
	  $scope.username = JSON.parse(localStorage.getItem('az_admin_user')).name || JSON.parse(localStorage.getItem('az_admin_user')).username;
	}]);
	
	// custom wysiwyg configuration (no permitir html tags en las opciones de formato)
	adminApp.config(function ($provide) {
	  $provide.decorator('taOptions', ['taRegisterTool', '$delegate', function (taRegisterTool, taOptions) {
	    taOptions.toolbar = [['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'pre', 'quote'], ['bold', 'italics', 'underline', 'strikeThrough', 'ul', 'ol', 'redo', 'undo'], ['justifyLeft', 'justifyCenter', 'justifyRight', 'indent', 'outdent']];
	    return taOptions;
	  }]);
	});
	
	// custom states (pages)
	adminApp.config(['$stateProvider', __webpack_require__(31)]);
	adminApp.controller('chatController', __webpack_require__(33));
	adminApp.config(['$stateProvider', __webpack_require__(34)]);
	adminApp.controller('entityTagsController', __webpack_require__(36));
	adminApp.config(['$stateProvider', __webpack_require__(37)]);
	adminApp.controller('entityImagesController', __webpack_require__(39));
	adminApp.config(['$stateProvider', __webpack_require__(40)]);
	adminApp.controller('entityHoursController', __webpack_require__(42));
	adminApp.config(['$stateProvider', __webpack_require__(43)]);
	adminApp.controller('detailAdvertController', __webpack_require__(45));
	adminApp.config(['$stateProvider', __webpack_require__(46)]);
	adminApp.controller('detailProductController', __webpack_require__(48));
	
	adminApp.config(['NgAdminConfigurationProvider', function (nga) {
	
	  urlBase = "http://104.131.113.114:3002/api/";
	  //var urlBase = "/api/";
	  localStorage.setItem('az_admin_api', urlBase);
	
	  var entity = null;
	
	  // create the admin application
	  var admin = nga.application('AZ Club Administración').baseApiUrl(urlBase);
	
	  admin.header(__webpack_require__(49));
	
	  if (JSON.parse(localStorage.getItem('az_admin_user')).superuser) {
	    // admin az config
	
	    admin.addEntity(nga.entity('categories'));
	    admin.addEntity(nga.entity('entities'));
	    admin.addEntity(nga.entity('adverts'));
	    admin.addEntity(nga.entity('tags'));
	    admin.addEntity(nga.entity('cities'));
	    admin.addEntity(nga.entity('states'));
	    admin.addEntity(nga.entity('usuarios'));
	    admin.addEntity(nga.entity('chatrooms'));
	
	    __webpack_require__(51)(nga, admin);
	    __webpack_require__(52)(nga, admin);
	    __webpack_require__(53)(nga, admin);
	    __webpack_require__(54)(nga, admin);
	    __webpack_require__(55)(nga, admin);
	    __webpack_require__(56)(nga, admin);
	    __webpack_require__(57)(nga, admin);
	
	    admin.dashboard(__webpack_require__(58)(nga, admin));
	    admin.menu(__webpack_require__(61)(nga, admin));
	  } else {
	    // entity owner config
	    if (!JSON.parse(localStorage.getItem('az_admin_user')).entityId) {
	      window.location = "./login.html";
	    } else {
	
	      adminApp.config(['RestangularProvider', __webpack_require__(62).requestInterceptor]);
	
	      // add entities
	      admin.addEntity(nga.entity('entities'));
	      admin.addEntity(nga.entity('adverts'));
	      admin.addEntity(nga.entity('tags'));
	      admin.addEntity(nga.entity('chatrooms'));
	      admin.addEntity(nga.entity('usuarios'));
	      admin.addEntity(nga.entity('clients'));
	
	      __webpack_require__(63)(nga, admin);
	      __webpack_require__(64)(nga, admin);
	      __webpack_require__(65)(nga, admin);
	      __webpack_require__(66)(nga, admin);
	      __webpack_require__(67)(nga, admin);
	      __webpack_require__(68)(nga, admin);
	
	      admin.dashboard(__webpack_require__(69)(nga, admin));
	      admin.menu(__webpack_require__(70)(nga, admin));
	    }
	  }
	
	  // attach the admin application to the DOM and execute it
	  nga.configure(admin);
	}]);
	
	adminApp.config(['ngToastProvider', function (ngToastProvider) {
	  console.log('pre');
	  ngToastProvider.configure({
	    animation: 'fade' // or 'fade'
	  });
	}]);

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	function requestInterceptor(RestangularProvider) {
	  // use the custom query parameters function to format the API request correctly
	  RestangularProvider.addFullRequestInterceptor(function (element, operation, what, url, headers, params) {
	
	    if (operation == 'getList') {
	
	      // Mapeando a API Loopback flavor
	      params.filter = {};
	
	      // where
	      if (params._filters) {
	
	        // Los modelos tienen que agregar los include en los permanentFilters
	
	        // guardo los include
	        var include = null;
	        if (params._filters.include) {
	          include = params._filters.include;
	          delete params._filters.include;
	        }
	
	        // primero limpio los filtros
	        var _filters = {};
	        for (var filter in params._filters) {
	          if (params._filters[filter]) {
	            _filters[filter] = params._filters[filter];
	          }
	        }
	
	        // ahora armo el string que voy a usar en el where REST
	        var filterString = "";
	
	        // si tengo más de un filtro agrego la adicion
	        var paramsCount = Object.keys(_filters).length;
	        if (paramsCount > 1) {
	          filterString = '{"and":[';
	        }
	
	        // ahora si contruyendo el objeto where, primero en un String
	        var index = 0;
	        for (var filter in _filters) {
	
	          // esta linea es la parte más harcodeada de todo el admin
	          if (filter == 'name' || filter == 'title' || filter == 'description' || filter == 'address') {
	            // para campos strings tengo que usar 'like'
	            filterString += '{"' + filter + '": { "like":"' + _filters[filter] + '", "options": "i" } }';
	          } else {
	            if (_filters[filter] === Object(_filters[filter])) {
	              // el filtro puede ser un objeto, como en el caso de cuando chequeamos si un campo existe o no en un modelo
	              filterString += '{"' + filter + '":' + JSON.stringify(_filters[filter]) + '}';
	            } else {
	              filterString += '{"' + filter + '":"' + _filters[filter] + '"}';
	            }
	          }
	
	          if (index != paramsCount - 1) {
	            filterString += ",";
	          }
	
	          index++;
	        }
	
	        if (paramsCount > 1) {
	          filterString += ']}';
	        }
	
	        // terminando, si había filtros, convierto el String a JSON y lo agrego al params
	        if (filterString.length) {
	          params.filter['where'] = JSON.parse(filterString);
	        }
	
	        // Agrego los include
	        if (include) {
	          params.filter['include'] = include;
	        }
	
	        delete params._filters;
	      }
	
	      // Paginación
	      if (params._page) {
	        var limit = params._perPage;
	        var offset = (params._page - 1) * params._perPage;
	        params.filter['limit'] = limit.toString();
	        params.filter['offset'] = offset.toString();
	        delete params._page;
	        delete params._perPage;
	      }
	
	      // Orden
	      if (params._sortField) {
	        params.filter['order'] = params._sortField + (params._sortDir ? params._sortDir : '');
	        delete params._sortField;
	        delete params._sortDir;
	      }
	
	      // if (headers['Content-Range']) {
	      //     headers['X-Total-Count'] = headers['Content-Range'].split('/').pop();
	      // }
	    }
	
	    return { params: params, headers: headers };
	  });
	}
	
	function responseInterceptor(RestangularProvider) {
	  RestangularProvider.addResponseInterceptor(function (data, operation, what, url, response) {
	    if (operation == "getList") {
	      var contentRange = response.headers('Content-Range');
	      if (contentRange) {
	        response.totalCount = contentRange.split('/')[1];
	      } else {
	        response.totalCount = 0;
	      }
	    }
	    return data;
	  });
	}
	
	exports['default'] = { requestInterceptor: requestInterceptor, responseInterceptor: responseInterceptor };
	module.exports = exports['default'];

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	function requestInterceptor(RestangularProvider) {
	  RestangularProvider.addFullRequestInterceptor(function (element, operation, what, url, headers, params, httpConfig) {
	
	    if (what == "categories") {
	      if (!params.filter) {
	        params['filter'] = {};
	      }
	
	      params.filter['include'] = ["cities"];
	    }
	
	    return { params: params };
	  });
	}
	
	function responseInterceptor(RestangularProvider) {
	  RestangularProvider.addResponseInterceptor(function (data, operation, what, url, response) {
	    if (operation == "get" && what == "categories") {
	      data.belongsToCity = [];
	      for (var i = 0; i < data.cities.length; i++) {
	        data.belongsToCity.push(data.cities[i].id);
	      }
	    }
	    return data;
	  });
	}
	
	exports['default'] = { requestInterceptor: requestInterceptor, responseInterceptor: responseInterceptor };
	module.exports = exports['default'];

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	function requestInterceptor(RestangularProvider) {
	  RestangularProvider.addFullRequestInterceptor(function (element, operation, what, url, headers, params, httpConfig) {
	
	    if (what == "entities") {
	
	      if (!params.filter) {
	        params['filter'] = {};
	      }
	
	      // modificar en entities backend, solo cuando se escribe (post-put)
	      // y viene un campo categories.
	      params.filter['include'] = ["categories", "tags", "subdomain", "city"];
	
	      if (operation == "put" || operation == "post") {
	        // deleting non-admin related properties
	        delete element.active;
	        delete element.userRank;
	        delete element.userLike;
	        delete element.photos;
	        delete element.logo;
	        delete element.dummy;
	        delete element.cover;
	        delete element.submit;
	      }
	    }
	
	    return { params: params };
	  });
	}
	
	function responseInterceptor(RestangularProvider) {
	  RestangularProvider.addResponseInterceptor(function (data, operation, what, url, response) {
	    if (operation == "get" && what == "entities") {
	      data.belongsToCategory = [];
	      for (var i = 0; i < data.categories.length; i++) {
	        data.belongsToCategory.push(data.categories[i].id);
	      }
	      data.hasTags = [];
	      for (var i = 0; i < data.tags.length; i++) {
	        data.hasTags.push(data.tags[i].id);
	      }
	    } else if (operation == "getList" && what == "entities") {
	      for (var i = 0; i < data.length; i++) {
	        if (data[i].subdomain && data[i].subdomain.id) {
	          data[i].hasSubdomain = true;
	        }
	      }
	    }
	    return data;
	  });
	}
	
	function httpInterceptor($httpProvider) {
	  $httpProvider.interceptors.push(function () {
	    return {
	      request: function request(config) {
	        if (config.url.indexOf('api/entities') != -1 && config.method === 'GET' && config.params && config.params.filter && config.params.filter.where) {
	          if (config.params.filter.where.categories) {
	            config.url = config.url.replace('entities', 'categories/' + config.params.filter.where.categories + '/entities');
	            delete config.params.filter.where;
	          } else if (config.params.filter.where.categoryId) {
	            config.url = config.url.replace('entities', 'categories/' + config.params.filter.where.categoryId + '/entities');
	            delete config.params.filter.where;
	          } else if (config.params.filter.where.tags) {
	            config.url = config.url.replace('entities', 'tags/' + config.params.filter.where.tags + '/entities');
	            delete config.params.filter.where;
	          } else if (config.params.filter.where.tagId) {
	            config.url = config.url.replace('entities', 'tags/' + config.params.filter.where.tagId + '/entities');
	            delete config.params.filter.where;
	          }
	        }
	
	        return config;
	      }
	    };
	  });
	}
	
	exports['default'] = { requestInterceptor: requestInterceptor, responseInterceptor: responseInterceptor, httpInterceptor: httpInterceptor };
	module.exports = exports['default'];

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	function requestInterceptor(RestangularProvider) {
	  RestangularProvider.addFullRequestInterceptor(function (element, operation, what, url, headers, params, httpConfig) {
	
	    if (what == "adverts" && (operation == 'get' || operation == 'getList')) {
	
	      if (!params.filter) {
	        params['filter'] = {};
	      }
	
	      params.filter['include'] = ["city"];
	    }
	
	    return { params: params };
	  });
	}
	
	exports['default'] = { requestInterceptor: requestInterceptor };
	module.exports = exports['default'];

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	function requestInterceptor(RestangularProvider) {
	  RestangularProvider.addFullRequestInterceptor(function (element, operation, what, url, headers, params, httpConfig) {
	
	    if (what == "tags" && operation == 'get') {
	
	      if (!params.filter) {
	        params['filter'] = {};
	      }
	
	      params.filter['include'] = ["entities"];
	    }
	
	    return { params: params };
	  });
	}
	
	function responseInterceptor(RestangularProvider) {
	  RestangularProvider.addResponseInterceptor(function (data, operation, what, url, response) {
	    if (operation == "get" && what == "tags") {
	      data.hasEntities = [];
	      for (var i = 0; i < data.entities.length; i++) {
	        data.hasEntities.push(data.entities[i].id);
	      }
	    }
	    return data;
	  });
	}
	
	exports['default'] = { requestInterceptor: requestInterceptor, responseInterceptor: responseInterceptor };
	module.exports = exports['default'];

/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	function responseInterceptor(RestangularProvider) {
	  RestangularProvider.addResponseInterceptor(function (data, operation, what, url, response) {
	    if (operation == "getList" && what == "chatrooms") {
	      for (var i = 0; i < data.length; i++) {
	        data[i].last_activity = new Date(data[i].last_activity);
	      }
	      data.sort(function (a, b) {
	        return new Date(b.last_activity) - new Date(a.last_activity);
	      });
	    }
	    return data;
	  });
	}
	
	function httpInterceptor($httpProvider) {
	  $httpProvider.interceptors.push(function () {
	    return {
	      request: function request(config) {
	        if (config.url.indexOf('api/chatrooms') != -1 && config.method === 'DELETE') {
	          var n = config.url.lastIndexOf('/') + 1;
	          var url = config.url.substring(0, n) + 'hide';
	          var roomId = config.url.substring(n, config.url.length);
	
	          config.method = 'PUT';
	          config.url = url;
	          if (!config.params) config.params = [];
	          config.params.id = roomId;
	        }
	
	        return config;
	      }
	    };
	  });
	}
	
	exports["default"] = { responseInterceptor: responseInterceptor, httpInterceptor: httpInterceptor };
	module.exports = exports["default"];

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _adminConfigLibFieldNumberField = __webpack_require__(9);
	
	var _adminConfigLibFieldNumberField2 = _interopRequireDefault(_adminConfigLibFieldNumberField);
	
	var AmountField = (function (_NumberField) {
	    _inherits(AmountField, _NumberField);
	
	    function AmountField(name) {
	        _classCallCheck(this, AmountField);
	
	        _get(Object.getPrototypeOf(AmountField.prototype), "constructor", this).call(this, name);
	        this._currency = '$';
	        this._type = "amount";
	        this._baseFormat = '0.00';
	        this._format = this._currency + this._baseFormat;
	    }
	
	    _createClass(AmountField, [{
	        key: "currency",
	        value: function currency(_currency) {
	            if (!arguments.length) return this._currency;
	            this._currency = _currency;
	            this._format = _currency + this._baseFormat;
	            return this;
	        }
	    }]);
	
	    return AmountField;
	})(_adminConfigLibFieldNumberField2["default"]);
	
	exports["default"] = AmountField;
	module.exports = exports["default"];

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _Field2 = __webpack_require__(10);
	
	var _Field3 = _interopRequireDefault(_Field2);
	
	var NumberField = (function (_Field) {
	    _inherits(NumberField, _Field);
	
	    function NumberField(name) {
	        _classCallCheck(this, NumberField);
	
	        _get(Object.getPrototypeOf(NumberField.prototype), "constructor", this).call(this, name);
	        this._type = "number";
	        this._format = undefined;
	    }
	
	    /**
	     * Specify format pattern for number to string conversion. 
	     *
	     * Based on NumeralJs, which uses a syntax similar to Excel.
	     *
	     * {@link} http://numeraljs.com/
	     * {@link} https://github.com/baumandm/angular-numeraljs
	     * {@example}
	     *
	     *     nga.field('height', 'number').format('$0,0.00');
	     */
	
	    _createClass(NumberField, [{
	        key: "format",
	        value: function format(value) {
	            if (!arguments.length) return this._format;
	            this._format = value;
	            return this;
	        }
	    }, {
	        key: "fractionSize",
	        value: function fractionSize(decimals) {
	            console.warn('NumberField.fractionSize() is deprecated, use NumberField.format() instead');
	            this.format('0.' + '0'.repeat(decimals));
	            return this;
	        }
	    }]);
	
	    return NumberField;
	})(_Field3["default"]);
	
	exports["default"] = NumberField;
	module.exports = exports["default"];

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var _UtilsStringUtils = __webpack_require__(11);
	
	var _UtilsStringUtils2 = _interopRequireDefault(_UtilsStringUtils);
	
	var Field = (function () {
	    function Field(name) {
	        _classCallCheck(this, Field);
	
	        this._name = name || Math.random().toString(36).substring(7);
	        this._detailLink = name === 'id';
	        this._type = "string";
	        this._order = null;
	        this._label = null;
	        this._maps = [];
	        this._transforms = [];
	        this._attributes = {};
	        this._cssClasses = null;
	        this._validation = { required: false, minlength: 0, maxlength: 99999 };
	        this._defaultValue = null;
	        this._editable = true;
	        this._detailLinkRoute = 'edit';
	        this._pinned = false;
	        this._flattenable = true;
	        this.dashboard = true;
	        this.list = true;
	        this._template = function () {
	            return '';
	        };
	    }
	
	    _createClass(Field, [{
	        key: "label",
	        value: function label() {
	            if (arguments.length) {
	                this._label = arguments[0];
	                return this;
	            }
	
	            if (this._label === null) {
	                return _UtilsStringUtils2["default"].camelCase(this._name);
	            }
	
	            return this._label;
	        }
	    }, {
	        key: "type",
	        value: function type() {
	            return this._type;
	        }
	    }, {
	        key: "name",
	        value: function name() {
	            if (arguments.length) {
	                this._name = arguments[0];
	                return this;
	            }
	
	            return this._name;
	        }
	    }, {
	        key: "order",
	        value: function order() {
	            if (arguments.length) {
	                if (arguments[1] !== true) {
	                    console.warn('Setting order with Field.order is deprecated, order directly in fields array');
	                }
	                this._order = arguments[0];
	                return this;
	            }
	
	            return this._order;
	        }
	    }, {
	        key: "isDetailLink",
	        value: function isDetailLink(detailLink) {
	            if (arguments.length) {
	                this._detailLink = arguments[0];
	                return this;
	            }
	
	            if (this._detailLink === null) {
	                return this._name === 'id';
	            }
	
	            return this._detailLink;
	        }
	    }, {
	        key: "map",
	
	        /**
	         * Add a function to be applied to the response object to turn it into an entry
	         */
	        value: function map(fn) {
	            if (!fn) return this._maps;
	            if (typeof fn !== "function") {
	                var type = typeof fn;
	                throw new Error("Map argument should be a function, " + type + " given.");
	            }
	
	            this._maps.push(fn);
	
	            return this;
	        }
	    }, {
	        key: "hasMaps",
	        value: function hasMaps() {
	            return !!this._maps.length;
	        }
	    }, {
	        key: "getMappedValue",
	        value: function getMappedValue(value, entry) {
	            for (var i in this._maps) {
	                value = this._maps[i](value, entry);
	            }
	
	            return value;
	        }
	
	        /**
	         * Add a function to be applied to the entry to turn it into a response object
	         */
	    }, {
	        key: "transform",
	        value: function transform(fn) {
	            if (!fn) return this._transforms;
	            if (typeof fn !== "function") {
	                var type = typeof fn;
	                throw new Error("transform argument should be a function, " + type + " given.");
	            }
	
	            this._transforms.push(fn);
	
	            return this;
	        }
	    }, {
	        key: "hasTranforms",
	        value: function hasTranforms() {
	            return !!this._transforms.length;
	        }
	    }, {
	        key: "getTransformedValue",
	        value: function getTransformedValue(value, entry) {
	            for (var i in this._transforms) {
	                value = this._transforms[i](value, entry);
	            }
	
	            return value;
	        }
	    }, {
	        key: "attributes",
	        value: function attributes(_attributes) {
	            if (!arguments.length) {
	                return this._attributes;
	            }
	
	            this._attributes = _attributes;
	
	            return this;
	        }
	    }, {
	        key: "cssClasses",
	        value: function cssClasses(classes) {
	            if (!arguments.length) return this._cssClasses;
	            this._cssClasses = classes;
	            return this;
	        }
	    }, {
	        key: "getCssClasses",
	        value: function getCssClasses(entry) {
	            if (!this._cssClasses) {
	                return '';
	            }
	
	            if (this._cssClasses.constructor === Array) {
	                return this._cssClasses.join(' ');
	            }
	
	            if (typeof this._cssClasses === 'function') {
	                return this._cssClasses(entry);
	            }
	
	            return this._cssClasses;
	        }
	    }, {
	        key: "validation",
	        value: function validation(_validation) {
	            if (!arguments.length) {
	                return this._validation;
	            }
	
	            for (var property in _validation) {
	                if (!_validation.hasOwnProperty(property)) continue;
	                if (_validation[property] === null) {
	                    delete this._validation[property];
	                } else {
	                    this._validation[property] = _validation[property];
	                }
	            }
	
	            return this;
	        }
	    }, {
	        key: "defaultValue",
	        value: function defaultValue(_defaultValue) {
	            if (!arguments.length) return this._defaultValue;
	            this._defaultValue = _defaultValue;
	            return this;
	        }
	    }, {
	        key: "editable",
	        value: function editable(_editable) {
	            if (!arguments.length) return this._editable;
	            this._editable = _editable;
	            return this;
	        }
	    }, {
	        key: "detailLinkRoute",
	        value: function detailLinkRoute(route) {
	            if (!arguments.length) return this._detailLinkRoute;
	            this._detailLinkRoute = route;
	            return this;
	        }
	    }, {
	        key: "pinned",
	        value: function pinned(_pinned) {
	            if (!arguments.length) return this._pinned;
	            this._pinned = _pinned;
	            return this;
	        }
	    }, {
	        key: "flattenable",
	        value: function flattenable() {
	            return this._flattenable;
	        }
	    }, {
	        key: "getTemplateValue",
	        value: function getTemplateValue(data) {
	            if (typeof this._template === 'function') {
	                return this._template(data);
	            }
	
	            return this._template;
	        }
	    }, {
	        key: "template",
	        value: function template(_template) {
	            if (!arguments.length) return this._template;
	            this._template = _template;
	            return this;
	        }
	    }, {
	        key: "detailLink",
	        set: function set(isDetailLink) {
	            return this._detailLink = isDetailLink;
	        }
	    }]);
	
	    return Field;
	})();
	
	exports["default"] = Field;
	module.exports = exports["default"];

/***/ },
/* 11 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	exports['default'] = {
	    /**
	     * @see http://stackoverflow.com/questions/10425287/convert-string-to-camelcase-with-regular-expression
	     * @see http://phpjs.org/functions/ucfirst/
	     */
	    camelCase: function camelCase(text) {
	        if (!text) {
	            return text;
	        }
	
	        var f = text.charAt(0).toUpperCase();
	        text = f + text.substr(1);
	
	        return text.replace(/[-_.\s](.)/g, function (match, group1) {
	            return ' ' + group1.toUpperCase();
	        });
	    }
	};
	module.exports = exports['default'];

/***/ },
/* 12 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	exports['default'] = {
	    getReadWidget: function getReadWidget() {
	        return '<ma-number-column field="::field" value="::entry.values[field.name()]"></ma-number-column>';
	    },
	    getLinkWidget: function getLinkWidget() {
	        return '<a ng-click="gotoDetail()">' + module.exports.getReadWidget() + '</a>';
	    },
	    getFilterWidget: function getFilterWidget() {
	        return '<ma-input-field type="number" step="any" field="::field" value="values[field.name()]"></ma-input-field>';
	    },
	    getWriteWidget: function getWriteWidget() {
	        return '<div class="input-group"><span class="input-group-addon">{{ field.currency() }}</span><ma-input-field type="number" step="any" field="::field" value="entry.values[field.name()]"></ma-input-field></div>';
	    }
	};
	module.exports = exports['default'];

/***/ },
/* 13 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	function makeOwner() {
	  'use strict';
	
	  return {
	    restrict: 'E',
	    scope: {
	      entity: "&"
	    },
	    link: function link(scope, elem, attrs) {
	      scope.entity = scope.entity();
	      scope.status = attrs.status;
	    },
	    template: '<a class="btn btn-outline btn-success" ng-click="makeOwner()"><span class="glyphicon glyphicon-thumbs-up" aria-hidden="true"></span>&nbsp;Crear Dueño</a>'
	  };
	}
	
	exports['default'] = makeOwner;
	module.exports = exports['default'];

/***/ },
/* 14 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	function entityImage($http) {
	  'use strict';
	
	  return {
	    restrict: 'E',
	    link: function link(scope, elem, attrs) {
	
	      console.log(scope);
	
	      scope.hovered = false;
	      scope.target = attrs.target;
	      scope.showActions = true;
	      scope.nullcontainer = false;
	
	      if (attrs.view && attrs.view == 'show') {
	        scope.showActions = false;
	      }
	
	      if (scope.entry._entityName == 'adverts' && !scope.entry.values['entityId']) {
	        scope.nullcontainer = true;
	      }
	
	      var target;
	      if (attrs.target != 'photo' && attrs.target != 'advert') {
	        target = attrs.target + ".image";
	      } else {
	        target = '';
	      }
	
	      console.log('log', scope.entry);
	
	      // ejemplo: category_5548123d92bc492a345sf345
	      var containerName = "";
	      switch (scope.entry._entityName) {
	        case "categories":
	          containerName = "category" + "_" + scope.entry.values['id'];;
	          break;
	        case "entities":
	          containerName = "entity" + "_" + scope.entry.values['id'];
	          break;
	        case "adverts":
	          containerName = "entity" + "_" + scope.entry.values['entityId'];
	          break;
	        case "usuarios":
	          containerName = "usuario" + "_" + scope.entry.values['id'];
	          break;
	      }
	
	      if (attrs.name) {
	        containerName = "entity_" + JSON.parse(localStorage.getItem('az_admin_user')).entityId;
	      }
	
	      var containerUrl = urlBase + 'containers/' + containerName;
	
	      // existen imagenes?
	      scope.images = [];
	      $http.get(containerUrl + '/files/' + target).success(function (files) {
	        switch (files.constructor) {
	
	          case Array:
	            files.sort(function (a, b) {
	              return new Date(a.ctime) - new Date(b.ctime);
	            });
	
	            for (var i = 0; i < files.length; i++) {
	              // por cada archivo del container
	
	              if (attrs.target === 'advert') {
	
	                // cargo solo la imagen que corresponde a este advert
	                if (files[i].name.indexOf(scope.entry.values['id']) != -1) {
	                  scope.images.push({ 'name': files[i].name, 'src': containerUrl + '/download/' + files[i].name });
	                  break;
	                }
	              } else {
	
	                if (attrs.target === 'photo') {
	                  if (files[i].name.indexOf('photo') != -1) {
	                    scope.images.push({ 'name': files[i].name, 'src': containerUrl + '/download/' + files[i].name });
	                  }
	                }
	              }
	            }
	            break;
	          case Object:
	            scope.images.push({ 'name': files.name, 'src': containerUrl + '/download/' + files.name });
	            break;
	        }
	      });
	
	      scope.removeImage = function (image) {
	        $http['delete'](containerUrl + '/files/' + image).success(function (data) {
	          for (var i = scope.images.length - 1; i >= 0; i--) {
	            if (scope.images[i].name === image) {
	              scope.images.splice(i, 1);
	            }
	          }
	          if (target == "advert") {
	            scope.$apply(function () {
	              scope.entry.values['banner_url'] = "";
	            });
	          }
	        });
	      };
	
	      console.log(1, scope.images);
	
	      scope.uploadImage = function ($file) {
	        if (!$file) {
	          return false;
	        }
	
	        var formData = new FormData();
	        formData.append('file', $file);
	
	        var url = containerUrl + '/upload?type=' + attrs.target;
	        if (attrs.target === 'advert') {
	          url += '&advertId=' + scope.entry.values['id'];
	        }
	
	        // Para upload es necesario usar jquery ajax con FormData object
	        $.ajax({
	          url: url,
	          type: 'POST',
	          data: formData,
	          processData: false,
	          contentType: false,
	          success: function success(res, _success) {
	            if (_success) {
	              scope.$apply(function () {
	                if (!attrs.multi) {
	                  scope.images = [];
	                }
	                var new_image = { 'name': res.result.files.file[0].name, 'src': containerUrl + '/download/' + res.result.files.file[0].name + '?decache=' + Math.random() };
	                scope.images.push(new_image);
	                if (target == "advert") {
	                  scope.$apply(function () {
	                    scope.entry.values['banner_url'] = new_image.src;
	                  });
	                }
	              });
	            }
	          }
	        });
	      };
	    },
	    template: '<div style="display:block;">\n          <div class="image-list">\n            <div ng-repeat="img in images" class="image-container" ng-mouseover="hovered = true" ng-mouseleave="hovered = false">\n              <div class="img-actions" ng-show="hovered && showActions">\n                <button class="btn btn-danger-outline glyphicon glyphicon-trash pull-right" ng-click="removeImage(img.name)"></button>\n              </div>\n              <img class="image" name="{{img.name}}" ng-src="{{img.src}}"/>\n            </div>\n          </div>\n\n          <button\n            ng-if="!nullcontainer && showActions"\n            ngf-select="uploadImage($file)"\n            class="btn btn-default upload glyphicon glyphicon-picture">\n          </button>\n          <p ng-if="nullcontainer">El anuncio debe estar creado antes de poder subir un archivo</p>\n        </div>'
	  };
	}
	
	entityImage.$inject = ['$http'];
	
	exports['default'] = entityImage;
	module.exports = exports['default'];

/***/ },
/* 15 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	function newEntityImage($http) {
	  'use strict';
	
	  return {
	    restrict: 'E',
	    scope: true,
	    link: function link(scope, elem, attrs) {
	
	      console.log(scope);
	
	      scope.hovered = false;
	      scope.target = attrs.target;
	      scope.showActions = true;
	      scope.nullcontainer = false;
	
	      if (attrs.view && attrs.view == 'show') {
	        scope.showActions = false;
	      }
	
	      // if(scope.entry._entityName=='adverts'&&!scope.entry.values['entityId']) {
	      //   scope.nullcontainer = true;
	      // }
	
	      var target;
	      if (attrs.target != 'photo' && attrs.target != 'advert') {
	        target = attrs.target + ".image";
	      } else {
	        target = '';
	      }
	
	      console.log('log', scope.entry);
	
	      // ejemplo: category_5548123d92bc492a345sf345
	      var containerName = "";
	      // switch (scope.entry._entityName) {
	      //   case "categories":
	      //     containerName = "category" + "_" + scope.entry.values['id'];;
	      //     break;
	      //   case "entities":
	      //     containerName = "entity" + "_" + scope.entry.values['id'];
	      //     break;
	      //   case "adverts":
	      //     containerName = "entity" + "_" + scope.entry.values['entityId'];
	      //     break;
	      //   case "usuarios":
	      //     containerName = "usuario" + "_" + scope.entry.values['id'];
	      //     break;
	      // }
	
	      if (attrs.name) {
	        containerName = "entity_" + JSON.parse(localStorage.getItem('az_admin_user')).entityId;
	      }
	
	      var containerUrl = urlBase + 'containers/' + containerName;
	
	      console.log('ASD', containerUrl);
	
	      // existen imagenes?
	      scope.images = [];
	      $http.get(containerUrl + '/files/' + target).success(function (files) {
	        switch (files.constructor) {
	
	          case Array:
	            files.sort(function (a, b) {
	              return new Date(a.ctime) - new Date(b.ctime);
	            });
	
	            for (var i = 0; i < files.length; i++) {
	              // por cada archivo del container
	
	              if (attrs.target === 'advert') {
	
	                // cargo solo la imagen que corresponde a este advert
	                // if(files[i].name.indexOf(scope.entry.values['id'])!=-1) {
	                //   scope.images.push({'name':files[i].name,'src':containerUrl + '/download/' + files[i].name});
	                //   break;
	                // }
	              } else {
	
	                  if (attrs.target === 'photo') {
	                    if (files[i].name.indexOf('photo') != -1) {
	                      scope.images.push({ 'name': files[i].name, 'src': containerUrl + '/download/' + files[i].name });
	                    }
	                  }
	                }
	            }
	            break;
	          case Object:
	            scope.images.push({ 'name': files.name, 'src': containerUrl + '/download/' + files.name });
	            break;
	        }
	      });
	
	      scope.removeImage = function (image) {
	        $http['delete'](containerUrl + '/files/' + image).success(function (data) {
	          for (var i = scope.images.length - 1; i >= 0; i--) {
	            if (scope.images[i].name === image) {
	              scope.images.splice(i, 1);
	            }
	          }
	          if (target == "advert") {
	            // scope.$apply(function(){
	            //   scope.entry.values['banner_url'] = "";
	            // });
	          }
	        });
	      };
	
	      scope.uploadImage = function ($file) {
	        if (!$file) {
	          return false;
	        }
	
	        var formData = new FormData();
	        formData.append('file', $file);
	
	        var url = containerUrl + '/upload?type=' + attrs.target;
	        // if(attrs.target==='advert') {
	        //   url += '&advertId='+scope.entry.values['id'];
	        // }
	
	        // Para upload es necesario usar jquery ajax con FormData object
	        $.ajax({
	          url: url,
	          type: 'POST',
	          data: formData,
	          processData: false,
	          contentType: false,
	          success: function success(res, _success) {
	            if (_success) {
	              scope.$apply(function () {
	                if (!attrs.multi) {
	                  scope.images = [];
	                }
	                var new_image = { 'name': res.result.files.file[0].name, 'src': containerUrl + '/download/' + res.result.files.file[0].name + '?decache=' + Math.random() };
	                scope.images.push(new_image);
	                if (target == "advert") {
	                  // scope.$apply(function(){
	                  //   scope.entry.values['banner_url'] = new_image.src;
	                  // });
	                }
	              });
	            }
	          }
	        });
	      };
	    },
	    template: '<div style="display:block;">\n          <div class="image-list">\n            <div ng-repeat="img in images" class="image-container" ng-mouseover="hovered = true" ng-mouseleave="hovered = false">\n              <div class="img-actions" style="position: absolute; padding: 5px;" ng-show="hovered && showActions">\n                <button class="btn btn-danger-outline glyphicon glyphicon-trash pull-right" ng-click="removeImage(img.name)"></button>\n              </div>\n              <img class="image" ng-if="target == \'logo\'" name="{{img.name}}" width="150"  height="150"ng-src="{{img.src}}"/>\n              <img class="image" ng-if="target == \'cover\'" name="{{img.name}}" width="100%" height="300" ng-src="{{img.src}}"/>\n              <img class="image" ng-if="target == \'webcover\'"name="{{img.name}}" width="100%" height="300" ng-src="{{img.src}}"/>\n              <img class="image" ng-if="target == \'photo\'"name="{{img.name}}" width="300" height="150" style="margin: 5px; float: left;" ng-src="{{img.src}}"/>\n            </div>\n          </div>\n\n          <button\n            ng-if="!nullcontainer && showActions"\n            ngf-select="uploadImage($file)"\n            class="btn btn-default upload glyphicon glyphicon-picture">\n          </button>\n          <p ng-if="nullcontainer">El anuncio debe estar creado antes de poder subir un archivo</p>\n        </div>'
	  };
	}
	
	newEntityImage.$inject = ['$http'];
	
	exports['default'] = newEntityImage;
	module.exports = exports['default'];

/***/ },
/* 16 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	function activeEntity($http) {
	  'use strict';
	
	  return {
	    restrict: 'E',
	    scope: {
	      entry: "&"
	    },
	    link: function link(scope, elem, attrs) {
	
	      var user_token = JSON.parse(localStorage.getItem('az_admin_login')).id;
	
	      scope.entidad = scope.entry().values;
	      scope.activeEntity = function () {
	        $http.post(urlBase + 'entities/activation?access_token=' + user_token, { entityId: scope.entidad.id, activate: true }).success(function (data) {
	          scope.entidad.active = true;
	        }).error(function (err) {
	          console.error(err);
	        });
	      };
	    },
	    template: '<a class="btn btn-success btn-xs" ng-click="activeEntity()" ng-disabled="!entidad.hasSubdomain" >\n        <span class="glyphicon glyphicon-ok-sign" aria-hidden="true"></span>&nbsp;Activar\n      </a>'
	  };
	}
	
	activeEntity.$inject = ['$http'];
	
	exports['default'] = activeEntity;
	module.exports = exports['default'];

/***/ },
/* 17 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	function unactiveEntity($http) {
	  'use strict';
	
	  return {
	    restrict: 'E',
	    scope: {
	      entity: "&"
	    },
	    link: function link(scope, elem, attrs) {
	
	      var user_token = JSON.parse(localStorage.getItem('az_admin_login')).id;
	
	      scope.entity = scope.entity().values;
	      scope.deactiveEntity = function () {
	        $http.post(urlBase + 'entities/activation?access_token=' + user_token, { entityId: scope.entity.id, activate: false }).success(function (data) {
	          scope.entity.active = false;
	        }).error(function (err) {
	          console.error(err);
	        });
	      };
	    },
	    template: '<a class="btn btn-danger btn-xs" ng-click="deactiveEntity()">\n          <span class="glyphicon glyphicon-remove-sign" aria-hidden="true"></span>&nbsp;Desactivar\n        </a>'
	  };
	}
	
	unactiveEntity.$inject = ['$http'];
	
	exports['default'] = unactiveEntity;
	module.exports = exports['default'];

/***/ },
/* 18 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	function services() {
	    'use strict';
	
	    return {
	        restrict: 'EA',
	        template: '<div style="text-align: center;">\n        \t<h4 style="color: #6295A6;">Arrastá las imágenes de los Servicios que tiene tu comercio</h4>\n        \t<div style="background:gray;">\n        \t\t<img src="http://104.131.113.114:3004/api/containers/app/download/icono18.png" width="50" alt="">\n        \t\t<img src="http://104.131.113.114:3004/api/containers/app/download/icono24hs.png" width="50" alt="">\n        \t\t<img src="http://104.131.113.114:3004/api/containers/app/download/iconoambiente.png" width="50" alt="">\n        \t\t<img src="http://104.131.113.114:3004/api/containers/app/download/iconoenvios.png" width="50" alt="">\n        \t\t<img src="http://104.131.113.114:3004/api/containers/app/download/iconodiscapacidad.png" width="50" alt="">\n        \t\t<img src="http://104.131.113.114:3004/api/containers/app/download/iconofumadores.png" width="50" alt="">\n        \t\t<img src="http://104.131.113.114:3004/api/containers/app/download/iconokinder.png" width="50" alt="">\n        \t\t<img src="http://104.131.113.114:3004/api/containers/app/download/iconowifi.png" width="50" alt="">\n        \t\t<img src="http://104.131.113.114:3004/api/containers/app/download/iconomascotas.png" width="50" alt="">\n        \t\t<img src="http://104.131.113.114:3004/api/containers/app/download/iconoe.png" width="50" alt="">\n        \t\t<img src="http://104.131.113.114:3004/api/containers/app/download/iconoservice.png" width="50" alt="">\n        \t</div>\n        </div>'
	    };
	}
	
	exports['default'] = services;
	module.exports = exports['default'];

/***/ },
/* 19 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	function payment() {
	    'use strict';
	
	    return {
	        restrict: 'EA',
	        template: '<div style="text-align: center;">\n        \t<h4 style="color: #6295A6;">Arrastá cualquiera de las formas de pago y describí las condiciones</h4>\n        \t<img src="http://104.131.113.114:3004/api/containers/app/download/efectivo.png"  alt="">\n        \t<img src="http://104.131.113.114:3004/api/containers/app/download/debito.png"  alt="">\n        \t<img src="http://104.131.113.114:3004/api/containers/app/download/visa.png" alt="">\n        \t<img src="http://104.131.113.114:3004/api/containers/app/download/master.png"  alt="">\n        \t<img src="http://104.131.113.114:3004/api/containers/app/download/naranja.png" alt="">\n        \t<img src="http://104.131.113.114:3004/api/containers/app/download/shoping.png" alt="">\n        \t<img src="http://104.131.113.114:3004/api/containers/app/download/american.png"  alt="">\n        \t<img src="http://104.131.113.114:3004/api/containers/app/download/ahora12.png"  alt="">\n        \t<img src="http://104.131.113.114:3004/api/containers/app/download/argenta.png"  alt="">\n        \t<img src="http://104.131.113.114:3004/api/containers/app/download/cabal.png"  alt="">\n        \t<img src="http://104.131.113.114:3004/api/containers/app/download/cencosud.png"  alt="">\n        \t<img src="http://104.131.113.114:3004/api/containers/app/download/nativa.png"  alt="">\n        </div>'
	    };
	}
	
	exports['default'] = payment;
	module.exports = exports['default'];

/***/ },
/* 20 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	function addFavoriteClient($http, $rootScope) {
	  'use strict';
	
	  return {
	    restrict: 'EA',
	    controller: function controller($scope, $location) {
	
	      var user_token = JSON.parse(localStorage.getItem('az_admin_login')).id;
	      var entityId = JSON.parse(localStorage.getItem('az_admin_user')).entityId;
	
	      $scope.add = function () {
	        $http.post(urlBase + "clients?access_token=" + user_token, {
	          entityId: entityId,
	          usuarioId: $scope.entry.values['with'],
	          chatroomId: $scope.entry.values.id
	        }).success(function (response) {
	          $http.put(urlBase + "chatrooms/" + $scope.entry.values.id + "?access_token=" + user_token, {
	            clients: response.id
	          }).success(function (data) {
	            $scope.entry.values.clients = data.clients;
	          }).error(function (data) {
	            console.error(data);
	          });
	        }).error(function (data) {
	          console.error(data);
	        });
	      };
	
	      $scope.remove = function () {
	        $http['delete'](urlBase + "clients/" + $scope.entry.values.clients + "?access_token=" + user_token).success(function (response) {
	          $http.put(urlBase + "chatrooms/" + $scope.entry.values.id + "?access_token=" + user_token, {
	            clients: ""
	          }).success(function (data) {
	            $scope.entry.values.clients = null;
	          }).error(function (data) {
	            console.error(data);
	          });
	        }).error(function (data) {
	          console.error(data);
	        });
	      };
	    },
	    template: '<a ng-if="!entry.values.clients" class="btn btn-xs btn-info" ng-click="add(entry.values.id)" title="Agregar como cliente favorito">\n          <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>&nbsp;Cliente Favorito</a>\n         <a ng-if="entry.values.clients" class="btn btn-xs btn-danger" ng-click="remove(entry.values.id)" title="Cancelar cliente favorito">\n          <span class="glyphicon glyphicon-minus" aria-hidden="true"></span>&nbsp;Cliente Favorito</a>'
	  };
	}
	
	addFavoriteClient.$inject = ['$http', '$rootScope'];
	
	exports['default'] = addFavoriteClient;
	module.exports = exports['default'];

/***/ },
/* 21 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	function geo($http) {
	  'use strict';
	
	  return {
	    restrict: 'EA',
	    controller: function controller($scope, $http) {
	
	      // <div id="map"></div> ng-show="entry.values.geopoint"
	      // var map = new google.maps.Map(document.getElementById('map'), {
	      //   zoom: 8,
	      //   center: {lat: -34.397, lng: 150.644}
	      // });
	
	      var API_KEY = "AIzaSyAMdV-HX0rtJd1njvA714X8mE1-ge--9EI";
	      var geocoder = new google.maps.Geocoder();
	
	      if ($scope.entry.values['geopoint.lat'] != '' && $scope.entry.values['geopoint.lng'] != '') {
	        $scope.resultado = 'Posee Geolocalización [' + $scope.entry.values['geopoint.lat'] + ',' + $scope.entry.values['geopoint.lng'] + ']';
	      } else {
	        $scope.resultado = 'No ha sido geolocalizado aún.';
	      }
	
	      $scope.geoLocate = function () {
	
	        $scope.resultado = 'Buscando...';
	
	        var address = "";
	
	        if ($scope.entry._entityName == "cities") {
	
	          address = $scope.entry.values.name + "," + $scope.form.stateId.$viewValue.label;
	
	          geocoder.geocode({ 'address': address }, function (results, status) {
	
	            if (status === google.maps.GeocoderStatus.OK) {
	
	              var lat = results[0].geometry.location.lat();
	              var lng = results[0].geometry.location.lng();
	
	              $scope.entry.values['geopoint'] = {
	                lat: lat, lng: lng
	              };
	
	              $scope.$apply(function () {
	                $scope.resultado = "Geolocalización encontrada! " + address + ": [" + lat + "," + lng + "] - Presione guardar para mantener los cambios.";
	              });
	            } else {
	              $scope.$apply(function () {
	                $scope.resultado = "Geolocalización no encontrada.";
	              });
	            }
	          });
	        } else if ($scope.entry._entityName == "entities") {
	
	          address = $scope.entry.values['address'], city = $scope.entry.values['city.name'], state = null;
	
	          $http.get(urlBase + 'states/' + $scope.entry.values['city.stateId']).success(function (state) {
	
	            var fullAddress = address + ', ' + city + ', ' + state.name;
	
	            geocoder.geocode({ 'address': fullAddress }, function (results, status) {
	
	              if (status == google.maps.GeocoderStatus.OK && results.length == 1 && results[0].types[0] == "street_address") {
	
	                var lat = results[0].geometry.location.lat();
	                var lng = results[0].geometry.location.lng();
	
	                $scope.entry.values['geopoint'] = {
	                  lat: lat,
	                  lng: lng
	                };
	
	                $scope.$apply(function () {
	                  $scope.resultado = "Geolocalización encontrada! " + fullAddress + ": [" + lat + "," + lng + "] - Presione guardar para mantener los cambios.";
	                  // $("#submitForm").click();
	                });
	              } else {
	                  $scope.$apply(function () {
	                    $scope.resultado = "Geolocalización no encontrada, por favor chequee la dirección ingresada!";
	                  });
	                }
	            });
	          }).error(function (err) {
	            geocoder.geocode({ 'address': address + ',' + city }, function (results, status) {
	              if (status == google.maps.GeocoderStatus.OK) {
	                var lat = results[0].geometry.location.lat();
	                var lng = results[0].geometry.location.lng();
	
	                $scope.entry.values['geopoint'] = {
	                  lat: lat,
	                  lng: lng
	                };
	
	                $scope.$apply(function () {
	                  $scope.resultado = lat + "," + lng;
	                });
	              } else {
	
	                $scope.$apply(function () {
	                  $scope.resultado = "No encontrado... :(";
	                });
	              }
	            });
	          });
	        }
	      };
	    },
	    template: '<button type="button" class="btn button-success" ng-click="geoLocate()" class="btn btn-default">Buscar</button><p style="padding:10px;font-style:italic;">{{resultado}}</p>'
	  };
	}
	
	geo.$inject = ['$http'];
	
	exports['default'] = geo;
	module.exports = exports['default'];

/***/ },
/* 22 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	function addNewTag($http, $rootScope) {
	  'use strict';
	
	  return {
	    restrict: 'E',
	    scope: {
	      entry: "&",
	      datastore: "&"
	    },
	    link: function link(scope, elem, attrs) {
	
	      scope.tagName = "";
	      scope.isValid = true;
	
	      var RegExpression = /^[a-zA-Z\s]{3,20}$/;
	
	      scope.valid = function () {
	        scope.isValid = RegExpression.test(scope.tagName);
	      };
	
	      var userId = JSON.parse(localStorage.getItem('az_admin_user')).id;
	      var user_token = JSON.parse(localStorage.getItem('az_admin_login')).id;
	
	      // aca buscar los arrays de scope.datastore() que tienen la palabra tags, y agregarle la nueva tag
	      //
	      // var newChoice = scope.datastore()._entries.tags_2_choices[0];
	      // newChoice._identifierValue = tag.id;
	      // newChoice.values.id = tag.id;
	      // newChoice.values.name = tag.name;
	      // newChoice.values.description = tag.description;
	      // newChoice.values.ownerId = tag.ownerId;
	      // scope.datastore()._entries.tags_2_choices.push(newChoice);
	      // scope.datastore()._entries.tags_2_values.push(newChoice);
	
	      console.log('voy a agregar esto!');
	      console.log(scope.datastore());
	
	      var modelChoice = null;
	      for (var key in scope.datastore()._entries) {
	        console.log(key);
	        if (key.includes("tags") && key.includes("choices")) {
	          modelChoice = scope.datastore()._entries[key][0];
	          modelChoice._identifierValue = '999';
	          modelChoice.values.id = '999';
	          modelChoice.values.name = '999';
	          modelChoice.values.description = '999';
	          modelChoice.values.ownerId = '999';
	
	          console.log('agregando', modelChoice);
	        }
	
	        if (modelChoice != null && key.includes("tags")) {
	          console.log('y ahora aca a');
	          scope.datastore()._entries[key].push(modelChoice);
	          console.log('a', key);
	          console.log(scope.datastore()._entries[key]);
	        } else {
	          console.log('modelChoice es null para', key);
	        }
	      }
	
	      console.log('llamando a update');
	      $rootScope.$broadcast('choices:update');
	
	      scope.addTag = function () {
	
	        if (!scope.tagName.length) return;
	
	        $http.post(urlBase + 'tags?access_token=' + user_token, { name: scope.tagName, ownerId: userId }).success(function (tag) {
	          console.log(tag);
	
	          $http.put(urlBase + 'tags/' + tag.id + '/entities/rel/' + scope.entry().values.id + '?access_token=' + user_token).success(function (rel) {
	            scope.entry().values.tags.push(tag);
	            scope.entry().values.hasTags.push(tag.id);
	            scope.tagName = '';
	
	            $http.get(urlBase + 'tags?access_token=' + user_token).success(function (tags) {
	              var initialChoices = [];
	              for (var i = 0; i < tags.length; i++) {
	                if (scope.entry().values.hasTags.indexOf(tags[i].id) == -1) {
	                  initialChoices.push({ value: tags[i].id, label: tags[i].name });
	                }
	              }
	
	              initialChoices.push({ value: tag.id, label: tag.name });
	              $rootScope.$broadcast('choices:update', { choices: initialChoices });
	
	              var newChoice = scope.datastore()._entries.tags_2_choices[0];
	              newChoice._identifierValue = tag.id;
	              newChoice.values.id = tag.id;
	              newChoice.values.name = tag.name;
	              newChoice.values.description = tag.description;
	              newChoice.values.ownerId = tag.ownerId;
	              scope.datastore()._entries.tags_2_choices.push(newChoice);
	              scope.datastore()._entries.tags_2_values.push(newChoice);
	            }).error(function (err) {
	              console.error(err);
	            });
	          }).error(function (err) {
	            console.error(err);
	          });
	        }).error(function (err) {
	          console.error(err);
	        });
	      };
	    },
	    template: '<div class="row">\n        <div class="col-md-12 pull-right">\n          <div class="input-group" ng-class="{\'has-error\': !isValid }">\n            <span class="input-group-addon">Agregar nueva Tag</span>\n            <input type="text" class="form-control" name="tag" placeholder="Sólo letras y espacios, de 3 a 20 caracteres" ng-model="tagName" ng-change="valid()">\n            <span class="input-group-btn">\n              <button class="btn btn-default" type="button" ng-click="addTag();" ng-disabled="!tagName || !isValid"><span class="glyphicon glyphicon-plus" aria-hidden="true"></span></button>\n            </span>\n          </div>\n        </div>\n      </div>'
	  };
	}
	
	addNewTag.$inject = ['$http', '$rootScope'];
	
	exports['default'] = addNewTag;
	module.exports = exports['default'];

/***/ },
/* 23 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	function manage($http) {
	  'use strict';
	
	  return {
	    restrict: 'E',
	    controller: function controller($scope, $http) {
	
	      var user_token = JSON.parse(localStorage.getItem('az_admin_login')).id;
	
	      $scope.subdomainChanged = false;
	
	      var getSubdomain = function getSubdomain() {
	        if ($scope.entry.values.subdomain) {
	          $scope.hasSubdomain = true;
	          $scope.subdomain = $scope.entry.values.subdomain.name;
	        }
	      };
	
	      $scope.addSubdomain = function () {
	
	        $http.post(urlBase + $scope.entry._entityName + "/" + $scope.entry.values['id'] + "/subdomain?access_token=" + user_token, {
	          name: $scope.subdomain
	        }).success(function (data) {
	          ;
	        }).error(function (data) {
	          window.alert(data.error.details.messages.name[0]);
	          $scope.subdomain = "";
	        });
	      };
	
	      $scope.editSubdomain = function () {
	
	        $http.put(urlBase + $scope.entry._entityName + "/" + $scope.entry.values['id'] + "/subdomain?access_token=" + user_token, {
	          name: $scope.subdomain
	        }).success(function (data) {
	          ;
	        }).error(function (data) {
	          window.alert(data.error.details.messages.name[0]);
	        });
	      };
	
	      getSubdomain();
	    },
	    template: '<input type="text" name="subdomain" ng-model="subdomain" ng-change="subdomainChanged=true;"/>\n          <button class="btn btn-default" ng-show="!hasSubdomain" ng-click="addSubdomain()" ng-disabled="!subdomainChanged">Agregar</button>\n          <button class="btn btn-default" ng-show="hasSubdomain" ng-click="editSubdomain()" ng-disabled="!subdomainChanged">Editar</button>\n          <h5>El subdominio debe ser único e irrepetible.</h5>'
	  };
	}
	
	manage.$inject = ['$http'];
	
	exports['default'] = manage;
	module.exports = exports['default'];

/***/ },
/* 24 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	function show($http) {
	  'use strict';
	
	  return {
	    restrict: 'E',
	    controller: function controller($scope, $http) {
	      $scope.subdomain = null;
	      var user_token = JSON.parse(localStorage.getItem('az_admin_login')).id;
	      var getSubdomain = function getSubdomain() {
	        $http.get(urlBase + $scope.entry._entityName + "/" + $scope.entry.values['id'] + "/subdomain?access_token=" + user_token).success(function (data) {
	          $scope.subdomain = data.name;
	        }).error(function (err) {
	          console.error(err);
	        });
	      };
	      getSubdomain();
	    },
	    template: '{{ subdomain }}'
	  };
	}
	
	show.$inject = ['$http'];
	
	exports['default'] = show;
	module.exports = exports['default'];

/***/ },
/* 25 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	function viewMessages($http, $rootScope) {
	  'use strict';
	
	  return {
	    restrict: 'EA',
	    controller: function controller($scope, $location) {
	
	      var userId = JSON.parse(localStorage.getItem('az_admin_user')).id;
	      var user_token = JSON.parse(localStorage.getItem('az_admin_login')).id;
	
	      $scope.entry.values.unread = $scope.entry.values.unread && $scope.entry.values.last_message_by != userId;
	
	      $scope.goTo = function (roomId) {
	        if ($scope.entry.values.unread) {
	          $http.put(urlBase + "chatrooms/" + roomId + '?access_token=' + user_token, { unread: false }).success(function (data) {
	            var index = $rootScope.unreadRooms.indexOf(roomId);
	            if (index > -1) {
	              $rootScope.unreadRooms.splice(index, 1);
	            }
	            location = 'index.html#/rooms/' + roomId + '/chat';
	          }).error(function (data) {
	            console.error(data);
	          });
	        } else {
	          location = 'index.html#/rooms/' + roomId + '/chat';
	        }
	      };
	    },
	    template: '<a class="btn btn-xs" ng-class="{ \'btn-success\': entry.values.unread }" ng-click="goTo(entry.values.id)">\n        <span class="glyphicon glyphicon-ok-sign" aria-hidden="true"></span>&nbsp;Ver mensajes\n      </a>'
	  };
	}
	
	viewMessages.$inject = ['$http', '$rootScope'];
	
	exports['default'] = viewMessages;
	module.exports = exports['default'];

/***/ },
/* 26 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	function deleteRoom($state) {
	  'use strict';
	
	  return {
	    restrict: 'E',
	    scope: {
	      entity: '&',
	      entityName: '@',
	      entry: '&'
	    },
	    link: function link(scope, element, attrs) {
	      scope.gotoDelete = function () {
	        var entityName = scope.entity() ? scope.entity().name() : attrs.entityName;
	        var params = entityName == $state.params.entity ? $state.params : {};
	        params.entity = entityName;
	        params.id = scope.entry().identifierValue;
	        $state.go($state.get('delete'), params);
	      };
	    },
	    template: '<a class="btn btn-default btn-xs" ng-click="gotoDelete()"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span>&nbsp;Borrar</a>'
	  };
	}
	
	deleteRoom.$inject = ['$state'];
	
	exports['default'] = deleteRoom;
	module.exports = exports['default'];

/***/ },
/* 27 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	function roommate() {
	  'use strict';
	
	  return {
	    restrict: 'EA',
	    template: '{{ entry.roommate.username }}',
	    link: function link($scope) {
	      var userId = JSON.parse(localStorage.getItem('az_admin_user')).id;
	      for (var user in $scope.value) {
	        if ($scope.value[user].id == userId) {} else {
	          $scope.entry.roommate = $scope.value[user];
	          $scope.entry.values['with'] = $scope.value[user].id;
	        }
	      }
	    }
	  };
	}
	
	exports['default'] = roommate;
	module.exports = exports['default'];

/***/ },
/* 28 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	function publishFacebook($http, $rootScope) {
	  'use strict';
	
	  return {
	    restrict: 'EA',
	    controller: function controller($scope, $location) {
	
	      var user_token = JSON.parse(localStorage.getItem('az_admin_login')).id;
	
	      $scope.cantPublish = $scope.entry.values.facebookPostId || !$scope.entry.values['city.facebook_page_id'] || !$scope.entry.values['city.facebook_page_token'];
	
	      if ($scope.entry.values.facebookPostId) {
	        $scope.state = 'Publicado';
	        $scope.title = 'Fue publicado en Facebook';
	      } else {
	        $scope.state = 'Publicar';
	        $scope.title = 'Publicar a Facebook';
	      }
	
	      $scope.publish = function () {
	
	        $http.post(urlBase + "adverts/postfb?access_token=" + user_token, {
	          id: $scope.entry.values.id
	        }).success(function (response) {
	          var postid = response.result.post_id ? response.result.post_id : response.result.id;
	          $scope.entry.values.facebookPostId = postid;
	        }).error(function (data) {
	          console.error(data);
	        });
	      };
	    },
	    template: '<button ng-if="!entry.values.facebookPostId" ng-disabled="cantPublish" class="btn btn-xs btn-primary" ng-click="publish()" title="{{title}}">\n          <i class="fa fa-facebook" aria-hidden="true"></i>&nbsp;{{state}}</button>\n          <a ng-if="entry.values.facebookPostId" target="_blank" ng-href="https://www.facebook.com/{{entry.values.facebookPostId}}">Publicado</a>'
	  };
	}
	
	publishFacebook.$inject = ['$http', '$rootScope'];
	
	exports['default'] = publishFacebook;
	module.exports = exports['default'];

/***/ },
/* 29 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	function upload($http, $rootScope) {
	  'use strict';
	
	  return {
	    restrict: 'E',
	    link: function link(scope, elem, attrs) {
	
	      scope.uploadThis = function ($file) {
	        if (!$file) {
	          return false;
	        }
	
	        var formData = new FormData();
	        formData.append('file', $file);
	        $.ajax({
	          url: urlBase + 'containers/' + scope.entry.values['id'] + '/upload?is=cover',
	          type: 'POST',
	          data: formData,
	          processData: false,
	          contentType: false,
	          success: function success(data) {
	            $rootScope.$broadcast('image.added');
	          }
	        });
	      };
	    },
	    template: '<div class="row">\n          <div class="col-md-2">\n            <button class="" ngf-select="uploadThis($file)" ngf-multiple="true">Subir imagen</button>\n          </div>\n        </div>'
	  };
	}
	
	upload.$inject = ['$http', '$rootScope'];
	
	exports['default'] = upload;
	module.exports = exports['default'];

/***/ },
/* 30 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	function imagenes($http) {
	  'use strict';
	
	  return {
	    restrict: 'EA',
	    controller: function controller($scope, $http) {
	      $scope.hovered = false;
	      $scope.urlBase = urlBase;
	
	      loadImages();
	
	      $scope.removeImage = function (imageId) {
	        $http['delete'](urlBase + 'containers/' + $scope.entry.values['id'] + '/files/' + imageId).success(function (data) {
	          console.log(data);
	          loadImages();
	        }).error(function (err) {
	          console.log(err);
	        });
	      };
	
	      $scope.setPortada = function (index, imageId) {
	        $scope.isPortada = true;
	      };
	
	      function loadImages() {
	        $http.get(urlBase + 'containers/' + $scope.entry.values['id'] + '/files').success(function (files) {
	          $scope.entry.values['images'] = files;
	          for (var i = 0; i < files.length; i++) {
	            $scope.entry.values.images[i].url = urlBase + 'containers/' + $scope.entry.values.images[i].container + '/download/' + $scope.entry.values.images[i].name;
	          }
	        }).error(function (err) {
	          console.error(err);
	        });
	      }
	
	      $scope.$on('image.added', function (evt) {
	        loadImages();
	      });
	    },
	    template: '<div class="image-container" ng-repeat="img in entry.values.images" ng-mouseover="hovered = true" ng-mouseleave="hovered=false">\n          <img class="image" ng-class="{cover: entry.values.cover == img.name}" ng-src="{{ img.url }}"/>\n        </div>'
	  };
	}
	
	imagenes.$inject = ['$http'];
	
	exports['default'] = imagenes;
	module.exports = exports['default'];

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _chatTemplateHtml = __webpack_require__(32);
	
	var _chatTemplateHtml2 = _interopRequireDefault(_chatTemplateHtml);
	
	// import charController from './chatController.js';
	
	exports['default'] = function ($stateProvider) {
	  $stateProvider.state('messages', {
	    parent: 'main',
	    url: '/rooms/:id/chat',
	    params: { id: null },
	    template: _chatTemplateHtml2['default'],
	    controller: 'chatController'
	  });
	};
	
	;
	module.exports = exports['default'];

/***/ },
/* 32 */
/***/ function(module, exports) {

	module.exports = "<div style=\"text-align: left; border-bottom: 1px solid #E1E4E6; padding-bottom: 16px; margin-top: -15px; padding-top: 20px;\">\n\t<h1 style=\"\">Conversación con <span style=\"color: #97C0DB; font-style: italic;\">{{him.username}}</span></h1>\n</div>\n<div class=\"container\" id=\"chatWindow\" style=\"padding: 25px; text-align: left; overflow-y: auto; height: 450px; margin-top:20px;\">\n\n\t<div class=\"row\" ng-repeat=\"m in messages\">\n\n\t\t<div ng-if=\"m.usuarioId == you.id\" style=\"position: relative; float:right;\">\n\t\t\t<div style=\"float: right; position: relative;\">\n\t\t\t\t<span class=\"fa fa-user\"></span>\n\t\t\t\t<!-- <img src=\"../../images/user.png\" height=\"20\" style=\"padding: 3px;\" alt=\"\"> -->\n\t\t\t</div>\n\t\t\t<div style=\"text-align: right; font-family: Spinnaker, 'sans-serif'; font-size: 10px; color: grey; padding-right: 5px;\">\n\t\t\t\t{{ m.date }} | <span style=\"font-size: 12px; font-style: bold; color: black;\">{{ you.username }}</span>\n\t\t\t\t</div>\n\t\t\t<div class=\"message mine\">{{ m.text }}</div>\n\t\t</div>\n\n\t\t<div ng-if=\"m.usuarioId == him.id\" style=\"position: relative; float:left;\">\n\t\t\t<div style=\"float: left; position: relative;\">\n\t\t\t\t<span class=\"fa fa-user\"></span>\n\t\t\t\t<!-- <img src=\"../../images/user.png\" height=\"20\" style=\"padding: 3px;\" alt=\"\"> -->\n\t\t\t</div>\n\t\t\t<div style=\"text-align: left; font-family: Spinnaker, 'sans-serif'; font-size: 10px; color: grey; padding-left: 5px;\">\n\t\t\t\t<span style=\"font-size: 12px; font-style: bold; color: black;\">{{ him.username }}</span> | {{ m.date }}</div>\n\t\t\t<div class=\"message yours\" ng-if=\"m.usuarioId == him.id\"> {{ m.text }}</div>\n\t\t</div>\n\t</div>\n</div>\n\n<div class=\"container\" style=\"padding: 0px;  border-top: 1px solid #E1E4E6; margin-top:20px;\">\n\t<form action=\"\" style=\"margin-top: 20px;\">\n\t\t<label for=\"reply\">Responder\n\t\t\t<!-- <span style=\"float: right; position: relative; font-size:11px; color: grey; padding-bottom: 6px; font-style: italic; font-family: Verdana;\">Notificar por email<input type=\"checkbox\" style=\"margin-left: 10px;\"></span> -->\n\t\t</label>\n\t\t<textarea name=\"\" id=\"reply\" cols=\"70\" rows=\"6\" class=\"form-control\" ng-model=\"message\"></textarea>\n\t\t<div class=\"botonaz\" style=\"margin-top: 20px; width: 200px; font-size: 15px; background: #27547e; color: white;\" ng-click=\"reply()\">Enviar</div>\n\t</form>\n</div>\n";

/***/ },
/* 33 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports['default'] = ['$scope', '$http', '$stateParams', '$timeout', function ($scope, $http, $stateParams, $timeout) {
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
	    $http.get(urlBase + 'chatrooms/' + roomId + '/messages?access_token=' + user_token).success(function (messages) {
	      $scope.messages = messages;
	
	      for (var m in $scope.messages) {
	        var date = messages[m].date;
	        messages[m].date = moment(date).format('DD-MM-YYYY, h:mm:ss a');
	      }
	
	      $timeout(function () {
	        var messageThread = document.getElementById('chatWindow');
	        messageThread.scrollTop = messageThread.scrollHeight;
	      }, 200);
	    }).error(function (err) {
	      console.error(err);
	    });
	  }
	
	  function getUsers() {
	    $http.get(urlBase + 'chatrooms/' + roomId + '/users?access_token=' + user_token).success(function (users) {
	
	      for (var i in users) {
	        if (users[i].id == $scope.userId) {
	          $scope.you = users[i];
	        } else {
	          $scope.him = users[i];
	        }
	      }
	    }).error(function (err) {
	      console.error(err);
	    });
	  }
	
	  $scope.$on('new-message-received', function (evt, data) {
	    $scope.$apply(function () {
	      $scope.messages.push(data.content);
	      $timeout(function () {
	        var messageThread = document.getElementById('chatWindow');
	        messageThread.scrollTop = messageThread.scrollHeight;
	      }, 200);
	    });
	  });
	
	  $scope.reply = function () {
	    var data = {
	      'text': $scope.message,
	      'user': $scope.userId,
	      'room': roomId
	    };
	
	    $http.post(urlBase + 'chatmessages/direct?access_token=' + user_token, { data: data }).success(function (yes) {
	      $scope.message = "";
	      loadMessages();
	    }).error(function (err) {
	      console.error(err);
	    });
	  };
	
	  activate();
	}];
	module.exports = exports['default'];

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _templateHtml = __webpack_require__(35);
	
	var _templateHtml2 = _interopRequireDefault(_templateHtml);
	
	exports['default'] = function ($stateProvider) {
	  $stateProvider.state('entityTags', {
	    parent: 'main',
	    url: '/tags',
	    params: { id: null },
	    template: _templateHtml2['default'],
	    controller: 'entityTagsController'
	  });
	};
	
	;
	module.exports = exports['default'];

/***/ },
/* 35 */
/***/ function(module, exports) {

	module.exports = "<div class=\"az-admin-header\">\n\t<h1 class=\"az-heading\">Tags</h1>\n</div>\n<h3 class=\"az-font\">Palabras claves para que los usuarios encuentren tu negocio en una búsqueda específica</h3>\n\n<div class=\"aside\">\n\t<div class=\"fake-input\">\n\t\t<input type=\"text\" class=\"borderless\" placeholder=\"Elegí palabras claves existentes\">\n\t\t<div class=\"iconito\">+</div>\n\t</div>\n</div>\n<div class=\"aside\">\n\t<div class=\"fake-input\">\n\t\t<input ng-model=\"tag.name\" type=\"text\" placeholder=\"Añadí la que creas necesaria\" class=\"borderless\">\n\t\t<div class=\"iconito\" ng-click=\"agregarTag(tag.name)\">+</div>\n\t</div>\n</div>\n<div class=\"aside\">\n\t<h5 class=\"az-description\">Letras y espacios en mínusculas, de 3 a 30 caracteres</h5>\n</div>\n<div class=\"aside\">\n\t<h5 class=\"az-description\">Por ejemplo: Barrio, cafe, actividad, productos</h5>\n</div>\n\n<div class=\"az-separator\">\n\t<h3 class=\"az-font\">Mis tags</h3>\n</div>\n\n<div class=\"tag-wrapper\">\n\t<div class=\"az-tag-wrapper\" ng-repeat=\"tag in availableTags\">\n\t\t<div class=\"az-tag\">{{ tag.name }}</div>\n\t\t<div class=\"az-tag-action\">x</div>\n\t</div>\n</div>";

/***/ },
/* 36 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports['default'] = ['$scope', '$http', 'ngToast', function ($scope, $http, ngToast) {
	
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
	    $http.get(urlBase + 'entities/' + entityId + '/tags?access_token=' + user_token).success(function (tags) {
	      $scope.availableTags = tags;
	    }).error(function (err) {
	      console.error(err);
	    });
	  }
	
	  $scope.agregarTag = function (name) {
	
	    console.log(name);
	
	    $http.post(urlBase + 'tags?access_token=' + user_token, { name: name, ownerId: userId }).success(function (tag) {
	      $scope.availableTags.push(tag);
	      console.log(tag);
	
	      $http.put(urlBase + 'tags/' + tag.id + '/entities/rel/' + entityId + '?access_token=' + user_token).success(function (rel) {
	        ngToast.create('Created');
	      }).error(function (err) {
	        console.error(err);
	      });
	    }).error(function (err) {
	      console.error(err);
	    });
	  };
	
	  activate();
	}];
	module.exports = exports['default'];

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _templateHtml = __webpack_require__(38);
	
	var _templateHtml2 = _interopRequireDefault(_templateHtml);
	
	exports['default'] = function ($stateProvider) {
	  $stateProvider.state('entityImages', {
	    parent: 'main',
	    url: '/images',
	    params: { id: null },
	    template: _templateHtml2['default'],
	    controller: 'entityImagesController'
	  });
	};
	
	;
	module.exports = exports['default'];

/***/ },
/* 38 */
/***/ function(module, exports) {

	module.exports = "<div>\n\t<div class=\"az-admin-header\">\n\t\t<h1 class=\"az-heading\">\n\t\t\tImágenes y página web\n\t\t</h1>\n\t</div>\n\t<div class=\"row\">\n\t\t<div class=\"col-xs-6\">\n\t\t\t<h3 class=\"az-font\">Logo de tu comercio</h3>\n\t\t\t<new-entity-image target=\"logo\" name=\"entity\"></new-entity-image>\t\n\t\t</div>\t\t\n\t</div>\n\t<div class=\"row\">\n\t\t<div class=\"col-xs-6\">\n\t\t\t<h3 class=\"az-font\">Imagen de fondo de la app</h3>\n\t\t\t<h5 class=\"az-description\">Te recomendamos que subas una imagen png/jpg menor a 1MB</h5>\n\t\t\t<new-entity-image target=\"cover\" name=\"entity\"></new-entity-image>\t\n\t\t</div>\n\t\t<div class=\"col-xs-6\">\n\t\t\t<h3 class=\"az-font\">Fondo de tu página web</h3>\n\t\t\t<h5 class=\"az-description\">Te recomendamos que subas una imagen png/jpg menor a 1MB</h5>\n\t\t\t<new-entity-image target=\"webcover\" name=\"entity\"></new-entity-image>\t\n\t\t</div>\t\t\n\t</div>\n\t<div class=\"row\">\n\t\t<div class=\"col\">\n\t\t\t<h3 class=\"az-font\">Imágenes</h3>\n\t\t\t<h5 class=\"az-description\">Te recomendamos que subas una imagen png/jpg menor a 1MB</h5>\n\t\t\t<new-entity-image target=\"photo\" multi=\"true\" name=\"entity\"></new-entity-image>\t\n\t\t</div>\t\t\t\n\t</div>\n\t<div class=\"row\">\n\t\t<h3 class=\"az-font\">Sitio web</h3>\n\t\t<h5 class=\"az-description\">Configurá toda tu información relacionada a tu sitio az o ya existente</h5>\n\t\t<div class=\"col-xs-6\">\n\t\t\t<div class=\"fake-input\">\n\t\t\t\t<input type=\"text\" class=\"borderless\" placeholder=\"Elegí un dominio tunombre.arg.az\">\n\t\t\t</div>\n\t\t</div>\n\t\t<div class=\"col-xs-6\">\n\t\t\t<div class=\"fake-input\">\n\t\t\t\t<input type=\"text\" class=\"borderless\" placeholder=\"Sitio web existente\">\n\t\t\t</div>\n\t\t</div>\t\t\n\t</div>\n</div>\n";

/***/ },
/* 39 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports['default'] = ['$scope', '$http', function ($scope, $http) {
	
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
	}];
	module.exports = exports['default'];

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _templateHtml = __webpack_require__(41);
	
	var _templateHtml2 = _interopRequireDefault(_templateHtml);
	
	exports['default'] = function ($stateProvider) {
	  $stateProvider.state('entityHours', {
	    parent: 'main',
	    url: '/hours',
	    params: { id: null },
	    template: _templateHtml2['default'],
	    controller: 'entityHoursController'
	  });
	};
	
	;
	module.exports = exports['default'];

/***/ },
/* 41 */
/***/ function(module, exports) {

	module.exports = "<h1>Información comercial</h1>\n<h2>Quiénes somos</h2>\n<textarea name=\"\"\n          id=\"\"\n          cols=\"30\"\n          rows=\"5\"\n          style=\"width: 100%\"\n          ng-model=\"entity.description\">\n\n</textarea>\n\n<h2>Horarios</h2>\n<h3>Completa los campos con los horarios de tu comercio</h3>\n\n<div class=\"wrapper\">\n    <div class=\"sub-wrapper\">\n        <div class=\"rowy-1\">1</div>\n        <div class=\"rowy-2\">2</div>\n        <div class=\"rowy-2\">3</div>\n    </div>\n    <div class=\"sub-wrapper\"></div>\n        <div class=\"rowy-1\">\n            <div>Lunes</div>\n            <div>Martes</div>\n            <div>Miércoles</div>\n            <div>Jueves</div>\n            <div>Viernes</div>\n            <div>Sábado</div>\n            <div>Domingo</div>\n        </div>\n        <div class=\"rowy-2\">\n            <div>\n                <div class=\"center-me\">\n                   de <input  type=\"text\" class=\"inline hours\"  ng-model=\"daysOfWeek[0][0].openTime\"> hasta  <input type=\"text\" class=\"inline hours\" ng-model=\"daysOfWeek[0][0].closeTime\">\n                </div>\n            </div>\n            <div>\n                <div class=\"center-me\">\n                   de <input  type=\"text\" class=\"inline hours\" ng-model=\"daysOfWeek[1][0].openTime\"> hasta  <input type=\"text\" class=\"inline hours\" ng-model=\"daysOfWeek[1][0].closeTime\">\n                </div>\n            </div>\n            <div>\n                <div class=\"center-me\">\n                   de <input type=\"text\" class=\"inline hours\" ng-model=\"daysOfWeek[2][0].openTime\"> hasta  <input type=\"text\" class=\"inline hours\" ng-model=\"daysOfWeek[2][0].closeTime\">\n                </div>\n            </div>\n            <div>\n                <div class=\"center-me\">\n                   de <input type=\"text\" class=\"inline hours\" ng-model=\"daysOfWeek[3][0].openTime\"> hasta  <input type=\"text\" class=\"inline hours\" ng-model=\"daysOfWeek[3][0].closeTime\">\n                </div>\n            </div>\n            <div>\n                <div class=\"center-me\">\n                   de <input type=\"text\" class=\"inline hours\" ng-model=\"daysOfWeek[4][0].openTime\"> hasta  <input type=\"text\" class=\"inline hours\" ng-model=\"daysOfWeek[4][0].closeTime\">\n                </div>\n            </div>\n            <div>\n                <div class=\"center-me\">\n                   de <input type=\"text\" class=\"inline hours\" ng-model=\"daysOfWeek[5][0].openTime\"> hasta  <input type=\"text\" class=\"inline hours\" ng-model=\"daysOfWeek[5][0].closeTime\">\n                </div>\n            </div>\n            <div>\n                <div class=\"center-me\">\n                   de <input type=\"text\" class=\"inline hours\" ng-model=\"daysOfWeek[6][0].openTime\"> hasta  <input type=\"text\" class=\"inline hours\" ng-model=\"daysOfWeek[6][0].closeTime\">\n                </div>\n            </div>\n        </div>\n        <div class=\"rowy-2\">\n            <div>\n                <div class=\"center-me\">\n                   de <input type=\"text\" class=\"inline hours\" ng-model=\"daysOfWeek[0][1].openTime\"> hasta  <input type=\"text\" class=\"inline hours\" ng-model=\"daysOfWeek[0][1].closeTime\">\n                </div>\n            </div>\n            <div>\n                <div class=\"center-me\">\n                   de <input type=\"text\" class=\"inline hours\" ng-model=\"daysOfWeek[1][1].openTime\"> hasta  <input type=\"text\" class=\"inline hours\" ng-model=\"daysOfWeek[1][1].closeTime\">\n                </div>\n            </div>\n            <div>\n                <div class=\"center-me\">\n                   de <input type=\"text\" class=\"inline hours\" ng-model=\"daysOfWeek[2][1].openTime\"> hasta  <input type=\"text\" class=\"inline hours\" ng-model=\"daysOfWeek[2][1].closeTime\">\n                </div>\n            </div>\n            <div>\n                <div class=\"center-me\">\n                   de <input type=\"text\" class=\"inline hours\" ng-model=\"daysOfWeek[3][1].openTime\"> hasta  <input type=\"text\" class=\"inline hours\" ng-model=\"daysOfWeek[3][1].closeTime\">\n                </div>\n            </div>\n            <div>\n                <div class=\"center-me\">\n                   de <input type=\"text\" class=\"inline hours\" ng-model=\"daysOfWeek[4][1].openTime\"> hasta  <input type=\"text\" class=\"inline hours\" ng-model=\"daysOfWeek[4][1].closeTime\">\n                </div>\n            </div>\n            <div>\n                <div class=\"center-me\">\n                   de <input type=\"text\" class=\"inline hours\" ng-model=\"daysOfWeek[5][1].openTime\"> hasta  <input type=\"text\" class=\"inline hours\" ng-model=\"daysOfWeek[5][1].closeTime\">\n                </div>\n            </div>\n            <div>\n                <div class=\"center-me\">\n                   de <input type=\"text\" class=\"inline hours\" ng-model=\"daysOfWeek[6][1].openTime\"> hasta  <input type=\"text\" class=\"inline hours\" ng-model=\"daysOfWeek[6][1].closeTime\">\n                </div>\n            </div>\n        </div>\n</div>\n";

/***/ },
/* 42 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	exports['default'] = ['$scope', '$http', function ($scope, $http) {
	
	    var urlBase = localStorage.getItem('az_admin_api');
	    var userId = JSON.parse(localStorage.getItem('az_admin_user')).id;
	    var entityId = JSON.parse(localStorage.getItem('az_admin_user')).entityId;
	    var user_token = JSON.parse(localStorage.getItem('az_admin_login')).id;
	
	    console.log(1, user_token);
	
	    $scope.daysOfWeek = [[{ dayOfWeek: 0, first: true }, { dayOfWeek: 0 }], [{ dayOfWeek: 1, first: true }, { dayOfWeek: 1 }], [{ dayOfWeek: 2, first: true }, { dayOfWeek: 2 }], [{ dayOfWeek: 3, first: true }, { dayOfWeek: 3 }], [{ dayOfWeek: 4, first: true }, { dayOfWeek: 4 }], [{ dayOfWeek: 5, first: true }, { dayOfWeek: 5 }], [{ dayOfWeek: 6, first: true }, { dayOfWeek: 6 }]];
	
	    function activate() {
	        console.log('hello you, hours!');
	        loadEntity();
	        loadHours();
	        getInputs();
	    }
	
	    function getInputs() {
	        var x = document.querySelectorAll('.hours');
	
	        for (var i = 0; i < x.length; i++) {
	            console.log(x[i].className);
	        }
	
	        console.log('X', x);
	    }
	
	    function loadEntity() {
	        $http.get(urlBase + 'entities/' + entityId).success(function (entity) {
	            $scope.entity = entity;
	            console.log(entity);
	        }).error(function (err) {
	            console.error(err);
	        });
	    }
	
	    $scope.saveHours = function () {};
	
	    function loadHours() {
	        $http.get(urlBase + 'entities/' + entityId + '/hours?access_token=' + user_token).success(function (hours) {
	            console.log('hours', hours);
	
	            for (var i = 0; i < hours.length; i++) {
	                console.log(hours[i]);
	
	                for (var x = 0; x < $scope.daysOfWeek.length; x++) {
	                    if (hours[i].dayOfWeek == $scope.daysOfWeek[x][0].dayOfWeek) {
	                        console.log('yes');
	                        console.log(hours[i].dayOfWeek, $scope.daysOfWeek[x][0].dayOfWeek, $scope.daysOfWeek[x][1].dayOfWeek);
	
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
	        }).error(function (err) {
	            console.error(err);
	        });
	    }
	
	    activate();
	}];
	module.exports = exports['default'];

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _templateHtml = __webpack_require__(44);
	
	var _templateHtml2 = _interopRequireDefault(_templateHtml);
	
	exports['default'] = function ($stateProvider) {
	  $stateProvider.state('advertDetail', {
	    parent: 'main',
	    url: '/advertDetail',
	    params: { id: null },
	    template: _templateHtml2['default'],
	    controller: 'detailAdvertController'
	  });
	};
	
	;
	module.exports = exports['default'];

/***/ },
/* 44 */
/***/ function(module, exports) {

	module.exports = "<div class=\"az-admin-header\">\n\t<h1 class=\"az-heading\">Crear publicación</h1>\n</div>\n<div class=\"az-e-wrapper\" style=\"padding: 15px;\">\n    <div class=\"aside-me\" style=\"border-right: 1px solid black\">\n        <div class=\"isText\">\n                <h2>Información</h2>\n\n                <label for=\"titulo\">Tìtulo de la publicaciòn *</label>\n                <input type=\"text\" class=\"form-control az-input\" id=\"titulo\" ng-model=\"advert.title\">\n                <label for=\"descripcion\">Descripciòn o texto (hasta xx caracteres)</label>\n                <textarea name=\"\" id=\"\" cols=\"30\" rows=\"10\" class=\"form-control az-input\" id=\"descripcion\" ng-model=\"advert.description\"></textarea>\n                <label for=\"text\">Fecha de validez / Dìa de creaciòn de la publicaciòn</label>\n                <input type=\"text\" class=\"form-control\" style=\"margin-bottom: 20px;\" id=\"date\" ng-model=\"advert.date_description\">\n                <label for=\"\">Imagen</label>\n                <button class=\"buttons-advert az-input\" ngf-select=\"uploadImage($file)\" ngf-multiple=\"true\">Subir imagen</button>\n                \n            </div>\n    </div>\n    <div class=\"aside-me\" style=\"text-align: center;\">\n        <h2>Vista previa</h2>\n        <div class=\"objectWrapper\">\n            <div class=\"divpromo\" style=\"background-size: cover; background-repeat: no-repeat; background-image: url('http://104.131.113.114:3002/api/containers/entity_{{entityId}}/download/{{advert.id}}.advert')\">\n             <div class=\"date-limit\">\n                 {{advert.date_description}}\n             </div>             \n             </div>\n             <div class=\"obj-footer\">\n                 <div class=\"obj-header\">\n                     <div class=\"entity-logo\">\n                         <img width=\"60\" class=\"circular\" src=\"http://104.131.113.114:3004/api/containers/entity_{{entity.id}}/download/logo.image\" alt=\"\">\n                     </div>\n                     <div class=\"entity-desc\">\n                         <div class=\"e-name\">{{::entity.name}}</div>\n                         <div class=\"e-addr\">{{::entity.address}}</div>\n                         <div class=\"e-phone\">{{::entity.phone}}</div>\n                     </div>\n                     <div class=\"obj-title\">{{advert.title}}</div>\n                     <div class=\"obj-desc\">{{advert.description}}</div>\n\n                 </div>\n             </div>\n            <button class=\"buttons-advert az-input\" style=\"margin-top: 20px;\" ngf-select=\"uploadImage($file)\" ngf-multiple=\"true\">Subir publicación</button>\n\n        </div>\n</div>\n\n";

/***/ },
/* 45 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	exports['default'] = ['$scope', '$http', '$stateParams', function ($scope, $http, $stateParams) {
	
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
	
	    $http.get(urlBase + 'entities/' + entityId + '?access_token=' + user_token).success(function (entity) {
	        console.log(entity);
	        $scope.entity = entity;
	    });
	
	    if ($stateParams.advertId) {
	        $http.get(urlBase + 'adverts/' + $stateParams.advertId + '?access_token=' + user_token).success(function (advert) {
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
	            }).success(function (advert) {
	                console.log(advert);
	                $scope.advert.id = advert.id;
	                return true;
	            });
	        };
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
	    };
	
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
	                    success: function success(res, _success) {
	                        if (_success) {
	                            $scope.$apply(function () {
	                                console.log('SOME', res, _success);
	                                $('.divpromo').css('background-image', 'url("http://104.131.113.114:3002/api/containers/entity_' + entityId + '/download/' + $scope.advert.id + '.advert?t=' + new Date().getTime() + '")');
	                            });
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
	                success: function success(res, _success2) {
	                    if (_success2) {
	                        $scope.$apply(function () {
	                            console.log('SOME', res, _success2);
	                            $('.divpromo').css('background-image', 'url("http://104.131.113.114:3002/api/containers/entity_' + entityId + '/download/' + $scope.advert.id + '.advert?t=' + new Date().getTime() + '")');
	                        });
	                    }
	                }
	            });
	        }
	    };
	}];
	module.exports = exports['default'];

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _templateHtml = __webpack_require__(47);
	
	var _templateHtml2 = _interopRequireDefault(_templateHtml);
	
	exports['default'] = function ($stateProvider) {
	  $stateProvider.state('productDetail', {
	    parent: 'main',
	    url: '/productDetail',
	    params: { id: null },
	    template: _templateHtml2['default'],
	    controller: 'detailProductController'
	  });
	};
	
	;
	module.exports = exports['default'];

/***/ },
/* 47 */
/***/ function(module, exports) {

	module.exports = "<div class=\"az-admin-header\">\n\t<h1 class=\"az-heading\">Crear producto</h1>\n</div>\n<div class=\"az-e-wrapper\" style=\"padding: 15px;\">\n    <div class=\"aside-me\" style=\"border-right: 1px solid black\">\n        <div class=\"isText\">\n                <h2>Información</h2>\n\n                <label for=\"titulo\">Nombre del producto *</label>\n                <input type=\"text\" class=\"form-control az-input\" id=\"titulo\" ng-model=\"product.title\">\n                <label for=\"descripcion\">Descripciòn o texto (hasta xx caracteres)</label>\n                <textarea name=\"\" id=\"\" cols=\"30\" rows=\"10\" class=\"form-control az-input\" id=\"descripcion\" ng-model=\"product.description\"></textarea>\n                <label for=\"text\">Precio</label>\n                <input type=\"text\" class=\"form-control\" style=\"margin-bottom: 20px;\" id=\"date\" ng-model=\"product.cost\">\n                <label for=\"\">Imagen</label>\n                <button class=\"buttons-product az-input\" ngf-select=\"uploadImage($file)\" ngf-multiple=\"true\">Subir imagen</button>\n                \n            </div>\n    </div>\n    <div class=\"aside-me\" style=\"text-align: center;\">\n        <h2>Vista previa</h2>\n        <div class=\"objectWrapper\">\n            <div class=\"divpromo\" style=\"background-size: cover; background-repeat: no-repeat; background-image: url('http://104.131.113.114:3002/api/containers/entity_{{entityId}}/download/{{product.id}}.product')\">\n             <div class=\"date-limit\">\n                 {{product.cost}}\n             </div>             \n             </div>\n             <div class=\"obj-footer\">\n                 <div class=\"obj-header\">\n                     <div class=\"entity-logo\">\n                         <img width=\"60\" class=\"circular\" src=\"http://104.131.113.114:3004/api/containers/entity_{{entity.id}}/download/logo.image\" alt=\"\">\n                     </div>\n                     <div class=\"entity-desc\">\n                         <div class=\"e-name\">{{::entity.name}}</div>\n                         <div class=\"e-addr\">{{::entity.address}}</div>\n                         <div class=\"e-phone\">{{::entity.phone}}</div>\n                     </div>\n                     <div class=\"obj-title\">{{product.title}}</div>\n                     <div class=\"obj-desc\">{{product.description}}</div>\n\n                 </div>\n             </div>\n            <button class=\"buttons-product az-input\" style=\"margin-top: 20px;\" ngf-select=\"uploadImage($file)\" ngf-multiple=\"true\">Subir publicación</button>\n\n        </div>\n</div>\n\n";

/***/ },
/* 48 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	exports['default'] = ['$scope', '$http', '$stateParams', function ($scope, $http, $stateParams) {
	
	    var urlBase = localStorage.getItem('az_admin_api');
	    var userId = JSON.parse(localStorage.getItem('az_admin_user')).id;
	    var entityId = JSON.parse(localStorage.getItem('az_admin_user')).entityId;
	    var user_token = JSON.parse(localStorage.getItem('az_admin_login')).id;
	
	    var target = 'product';
	    var containerUrl = 'http://104.131.113.114:3002/api/containers/entity_' + entityId;
	
	    $scope.product = {};
	    $scope.entity = {};
	    $scope.entityId = entityId;
	
	    $scope.date = new Date().getDate();
	
	    $http.get(urlBase + 'entities/' + entityId + '?access_token=' + user_token).success(function (entity) {
	        console.log(entity);
	        $scope.entity = entity;
	    });
	
	    if ($stateParams.productId) {
	        $http.get(urlBase + 'products/' + $stateParams.productId + '?access_token=' + user_token).success(function (product) {
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
	            }).success(function (product) {
	                console.log(product);
	                $scope.product.id = product.id;
	                return true;
	            });
	        };
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
	    };
	
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
	                    success: function success(res, _success) {
	                        if (_success) {
	                            $scope.$apply(function () {
	                                console.log('SOME', res, _success);
	                                $('.divpromo').css('background-image', 'url("http://104.131.113.114:3002/api/containers/entity_' + entityId + '/download/' + $scope.product.id + '.product?t=' + new Date().getTime() + '")');
	                            });
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
	                success: function success(res, _success2) {
	                    if (_success2) {
	                        $scope.$apply(function () {
	                            console.log('SOME', res, _success2);
	                            $('.divpromo').css('background-image', 'url("http://104.131.113.114:3002/api/containers/entity_' + entityId + '/download/' + $scope.product.id + '.product?t=' + new Date().getTime() + '")');
	                        });
	                    }
	                }
	            });
	        }
	    };
	}];
	module.exports = exports['default'];

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<div class=\"navbar-header\">\n  <div class=\"navbar-brand\">\n    <img src=\"" + __webpack_require__(50) + "\"/>\n    <span ng-controller=\"username\">Administrador {{ username }}</span>\n  </div>\n</div>\n\n<div class=\"nav navbar-right\">\n  <a href=\"#\" onclick=\"logout()\">Cerrar sesión <i class=\"fa fa-sign-out fa-fw\"></i></a>\n</div>\n";

/***/ },
/* 50 */
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADoAAAA5CAYAAABnLziGAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAABbJSURBVHjaxJt7eFXllf8/77v3PufknFxOQkhCgHALCZAIggJSwQt4r3hpq1hb52I7Y22hMw+O0/m1tjOW2tGZ6VMdnLbj03E6xSraYq1arSKgAhYBuQcC4ZqQBBJyzzk5t73f3x/vPvucE0KrjvP0PM9+3pN99mV937Xetb5rrTdCKcUn/SmeUmchpU8YhiX8BTUiEBwrrOA4zOBYrOBYAOx4B8mhDpLRVic2eJJE/xGVSkWU7SR6jjUkP2mZxCcJtKR2Vljml86XRWOuJlj+DRUaDVbow93spCAZQUS7t6ie48/YPSefV8lkpOfoJwP6fw20uPqikPT7w7J8xkoRnrhMBUePPe8ipSgLhygI+qgszifPZ9DWNUg0maKzN0J/NKGFESJzj51ERDoanLadDzh9HVu6j+6P/EmAhqfUW2aosEaWTVtByaT7VGAUKAUoCvMsPn/FDG68ZDL1E0opCvr/4LOStsO5vij7T3byry9uY/fxs2nxAAcZ7TrhnNn3Pafz2Jruj2nWHwtoyfRLxsrKupWMnrqSUDkoQDmsvHkO9103k1EFgRHvUwpsxwHAkCJXg1mfvkic13cd57vPbqajL+qZthw8u9s5c+Cxcztff/7/FGh4Sp1l5IfrRf3SXapAAwwYkgeXXsxXrqkjYJnetSnbofncAO81tvLc5kNsO9KOUEprKf1OpZg9uYx5Uyu5ae5kZowvJZwfIBv+4dYu7nrsN7Sc608vZji9/TtO24FHu48eSH7iQIur6y1ZOX0lE+c9qgrHgIIHrq/j7z89C8uQnsb2nOrkW89vY1tTuwdIKPdH4X53LxZKgavh9LnCoI+H717IZxbUEPRb7mnF81saWf7jN9zrbERfyyb7+OZ7uhs/aP3EgJbUzAzJyZf+wJkw7z4VLCYgBS+vWMzciaV6jpVi/YFWHly7jZaugbTUCCUQpLWXAZteyyKRzEzGcBsH7l1Sz7fuXEChu8YjsSR/89RbvLTtsL4u0nlCHdtwQ9eBbUf+10BLamaGRO3CNXbN4tsRgtnjwrz8lSsoCOjZ3nHyHJ/90Sb6h+K5QitAaDMV2QDc14lEAmGnXH8zggzK8Z71+JcWc/cV0xBCT9u/v7yTVc9v1dfFByJO42vzuw+81/CxgRZPrbdk7cI19rQly5Th48uXTeTfbpvlyq945PUD/NubB1GojEm6+FBZahquTcdBDsUQLhi8e51hsdWzc6orwrz8zdsoKwoCsHbzIZb/5/q0Zludw28s6j64/cRHBhqurrPMSbNXpeqv/4aTV8x1NWW88OdzkUIwGE+x9Cfvsqulx9WYcrWXRpk2P5FBodDXKZBDEUQylY3Q/arOd9NZY8A0eHvVHVSPCQPwTkMLn3n0JQ2k73SDffC1+T0XiLfyQjMgx1Tfm5p21TecgtHUVxaz9s80yIFYiov/dQMftPWjpEQZBo5hoqSJMi2UYaIMC2VaYBpgWGCYYJoow9QOybb1hAjpjmLkv6XU56QEKYjZDpd9cy17T3YCcGXdeF548FaQElU0vk7WLn4lPLnO+tBAR82YU5aac9tPUqWTKC3MY9NXFmBKQcJ2mP/kZs5Gk2BIMDUALAtlmijDcIEKPQHSQBkSJQ19GCYkUlrTQrimLTznlKvREc4JbTFLVv2aN/eeAmDJzCqWLZym5SibdrUYO33FhzLd4qn1FrNu2JK8eOk8HIft989jxugQfbEU/7j+CD/dfirjdNIz7zkeqAr7GFfoJ55Isqu1PwMKgUglMXu6mT2hhCmjC7TDUc7IZpuzeIU3HuvsZ09zF3m+AG89dCu1lWH6ogmW/+xtXt1zChnrx9nxTHnPod0d2U8yz0M+qvL65ORL5zmG5K/nVjJjtCbl9718kFcPngVpuI5FajFEbnD43rXVXDulBICrfrSFxp4EQpgIKRBDURCC0sI8Hv7sJeQHzI/Myn75+yY+aO4iYtvc+sTv2P/9OykK+vjnuy7nt/tOo4IliJqr1gGLLmi6xVPrLWfqgv+ySycQsEweWzIFgO2t/bx8pAvHkNoULRNluqNhgmGAYXJRRQFzxhR4z1s2swKVSqKEwhECGRsCIVjf0M6LO09+THruaAuWBp2RJF/5uQ4z40pCfPszc1GmAeXTFhbPWlB3QaBizJR7U5Pnlikp+dmttfhNScpR3PrLBtchuGswezQNHEOPCyeGGRXM+IK7L52A33BQSmHEYuAolJAoIXli42FOdg1yunuQ010XOgaIJVPDbQ5HGjiGhWNY/HpvK1uOaiv98hXTQJqoQAHULn5lRNMtrq63nKvu+UmqqIKKPIOlU7X5/XB7G70xW5ssWSFDSETaZIVAOQ631pbkiFQUsLh5ehm/ahpAxIfAEAgESgg6I0mu+Jf14HGIDEFQQoDjcMeccXzjppkEirSYh1q7+e3+0+DzgWW4y0fy1bU72futmygIWNy/eDo/ersJKusnlUybFe5u3Nubo1HpD5SlKqeBlHzvyioE0BtP8e0tLTqMCKHBSqlDhjT0eXesLs3j4rLgeYb2hTkTIBmHVAKE4Xpmw/PQWCbCMhGWD2H5wPSBaXHjrCq+dk0d5S5BaOka4MkNDbx1tAdhBbSXNQwwJc19cfa29gLwwLV1YEowLahZtOY803XGT1+ZKp2IEpJbqnVAfvVYnxvPDDBcYJ7pGt6INLhrmDbTn8snlTI+ZICdRElQhnQnzHAny8CRJo60cKSJskyuqK1g+dU12jMD3ZE4qzc08JuDnZCXhzJ9mXuEnrCvrdujQ2PIx+2zJ+rnVky7OVxdb3lAS6rrLbty+goMydVVhRT6DAC+ueW0p00lpEcQMprVo2FIPlcb9sD9dPtJIonM2rpnVqXnqdPg0utbGYbrzHRcvqSqhOWLJjNzrH5ePGWzesNBntnTjvKHUIYfldamkZbB4MDZCKe6de76pQWTtCIKyyEQKMto1DRCdmWtpaTk4QUVADQPJDgTs7XJGpqZYLjrQmaRAGlwxbgQlaGME/rZ3nZePJQJY8sumYijHByhMs8zJAhDH1L/XVtewPJFk1kwaZR37+pNjfzn+82IQAh8ljbZtEV4E6cV8M6JbgAuqiwEw0T5gzBp7moPqCocPT8xbgZKSOpG6erAumP9Hv06z2QNgXKFQwpumVzoCfbW8S4O9iZ5/dSgd25MOMjNs8ZnaTULrMucxhaHWLFwItfUjPbu+/E7h3lyywmEPx9MP0jL8wlpcMp7jsEv9rZ7TrAw6Ne/j6m5PQO0bMKdmlcK/Ib2pO+2RTIm62rR46JZa7bQb3LHlEzsfPNYF5gGbzQPcKIv7p2/vn4cStk4QuEIQ68t1yKKgz5WfKqK2+orvOt//v5xVm89SdzMQ/l8GQc2DKQjXaopDN473U80aQPwt4smo4TEyS8jXF1vSQAnVDIbKakMWVhS53yvNkfc2Ck9cu29SGSOO6bke5MTTzm8eKjdzcoUzx465wl+86wq8v0GKp2uGVpgyzJYcXkVX5yTKR6+uKeZ1VtP0q0s8AeyOLTMAHYnKu0r0py6fUBXFOdXFevzwQIQwmcWT6m31FV31yspubYqH4DBpKNjm5S63OGZnMxwTzep/qtpGbM1pGDjn8/zfg8YGWroNw1umzmWNXs7XMaorWPFgnHcN398xiIOtfHvW07QEgPhC6CEoU1diawYIbIGkUkNgRO9MaaU5DE65NMsiSBSCkwEqFDYQgimF+uSxbmYrUEpRzuPEYAKIbip0sfUoowTMqWgqijvguTthhlj+fmuNpRyECjunzeWFQsyIN873sETW45xqM9GWAFXUJkDJAeYi1/PgJaxP6FNN8/SFoc0EUJaEiF8KhQGIbz83k5nIzl5YdZ3d51cPy7vI7HUxdPGUFsWBMfmi7PKWHHZOHxuYW1vaw+Pv9vEzjMRlwzIrHQuk6+qNN9Or1NpoKTwwmB/QqPI97lx2jIhWFBjAjj5xZrGpVmEwEutMhOZBRZByBR8dkKGCb3Q2MnbrYOaNbnXyngMYyjKtxZXU5avreULl0zkpYZ2Vl1bTcA0vPtf2ddM0rb5VFWx9rCGgZAGSihQgv6EzYGuBCqt4ZxllKnhdMdsF4PQEyAEmP5iUwBysEvPRlJDzTP1jAlnWCEo6+F3TcwjZOo3RJI2TzV0sbMPsHDBCqy+CMbgIDUV5/jaPO1sFlWXkULlgAR46MZZF7QEpRRnBxN8/XdNvN06BNLnJuHpVFF6uWt7NOmJK4SbUsYjp6UCRLQPhKTPBeqXWnMZVuQe4IYZweKKTJvhreZ+dvY4YAXA8uvSiWHqtWMYvNMyiO3oLGZ6eSGTRhWMCGb44TgOjntfWcjirhml+ISDwsmVywuDBnPKdf4cTTpao6QgPtQqUU5CRnqTCEHUTjuVtKnK8+s4wKRCi0+P9XsCrj0VReUF9drySiQKlI2SBu+0Rdl2etADUFNWeB6g8/7OOpcGfEttKZ+uGYUuoEo9Svd9bqiZXKwJT3skhSMNnVA4TtLsOdqQLLrr73YjxLz3zmm1F1iSgCGI2eK8UgYIjg86FK3rAjuZKYWYPu3lhuWOSurx9peOaQ+p7KzqngCZTv0kCkdPbPp3d33mpG/pmC5UpnjmhhklBBMKfADs6xoCKZCJAUDpfFQM9BxAiHlHBm0GkooCS7CyPsz39/Zk+aNs7wfT8yV3jC+gzCeI2w5vnEmwsSNJynYAxRcn5lE/tYzHdrQTSTpumJCApLoowPKLS/lVUx+bz0RBKVbMKqEkYPLojg7itmLx2BC3TinyrCOSVLx0rIftZ4fSqFHKca1M6glTUOAmJId74ighEAM94DgJndH2ntkkon33OqEwLVGbGUUmC8sDXiwdDvTaCoun5wQJZvmTv5gU4PHDEVY16LLqA9OCVAUNfneih/fatXAKB6Tk6gn5LKspotAv2dyur18xq5RCn8G6o70cODfEPTOKuXFiYY593FtXwt+9e5o1jT0ueTC19l2fMrXYT0iTPdY19YEUmGeOHOk62pCUALKz5ddWq+5nbOnUFOqisDVsseN9v6HMJGjAa2dSLN8d5bsHo6QcxZIKv9t2yHhrz4mlzztqhIKfypxy7y1yNfOLxi6+vvEkvzjUBcBNkwq1JnFQytFy6V4Bqy4rB+BsNMWpSAKUQJxufNIj9Y7tJMzTB5NIyY+a9AyPCRpMKHBjYo4QCp/U9ryvL8WzLQkePzJE/e+6uPXd7hHqs27DCZG1nnKJTm7LxUHZNn1uPtvYFWXtoU7eb+vzIoJyUijHccsvKu06uHpsPkopNrVGUEIiBzqQZ44+7QHtPXYgaZ7Yt0okk+zrVzRHbQTw1PySYcxoBMlcUB1xh96EMwJM4TqK7DptlsYd5Qqd0a1Sjpf8TysJsGxaCfPd6uLRXr2mlbJdPyhQCP6qrphCn8RW8HyT7qWabUdwUk4it2Z0+tBqX9shEPDDwzpTX1LhJ+w3PWGzOWbuKHKdFSNpLXsJ5JTQh81d2lO7Nafpo1m9ZApfmKHz1P/e3+mFF2Sm1/P5KXo9dw6leLW5H0wD88jvH+t1twJkakapVMRs2pEEwRNHhoikFFLAf8wLu1rNApGtmBHibDZYb417Qsms7MMlJVIMa8VlkL5/ZpDnGrt4v10n8ksmhBFuLybNiK4cG2R+uebdPz7Yo71ttB95Yu+q84pjPUcbkta+jUutloMoIVjdNATA58YHKM8z3FQhF0TGnLMIRrrMkf5BSi+Ya/I9zPrT5ZT0xHglG33RM43dfP3tZp45rJ3R4glhMHPry/9zdSVCCDqGUnx/dxdIQd7v1+3uPpLprOVEeNV1ZqP/wKYOBPy//YMM2QpLCjZfN1qvBSHI7tUUWYKqoMGlxSZbF4f52fzCzHp2P6ODJuMKA1Tk+0GaIE0KfDq1SwHjCn2MKwp4XrYvKXKeURL0MX5UPiV5fm9ClWGB5QPD4JH5ZZTmmQghWLahFQQY3a2Ye95cfMHeS8/RA8lRsy+/wV9z2a549aX85fYB1i4opDrf5KeXhfny+z0AbO1Ocfd4i/sn+bh/ks+7P2a72hGwv9+hKih56srKTJFswxk2tg3xQVeCmK1YWpXPUjfZB9jeMUTKEODzebz74XkVPDwvU2LZ0hHXIIWkblQey+uKkVKysS3K1rNxlAD/3vUNXYd14fqCbcOu3Vt3+/Zt2A3wfEuc55pjOlhPCXHb+CAIyQutKR45HOPQgEPzkD5eaE1x354hLzf8TmOcZ1sStERStERSnBhI0ZEADIONHXEe2tXNnu7M76+dHuLbe/ppS1gow8/+PpvmiE1zJEVzJEXTQJL/aBzgqaZBMH2U5QfYdHMVPtMgqQS3b2gHBVbHScztr83/UB3vkpqZofgtKwaj828HpTh1cwlVQYOEo1i4vosdXfEMMcheozndNd0FN/sGADs3vxWC814rh3W5h3e+RaaPGjAMjt1ZRUnABCG55vXTbDkbQyZjhH71yD/0bnjhsQ/VCO4+si/if+e5xYGD74AQzHurl4SjicK260q5qTKQ8bJqeONWZAGXKEt3vFVW1U8Jqbvh2UfaiaVTvOzDtLwxYPlo+NwESoM+hJTc+XY7W87GEMrGv+OVyEgg/2Brv3vHxk2Bd557wHdyH2fjij/bPkBz1EEKWLeohMcvCWc8r8cSxHkdasdn6riXVcfVxWtxfrkm+3C7AOm2vpKCe6YWsOczVYwv8GEjeOrwAC+fioIU+A6/j/Xuc8Ufe/tN+Ja/XhO58b4vpkonUB4Q7LymmHF5OrNfe2qIe7f1ELNVLmiRia/CtpGxaJYnPj/WeqaZba0i15QfrC/ikTkluiAIPLK3h3/a1Q0IrOa9BJ/5ju8P7ST74/uMptRbqnrOo/13/+NKJ1hEQCo+uLaYGYXaYQ+mFF/d0cuaE9FcAFn1JRkdHEZ+xAjARgYetgS/WVLOwrKAV4r99Po2tpyNuSD3EXzmO/ndTX949+eH2jlWXF1nqZq5P4gtvHNFfOo8QPHPF4V4sDZIunR7uD/FP+zt56WWofO0J5NxvRMlG9Rw4jGMPk/IN/nvy0tZVB4gTZy2dcZY8nqbtiAh8De+R2Ddo77upj++J/AjbXosXrj03viVn/+voYuvAxTlfsFLlxdx2ahMbbc74fDkkQg/bByk142Fwk4hkonzE/hhKUxAwt2T8/nq9EIuLvF5VtCbcHjogy5+3Nivl4NjE9j8bK9v8y/LPuzGx4+8jbWkdlY4fv2Xe4Y+9TnNUFDcVulj9ex8xgVzK3v9ScXBviRvnonTMRBjf0+cpv4UZ4dsFlbkUWBJ6sM+rh4T4JJRfkYFjBwTPxez+f6+Xp441J8ReKifgmcf+lLPu688/X+/X7f6opCqvvi7idlLVsamX4kTLAClqCkw+F5dkJvG+L1S6Ef9JBzF0f4Uq/b28MLJiMt/JTI2iP+D3+LfsOaPrsdPfKt5Se2ssDN9wU8SsxYvi824Qrfq3efdVG7xF5MCzAybVAUNLCnIxq4A21FEbcXpiM2G9iGebhpgX09Cl1Rdk5axfnxH3iew/uk53Xu27v6T/vNASe3MkBpbc1+ybtEPEtMvJ1k2MZfhuN9lIjbiTs6cNM2dBbPzJP4PXmvw7XpjcdewzVF/+v+SmFpvCdMqprj88kTdwjXJKXNDqVFjcUJFKCuAcGxEMqk1lvVeYScRsX7M1qP492181Tq89R4nmYp8GG/6JwGaQzQm11lCSp80DEsY0qd8oYkqXDo/OXrSnQAyNnjSOHP8GTHYtVsplcC2k0o5iU/q3z+Gf/7/AGA6GHbbT3eNAAAAAElFTkSuQmCC"

/***/ },
/* 51 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	exports['default'] = function (nga, admin) {
	
	  var Categories = admin.getEntity('categories');
	  var rootCategories = nga.entity('categories/root');
	  var Cities = nga.entity('cities');
	
	  Categories.listView().fields([nga.field('name').isDetailLink(true).detailLinkRoute("show").label('Nombre'), nga.field('description', 'text').label('Descripción'), nga.field('categoryId').label('Nivel').map(function truncate(value, entry) {
	    entry['parent'] = value;
	    return value ? 'Sub Rubro' : 'Rubro';
	  }).transform(function allCaps(value, entry) {
	    return entry['parent'];
	  }).cssClasses(function (entry) {
	    if (entry) {
	      return entry.values.categoryId == 'Rubro' ? 'text-center bg-success' : 'text-center bg-warning';
	    } else {
	      return '';
	    }
	  }), nga.field('priority', 'number').label('Prioridad'), nga.field('ver', 'template').label('Ver').pinned(true).template('<ma-filtered-list-button ng-if="entry.values.has_entities" class="btn-warning" entity-name="entities" filter="{ categoryId: entry.values.id }" size="xs" label="Negocios"></ma-filtered-list-button><ma-filtered-list-button ng-if="entry.values.categoryId==\'Rubro\'" entity-name="categories" filter="{ categoryId: entry.values.id }" size="xs" label="Subrubros"></ma-filtered-list-button>')]).filters([nga.field('categoryId', 'reference').label('Rubro padre').perPage(100000).pinned(true).targetEntity(rootCategories).targetField(nga.field('name')).attributes({ placeholder: 'Elegir Rubro' }), nga.field('name', 'template').label('Incluye en el nombre').pinned(true).template('<div class="input-group"><input type="text" ng-model="value" placeholder="Search" class="form-control"></input><span class="input-group-addon"><i class="glyphicon glyphicon-search"></i></span></div>')]).actions(['filter', '<ma-create-button entity="::entity" label="Nueva"></ma-create-button>']).listActions(['<ma-show-button size="xs" entry="entry" entity="entity" label="Detalles"></ma-show-button>', '<ma-edit-button size="xs" entry="entry" entity="entity" label="Editar"></ma-edit-button>', '<ma-delete-button size="xs" entry="entry" entity="entity" label="Borrar"></ma-delete-button>']);
	
	  Categories.creationView().fields([nga.field('name').label('Nombre'), nga.field('description', 'text').label('Descripción'), nga.field('categoryId', 'reference').label('Rubro Padre').perPage(100000).pinned(true).targetEntity(rootCategories).targetField(nga.field('name')).attributes({ placeholder: 'Sin rubro padre' }), nga.field('has_entities', 'boolean').label("Tiene entidades hijas?").attributes({ placeholder: "Si/No" }).choices([{ value: true, label: 'Si' }, { value: false, label: 'No' }]).cssClasses('container-fluid'), nga.field('belongsToCity', 'reference_many').label("Se lo ve en las ciudades").perPage(10000).targetEntity(Cities).targetField(nga.field('name')), nga.field('priority', 'choice').label('Prioridad').choices([{ label: '1', value: '1' }, { label: '2', value: '2' }, { label: '3', value: '3' }, { label: '4', value: '4' }, { label: '5', value: '5' }, { label: '6', value: '6' }, { label: '7', value: '7' }, { label: '8', value: '8' }, { label: '9', value: '9' }, { label: '10', value: '10' }, { label: '11', value: '11' }, { label: '12', value: '12' }, { label: '13', value: '13' }, { label: '14', value: '14' }, { label: '15', value: '15' }, { label: '16', value: '16' }, { label: '17', value: '17' }, { label: '18', value: '18' }, { label: '19', value: '19' }, { label: '20', value: '20' }, { label: '21', value: '21' }, { label: '22', value: '22' }, { label: '23', value: '23' }, { label: '24', value: '24' }, { label: '25', value: '25' }, { label: '26', value: '26' }, { label: '27', value: '27' }, { label: '28', value: '28' }, { label: '29', value: '29' }, { label: '30', value: '30' }])]);
	
	  Categories.showView().fields([nga.field('name', 'text').label('Nombre'), nga.field('description', 'text').label('Descripción'), nga.field('has_entities', 'boolean').label("Negocios").template('<strong ng-if="!entry.values.has_entities">No tiene permitido los Negocios hijos</strong><ma-filtered-list-button ng-if="entry.values.has_entities" class="btn-warning" entity-name="entities" filter="{ categoryId: entry.values.id }" size="xs" label="Ver Negocios hijos"></ma-filtered-list-button>'), nga.field('belongsToCity', 'reference_many').label("Ciudades").targetEntity(Cities).targetField(nga.field('name')), nga.field('subcategories', 'referenced_list').label('Categorías hijas').targetEntity(Categories).targetReferenceField('categoryId').targetFields([nga.field('name').label('').isDetailLink(true).detailLinkRoute("show"), nga.field('priority', 'number').label('Prioridad')]), nga.field('categoryId', 'reference').label('Rubro Padre').isDetailLink(true).detailLinkRoute("show").targetEntity(Categories).targetField(nga.field('name')).attributes({ placeholder: "Sin rubro padre" }),
	  // .map(function(value){
	  //   return (value==undefined)?'No tiene categoría padre (es Raíz)':value;
	  // }),
	
	  nga.field('priority', 'number').label('Prioridad')]).title('Detalles del Rubro').actions(['<ma-list-button entry="entry" entity="entity" label="Lista"></ma-list-button>', '<ma-edit-button entry="entry" entity="entity" label="Editar"></ma-edit-button>']);
	
	  Categories.editionView().fields([nga.field('name', 'text').label('Nombre'), nga.field('description', 'text').label('Descripción'), nga.field('categoryId', 'reference').label('Rubro Padre').perPage(100000).pinned(true).targetEntity(rootCategories).targetField(nga.field('name')).attributes({ placeholder: "Sin rubro padre" }), nga.field('has_entities', 'boolean').label("Tiene entidades hijas?").attributes({ placeholder: "Si/No" }).choices([{ value: true, label: 'Si' }, { value: false, label: 'No' }]).cssClasses('container-fluid'), nga.field('belongsToCity', 'reference_many').label("Ciudades").perPage(10000).targetEntity(Cities).targetField(nga.field('name')).attributes({ placeholder: "Elegir ciudades" }), nga.field('priority', 'choice').label('Prioridad').choices([{ label: '1', value: '1' }, { label: '2', value: '2' }, { label: '3', value: '3' }, { label: '4', value: '4' }, { label: '5', value: '5' }, { label: '6', value: '6' }, { label: '7', value: '7' }, { label: '8', value: '8' }, { label: '9', value: '9' }, { label: '10', value: '10' }, { label: '11', value: '11' }, { label: '12', value: '12' }, { label: '13', value: '13' }, { label: '14', value: '14' }, { label: '15', value: '15' }, { label: '16', value: '16' }, { label: '17', value: '17' }, { label: '18', value: '18' }, { label: '19', value: '19' }, { label: '20', value: '20' }, { label: '21', value: '21' }, { label: '22', value: '22' }, { label: '23', value: '23' }, { label: '24', value: '24' }, { label: '25', value: '25' }, { label: '26', value: '26' }, { label: '27', value: '27' }, { label: '28', value: '28' }, { label: '29', value: '29' }, { label: '30', value: '30' }]), nga.field('subdomain', 'template').label('Subdominio').template('<subdomain></subdomain>'), nga.field('logo', 'template').label('Logotipo (imagen de baja resolución)').template('<entity-image target="logo"></entity-image>'), nga.field('cover', 'template').label('Portada (imagen widescreen de baja resolución)').template('<entity-image target="cover"></entity-image>'), nga.field('webcover', 'template').label('Cover web (imagen de alta resolución)').template('<entity-image target="webcover"></entity-image>')]).
	
	  // nga.field('subcategories', 'referenced_list')
	  //   .label('Categorías hijas')
	  //   .targetEntity(category)
	  //   .targetReferenceField('categoryId')
	  //   .targetFields([
	  //       nga.field('name').label('')
	  //   ])
	  title('Editando "{{ entry.values.name }}"').actions(['<ma-list-button entry="entry" entity="entity" label="Lista"></ma-list-button>', '<ma-delete-button entry="entry" entity="entity" label="Borrar"></ma-delete-button>']);
	
	  Categories.deletionView().fields(nga.field('name').label('Nombre')).actions(['<ma-list-button entry="entry" entity="entity" label="Lista"></ma-list-button>']).title('Borrar "{{ entry.values.name }}"');
	
	  return Categories;
	};
	
	module.exports = exports['default'];

/***/ },
/* 52 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	exports['default'] = function (nga, admin) {
	
	  var Entities = admin.getEntity('entities');
	  var Categories = nga.entity('categories');
	  var rubrosConEntidades = nga.entity('categories/has_entities');
	  var Cities = nga.entity('cities').label("Ciudades");
	  var Tags = nga.entity('tags');
	
	  Entities.listView().fields([nga.field('name').isDetailLink(true).label('Nombre'), nga.field('categories', 'template').label('Rubros').template('<span ng-repeat="category in entry.values.categories track by $index" class="label label-default">{{ category.name }}</span>').cssClasses('hidden-xs'), nga.field('activate', 'template').label('Estado').template('<active-entity ng-if="!entry.values.active" entry="entry"></active-entity><deactive-entity ng-if="entry.values.active" entity="entry"></deactive-entity>'), nga.field('ver', 'template').label('Ver').pinned(true).template('<ma-filtered-list-button class="btn-warning" entity-name="adverts" filter="{ entityId: entry.values.id }" size="xs" label="Promociones"></ma-filtered-list-button>')]).filters([nga.field('categories', 'reference').label('Rubro').perPage(100000).pinned(false).targetEntity(rubrosConEntidades).targetField(nga.field('name')).attributes({ placeholder: 'Elegir Rubro' }), nga.field('name', 'template').label('Buscar por nombre').pinned(true).template('<search id="1" placeholder="escribir cualquier parte del nombre"></search>'), nga.field('address', 'template').label('Buscar por calle').pinned(false).template('<search placeholder="Filtrar..."></search>'), nga.field('cityId', 'reference').label('Ciudad').perPage(100000).pinned(false).targetEntity(Cities).targetField(nga.field('name')).attributes({ placeholder: 'Elegir Ciudad' }), nga.field('tags', 'reference').label('Tags').perPage(100000).pinned(false).targetEntity(Tags).targetField(nga.field('name')).attributes({ placeholder: 'Describir Tag' })]).actions(['batch', 'filter', '<ma-create-button entity="::entity" label="Nueva"></ma-create-button>']).listActions(['<ma-edit-button size="xs" entry="entry" entity="entity" label="Editar"></ma-edit-button>', '<ma-delete-button size="xs" entry="entry" entity="entity" label="Borrar"></ma-delete-button>']).title('Entidades');
	
	  Entities.creationView().fields([nga.field('name').label('Nombre'), nga.field('description', 'text').label('Descripción'), nga.field('belongsToCategory', 'reference_many').label("Rubros").perPage(10000).targetEntity(Categories).permanentFilters({ "has_entities": true }).targetField(nga.field('name')), nga.field('hasTags', 'reference_many').label("Tags").perPage(10000).targetEntity(Tags).targetField(nga.field('name'))]).title('Nueva Entidad');
	
	  Entities.editionView().fields([nga.field('submit', 'template').template('<input class="btn btn-info button-submit-form" type="submit" id="submitForm" value="Guardar cambios" ng-click="formController.submitEdition($event)">', true), nga.field('dummy').label('').template('<h3>Información básica:</h3>'), nga.field('name').label('Nombre'), nga.field('description', 'text').label('Quiénes somos'), nga.field('shortTimeDesc').attributes({ placeholder: 'Máximo 40 caractéres' }).validation({ maxlength: 40 }).label('“Dirección especifica'), nga.field('dummy').label('').template('<h3>Ubicación en la app:</h3>'), nga.field('dummy').label('').template('Seleccione los rubros correspondientes a su negocio.'), nga.field('belongsToCategory', 'reference_many').label("Rubros").perPage(10000).targetEntity(Categories).permanentFilters({ "has_entities": true }).targetField(nga.field('name')), nga.field('dummy').label('').template('Las tags sirven para que los usuarios ubiquen su negocio en una búsqueda. Seleccione entre las tags existentes o agregue nuevas.'), nga.field('hasTags', 'reference_many').label("Tags").perPage(10000).targetEntity(Tags).targetField(nga.field('name')), nga.field('hasTags').label('').template('<add-new-tag entry="entry" datastore="datastore"></add-new-tag>'), nga.field('dummy').label('').template('<h3>Datos de contacto:</h3>'), nga.field('address').label('Dirección'), nga.field('cityId', 'reference').label('Ciudad').targetEntity(Cities).targetField(nga.field('name')), nga.field('geoLocation', 'template').label('Obtener Geo localización').template('<geo></geo>'), nga.field('phone').label('Teléfono Fijo'), nga.field('mobile').label('Teléfono Celular'), nga.field('email').label('E-mail'), nga.field('website').label('Página Web'), nga.field('facebook').label('Facebook'), nga.field('twitter').label('Twitter'), nga.field('whatsapp').label('Whatsapp'), nga.field('instagram').label('Instagram'), nga.field('dummy').label('').template('<h3>Información Comercial:</h3>'), nga.field('dummy').label('').template('<services></services>'), nga.field('services', 'wysiwyg').label('Servicios').stripTags(false), nga.field('timeSheet', 'wysiwyg').label('Horarios'), nga.field('productSheet', 'wysiwyg').label('Productos'), nga.field('dummy').label('').template('<payment></payment>'), nga.field('paymentSheet', 'wysiwyg').label('Formas de pago'), nga.field('dummy').label('').template('<h3>Imagenes:</h3>'), nga.field('logo', 'template').label('Logotipo (imagen de baja resolución)').template('<entity-image target="logo"></entity-image>'), nga.field('cover', 'template').label('Portada (imagen widescreen de baja resolución)').template('<entity-image target="cover"></entity-image>'), nga.field('webcover', 'template').label('Cover web (imagen de alta resolución)').template('<entity-image target="webcover"></entity-image>'), nga.field('photos', 'template').label('Fotos').template('<entity-image target="photo" multi="true"></entity-image>'), nga.field('qrcode', 'template').label('Código QR').template('<entity-image target="qrcode"></entity-image>'), nga.field('dummy').label('').template('<h3>Datos de Sistema:</h3>'), nga.field('subdomain', 'template').label('Subdominio').template('<subdomain></subdomain>'), nga.field('template', 'choice').defaultValue("uno").attributes({ placeholder: 'Plantilla' }).choices([{ value: 'uno', label: 'Plantilla 1' }, { value: 'dos', label: 'Plantilla 2' }, { value: 'tres', label: 'Plantilla 3' }]).label('Tipo perfíl')]).title('Editar Entidad').actions(['<ma-list-button entry="entry" entity="entity" label="Lista"></ma-list-button>', '<ma-delete-button entry="entry" entity="entity" label="Borrar"></ma-delete-button>']);
	
	  Entities.deletionView().fields(nga.field('name').label('Nombre')).actions(['<ma-list-button entry="entry" entity="entity" label="Lista"></ma-list-button>']).title('Borrar Entidad "{{ entry.values.name }}"');
	
	  return Entities;
	};
	
	module.exports = exports['default'];

/***/ },
/* 53 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	exports['default'] = function (nga, admin) {
	
	  var Adverts = admin.getEntity('adverts');
	  var Entities = admin.getEntity('entities');
	
	  Adverts.listView().fields([nga.field('title').isDetailLink(true).detailLinkRoute("show").label('Título'), nga.field('description', 'text').label('Descripción'), nga.field('creation_date', 'date').label('Creado el día'), nga.field('entityId', 'reference').targetEntity(Entities).targetField(nga.field('name')).label('Entidad'), nga.field('facebook', 'template').label('Facebook').template('<publish-facebook></publish-facebook>')]).filters([nga.field('entityId', 'reference').label('Negocio').perPage(100000).pinned(true).targetEntity(Entities).targetField(nga.field('name')).attributes({ placeholder: 'Filtrar' }), nga.field('title', 'template').label('Título').pinned(true).template('<search placeholder="filtrar"></search>'), nga.field('description', 'template').label('Descripción').pinned(true).template('<search placeholder="filtrar"></search>')]).actions(['batch', '<ma-create-button entity="::entity" label="Nueva"></ma-create-button>']).listActions(['<ma-edit-button size="xs" entry="entry" entity="entity" label="Editar"></ma-edit-button>', '<ma-delete-button size="xs" entry="entry" entity="entity" label="Borrar"></ma-delete-button>']).title('Promociones');
	
	  Adverts.creationView().fields([nga.field('entityId', 'reference').perPage(10000).label('Entidad').targetEntity(Entities).targetField(nga.field('name')).attributes({ placeholder: "Tipear nombre para filtrar" }), nga.field('banner', 'choice').choices([{ value: false, label: 'Texto' }, { value: true, label: 'Banner' }]).defaultValue(false).attributes({ placeholder: 'Tipo' }).validation({ required: true }).label('Tipo de Promoción'), nga.field('cover', 'template').label('Banner').template('<entity-image target="advert"></entity-image>'), nga.field('title').label('Título').validation({ required: true }), nga.field('subtitle', 'text').label('Subtítulo'), nga.field('description', 'text').label('Descripción').validation({ required: true }), nga.field('date_description', 'text').label('Descripción de fecha')]).title('Promociones');
	
	  Adverts.editionView().fields([nga.field('entityId', 'reference').perPage(10000).label('Entidad').targetEntity(Entities).targetField(nga.field('name')).attributes({ placeholder: "Tipear nombre para filtrar" }), nga.field('banner', 'choice').defaultValue(false).attributes({ placeholder: 'Tipo' }).choices([{ value: false, label: 'Texto' }, { value: true, label: 'Banner' }]).label('Tipo de Promoción'), nga.field('cover', 'template').label('Banner').template('<entity-image target="advert"></entity-image>'), nga.field('title').label('Título'), nga.field('subtitle', 'text').label('Subtítulo'), nga.field('description', 'text').label('Descripción'), nga.field('date_description', 'text').label('Descripción de fecha')]).title('Editar Promoción').actions(['<ma-list-button entry="entry" entity="entity" label="Lista"></ma-list-button>', '<ma-delete-button entry="entry" entity="entity" label="Borrar"></ma-delete-button>']);
	
	  Adverts.showView().fields([nga.field('banner').label('Tipo de Promoción').map(function (value) {
	    return value ? 'Banner' : 'Texto';
	  }), nga.field('cover', 'template').label('Imagen').template('<entity-image target="advert" view="show"></entity-image>'), nga.field('title').label('Título'), nga.field('description', 'text').label('Descripción'), nga.field('creation_date', 'date').label('Creado el día').format('dd/MM/yyyy'), nga.field('entityId', 'reference').targetEntity(Entities).targetField(nga.field('name')).isDetailLink(true).detailLinkRoute('edit').label('Entidad'),
	
	  // nga.field('facebookPostId', 'template').label('Facebook')
	  // .template('<publish-facebook ng-if="!value"></publish-facebook><a ng-if="value" ng-href="https://www.facebook.com/{{value}}" target="_blank">https://www.facebook.com/{{value}}</a>')
	
	  nga.field('facebookPostId', 'template').label('Facebook').template('<publish-facebook></publish-facebook>')]).title('Promociones');
	
	  Adverts.deletionView().fields(nga.field('title').label('Titulo')).actions(['<ma-list-button entry="entry" entity="entity" label="Lista"></ma-list-button>']).title('Borrar Promocion "{{ entry.values.title }}"');
	
	  return Adverts;
	};
	
	module.exports = exports['default'];

/***/ },
/* 54 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	exports['default'] = function (nga, admin) {
	
	  var Tags = admin.getEntity('tags');
	  var Usuarios = admin.getEntity('usuarios');
	  var Entities = admin.getEntity('entities');
	  var userId = JSON.parse(localStorage.getItem('az_admin_user')).id;
	
	  Tags.listView().title('Tags').fields([nga.field('name').isDetailLink(true).detailLinkRoute("show").label('Nombre'), nga.field('description', 'text').label('Descripción'), nga.field('ownerId', 'reference').targetEntity(Usuarios).targetField(nga.field('name')).label('Creada por'), nga.field('ver', 'template').label('Ver').pinned(true).template('<ma-filtered-list-button class="btn-warning" entity-name="entities" filter="{ tags: entry.values.id }" size="xs" label="Entidades relacionadas"></ma-filtered-list-button>')]).actions(['batch', '<ma-create-button entity="::entity" label="Nueva"></ma-create-button>']).filters([nga.field('name', 'template').label('Nombre').pinned(true).template('<search placeholder="filtrar"></search>')]).listActions(['<ma-edit-button size="xs" entry="entry" entity="entity" label="Editar"></ma-edit-button>', '<ma-delete-button size="xs" entry="entry" entity="entity" label="Borrar"></ma-delete-button>']).batchActions(['delete']);
	
	  Tags.creationView().fields([nga.field('name').label('Nombre').validation({ required: true }), nga.field('description', 'text').label('Descripción'), nga.field('ownerId').defaultValue(userId).label('').cssClasses(function (entry) {
	    return 'hidden';
	  })]).title('Tags');
	
	  Tags.showView().fields([nga.field('name').label('Nombre').validation({ required: true }), nga.field('description', 'text').label('Descripción'), nga.field('ownerId', 'reference').targetEntity(Usuarios).targetField(nga.field('name')), nga.field('entities', 'embedded_list').targetFields([nga.field('name').isDetailLink(true).label('Nombre'), nga.field('activate', 'template').label('Estado').template('<active-entity ng-if="!entry.values.active" entry="entry"></active-entity><deactive-entity ng-if="entry.values.active" entity="entry"></deactive-entity>'), nga.field('ver', 'template').label('Ver').pinned(true).template('<ma-filtered-list-button class="btn-warning" entity-name="adverts" filter="{ entityId: entry.values.id }" size="xs" label="Promociones"></ma-filtered-list-button>')])]).title('Ver Tag').actions(['<ma-list-button entry="entry" entity="entity" label="Lista"></ma-list-button>']);
	
	  Tags.editionView().fields([nga.field('name').label('Nombre').validation({ required: true }), nga.field('description', 'text').label('Descripción'), nga.field('hasEntities', 'reference_many').label("Negocios").perPage(10000).targetEntity(Entities).targetField(nga.field('name'))]).title('Editar Tag').actions(['<ma-list-button entry="entry" entity="entity" label="Lista"></ma-list-button>', '<ma-delete-button entry="entry" entity="entity" label="Borrar"></ma-delete-button>']);
	
	  Tags.deletionView().fields(nga.field('name').label('Nombre')).actions(['<ma-list-button entry="entry" entity="entity" label="Lista"></ma-list-button>']).title('Borrar Tag "{{ entry.values.name }}"');
	
	  return Tags;
	};
	
	module.exports = exports['default'];

/***/ },
/* 55 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	exports['default'] = function (nga, admin) {
	
	  var Cities = admin.getEntity('cities');
	  var States = admin.getEntity('states');
	
	  Cities.listView().fields([nga.field('name').isDetailLink(true).detailLinkRoute("edit").label('Nombre'), nga.field('zipcode', 'text').label('Código Postal'), nga.field('stateId', 'reference').targetEntity(States).targetField(nga.field('name')).label('Provincia')]).filters([nga.field('stateId', 'reference').label('Provincia').pinned(true).targetEntity(States).targetField(nga.field('name')).attributes({ placeholder: 'Elegir' })]).actions(['<ma-create-button entity="::entity" label="Nueva"></ma-create-button>']).listActions(['<ma-edit-button size="xs" entry="entry" entity="entity" label="Editar"></ma-edit-button>', '<ma-delete-button size="xs" entry="entry" entity="entity" label="Borrar"></ma-delete-button>']).title('Ciudades');
	
	  Cities.creationView().fields([nga.field('stateId', 'reference').validation({ required: true }).targetEntity(States).targetField(nga.field('name')).label('Provincia'), nga.field('name').isDetailLink(true).detailLinkRoute("edit").label('Nombre'), nga.field('zipcode', 'text').label('Código Postal'), nga.field('facebook_page_id', 'text').label('Facebook Fan Page ID'), nga.field('facebook_page_token', 'text').label('Facebook Fan Page TOKEN')]).title('Nueva Ciudad');
	
	  Cities.editionView().fields([nga.field('stateId', 'reference').validation({ required: true }).targetEntity(States).targetField(nga.field('name')).label('Provincia'), nga.field('name').isDetailLink(true).detailLinkRoute("edit").label('Nombre'), nga.field('zipcode', 'text').label('Código Postal'), nga.field('geopoint', 'template').label('Geo Localización').template('<geo></geo>'), nga.field('facebook_page_id', 'text').label('Facebook Fan Page ID'), nga.field('facebook_page_token', 'text').label('Facebook Fan Page TOKEN')]).title('Editando "{{ entry.values.name }}"').actions(['<ma-list-button entry="entry" entity="entity" label="Lista"></ma-list-button>', '<ma-delete-button entry="entry" entity="entity" label="Borrar"></ma-delete-button>']);
	
	  Cities.deletionView().fields(nga.field('name').label('Nombre')).actions(['<ma-list-button entry="entry" entity="entity" label="Lista"></ma-list-button>']).title('Estás completamente seguro? Posiblemente estes borrando datos importantes relacionados a esta cidad, como negocios, promociones y usuarios...');
	
	  return Cities;
	};
	
	module.exports = exports['default'];

/***/ },
/* 56 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	exports['default'] = function (nga, admin) {
	
	  var Usuarios = admin.getEntity('usuarios');
	
	  Usuarios.listView().title('Usuarios').fields([nga.field('username').isDetailLink(true).detailLinkRoute("edit").label('Username'), nga.field('name', 'text').label('Nombre'), nga.field('email', 'text').label('Email'), nga.field('createdDate', 'date').label('Desde')]).filters([nga.field('owner', 'boolean').choices([{ label: 'Usuario de App' }, { label: 'Dueño de negocio' }]).pinned(true).label("Tipo [true:dueños/false:usuarios]").attributes({ placeholder: "Todos" }), nga.field('name', 'template').label('Nombre:').pinned(true).template('<search placeholder="Búsqueda por nombre"></search>'), nga.field('username', 'template').label('Username:').pinned(true).template('<search placeholder="Búsqueda por username"></search>')]).actions(['<ma-create-button entity="::entity" label="Nuevo"></ma-create-button>']).listActions(['<ma-edit-button size="xs" entry="entry" entity="entity" label="Editar"></ma-edit-button>', '<ma-delete-button size="xs" entry="entry" entity="entity" label="Borrar"></ma-delete-button>']);
	
	  Usuarios.creationView().fields([nga.field('username').isDetailLink(true).detailLinkRoute("show").label('Username'), nga.field('name', 'text').label('Nombre'), nga.field('email', 'text').label('Email'), nga.field('password', 'text').label('Contraseña')]).title('Usuarios');
	
	  Usuarios.editionView().fields([nga.field('username').isDetailLink(true).detailLinkRoute("show").label('Username'), nga.field('name', 'text').label('Nombre'), nga.field('email', 'text').label('Email'), nga.field('password', 'text').label('Contraseña')]).title('Editar Usuario "{{ entry.values.name }}"');
	
	  Usuarios.deletionView().fields(nga.field('name').label('Nombre')).actions(['<ma-list-button entry="entry" entity="entity" label="Lista"></ma-list-button>']).title('Borrar Usuario "{{ entry.values.username }}"');
	
	  return Usuarios;
	};
	
	module.exports = exports['default'];

/***/ },
/* 57 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	exports['default'] = function (nga, admin) {
	
	  var Chatrooms = admin.getEntity('chatrooms');
	  var userId = JSON.parse(localStorage.getItem('az_admin_user')).id;
	
	  Chatrooms.listView().url(function () {
	    return 'usuarios/' + userId + "/chatrooms";
	  }).permanentFilters({
	    include: 'users'
	  }).actions([]).sortField("last_activity")
	  // .permanentFilters({ hide: false })
	  .fields([nga.field('users', 'template').label('Desde user').template('<roommate></roommate>'), nga.field('hide', 'template').label('Ocultar').template('<ma-delete-button entry="entry" entity="entity" entity-name="chatrooms" label="Ocultar" size="xs"></ma-delete-button>'), nga.field('type').label('Tipo').map(function (value) {
	    return (value = 'suggestion') ? 'Sugerencia' : 'Mensaje';
	  }), nga.field('last_activity', 'date').label('Ultima actividad').map(function (value) {
	    return moment(value).format('D [del] M [de] YYYY, h:mm a');
	  })])
	  // ,'<hide-room></hide-room>'
	  .listActions(['<messages></messages>']).title('Conversaciones');
	
	  Chatrooms.deletionView().fields(nga.field('name').label('Chat')).actions(['<ma-list-button entry="entry" entity="entity" label="Lista"></ma-list-button>']).title('¿Ocultar estos mensajes?').description('Los mensajes volveran a ser visibles cuando vuelvan a tener actividad.');
	
	  return Chatrooms;
	};
	
	module.exports = exports['default'];

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	var moment = __webpack_require__(59);
	var fromNow = function fromNow(v) {
	  return moment(v).fromNow();
	};
	
	exports['default'] = function (nga, admin) {
	
	  return nga.dashboard().addCollection(nga.collection(admin.getEntity('chatrooms')).name('ultimos_mensajes').title('Últimos mensajes')
	  //.permanentFilters({ date: { gte: moment().substract(1, 'months').toDate() } })
	  .fields([nga.field('users', 'template').label('Desde user').template('<roommate></roommate>'), nga.field('hide', 'template').label('Ocultar').template('<ma-delete-button entry="entry" entity="entity" entity-name="chatrooms" label="Ocultar" size="xs"></ma-delete-button>'), nga.field('type').label('Tipo').map(function (value) {
	    return (value = 'suggestion') ? 'Sugerencia' : 'Mensaje';
	  }), nga.field('last_activity', 'date').label('Ultima actividad').map(function (value) {
	    return moment(value).format('D [del] M [de] YYYY, h:mm a');
	  })]).sortField('last_activity').sortDir('DESC').permanentFilters({
	    include: 'users'
	  }).perPage(10));
	};
	
	module.exports = exports['default'];

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {//! moment.js
	//! version : 2.15.0
	//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
	//! license : MIT
	//! momentjs.com
	
	;(function (global, factory) {
	     true ? module.exports = factory() :
	    typeof define === 'function' && define.amd ? define(factory) :
	    global.moment = factory()
	}(this, function () { 'use strict';
	
	    var hookCallback;
	
	    function utils_hooks__hooks () {
	        return hookCallback.apply(null, arguments);
	    }
	
	    // This is done to register the method called with moment()
	    // without creating circular dependencies.
	    function setHookCallback (callback) {
	        hookCallback = callback;
	    }
	
	    function isArray(input) {
	        return input instanceof Array || Object.prototype.toString.call(input) === '[object Array]';
	    }
	
	    function isObject(input) {
	        // IE8 will treat undefined and null as object if it wasn't for
	        // input != null
	        return input != null && Object.prototype.toString.call(input) === '[object Object]';
	    }
	
	    function isObjectEmpty(obj) {
	        var k;
	        for (k in obj) {
	            // even if its not own property I'd still call it non-empty
	            return false;
	        }
	        return true;
	    }
	
	    function isDate(input) {
	        return input instanceof Date || Object.prototype.toString.call(input) === '[object Date]';
	    }
	
	    function map(arr, fn) {
	        var res = [], i;
	        for (i = 0; i < arr.length; ++i) {
	            res.push(fn(arr[i], i));
	        }
	        return res;
	    }
	
	    function hasOwnProp(a, b) {
	        return Object.prototype.hasOwnProperty.call(a, b);
	    }
	
	    function extend(a, b) {
	        for (var i in b) {
	            if (hasOwnProp(b, i)) {
	                a[i] = b[i];
	            }
	        }
	
	        if (hasOwnProp(b, 'toString')) {
	            a.toString = b.toString;
	        }
	
	        if (hasOwnProp(b, 'valueOf')) {
	            a.valueOf = b.valueOf;
	        }
	
	        return a;
	    }
	
	    function create_utc__createUTC (input, format, locale, strict) {
	        return createLocalOrUTC(input, format, locale, strict, true).utc();
	    }
	
	    function defaultParsingFlags() {
	        // We need to deep clone this object.
	        return {
	            empty           : false,
	            unusedTokens    : [],
	            unusedInput     : [],
	            overflow        : -2,
	            charsLeftOver   : 0,
	            nullInput       : false,
	            invalidMonth    : null,
	            invalidFormat   : false,
	            userInvalidated : false,
	            iso             : false,
	            parsedDateParts : [],
	            meridiem        : null
	        };
	    }
	
	    function getParsingFlags(m) {
	        if (m._pf == null) {
	            m._pf = defaultParsingFlags();
	        }
	        return m._pf;
	    }
	
	    var some;
	    if (Array.prototype.some) {
	        some = Array.prototype.some;
	    } else {
	        some = function (fun) {
	            var t = Object(this);
	            var len = t.length >>> 0;
	
	            for (var i = 0; i < len; i++) {
	                if (i in t && fun.call(this, t[i], i, t)) {
	                    return true;
	                }
	            }
	
	            return false;
	        };
	    }
	
	    function valid__isValid(m) {
	        if (m._isValid == null) {
	            var flags = getParsingFlags(m);
	            var parsedParts = some.call(flags.parsedDateParts, function (i) {
	                return i != null;
	            });
	            var isNowValid = !isNaN(m._d.getTime()) &&
	                flags.overflow < 0 &&
	                !flags.empty &&
	                !flags.invalidMonth &&
	                !flags.invalidWeekday &&
	                !flags.nullInput &&
	                !flags.invalidFormat &&
	                !flags.userInvalidated &&
	                (!flags.meridiem || (flags.meridiem && parsedParts));
	
	            if (m._strict) {
	                isNowValid = isNowValid &&
	                    flags.charsLeftOver === 0 &&
	                    flags.unusedTokens.length === 0 &&
	                    flags.bigHour === undefined;
	            }
	
	            if (Object.isFrozen == null || !Object.isFrozen(m)) {
	                m._isValid = isNowValid;
	            }
	            else {
	                return isNowValid;
	            }
	        }
	        return m._isValid;
	    }
	
	    function valid__createInvalid (flags) {
	        var m = create_utc__createUTC(NaN);
	        if (flags != null) {
	            extend(getParsingFlags(m), flags);
	        }
	        else {
	            getParsingFlags(m).userInvalidated = true;
	        }
	
	        return m;
	    }
	
	    function isUndefined(input) {
	        return input === void 0;
	    }
	
	    // Plugins that add properties should also add the key here (null value),
	    // so we can properly clone ourselves.
	    var momentProperties = utils_hooks__hooks.momentProperties = [];
	
	    function copyConfig(to, from) {
	        var i, prop, val;
	
	        if (!isUndefined(from._isAMomentObject)) {
	            to._isAMomentObject = from._isAMomentObject;
	        }
	        if (!isUndefined(from._i)) {
	            to._i = from._i;
	        }
	        if (!isUndefined(from._f)) {
	            to._f = from._f;
	        }
	        if (!isUndefined(from._l)) {
	            to._l = from._l;
	        }
	        if (!isUndefined(from._strict)) {
	            to._strict = from._strict;
	        }
	        if (!isUndefined(from._tzm)) {
	            to._tzm = from._tzm;
	        }
	        if (!isUndefined(from._isUTC)) {
	            to._isUTC = from._isUTC;
	        }
	        if (!isUndefined(from._offset)) {
	            to._offset = from._offset;
	        }
	        if (!isUndefined(from._pf)) {
	            to._pf = getParsingFlags(from);
	        }
	        if (!isUndefined(from._locale)) {
	            to._locale = from._locale;
	        }
	
	        if (momentProperties.length > 0) {
	            for (i in momentProperties) {
	                prop = momentProperties[i];
	                val = from[prop];
	                if (!isUndefined(val)) {
	                    to[prop] = val;
	                }
	            }
	        }
	
	        return to;
	    }
	
	    var updateInProgress = false;
	
	    // Moment prototype object
	    function Moment(config) {
	        copyConfig(this, config);
	        this._d = new Date(config._d != null ? config._d.getTime() : NaN);
	        // Prevent infinite loop in case updateOffset creates new moment
	        // objects.
	        if (updateInProgress === false) {
	            updateInProgress = true;
	            utils_hooks__hooks.updateOffset(this);
	            updateInProgress = false;
	        }
	    }
	
	    function isMoment (obj) {
	        return obj instanceof Moment || (obj != null && obj._isAMomentObject != null);
	    }
	
	    function absFloor (number) {
	        if (number < 0) {
	            // -0 -> 0
	            return Math.ceil(number) || 0;
	        } else {
	            return Math.floor(number);
	        }
	    }
	
	    function toInt(argumentForCoercion) {
	        var coercedNumber = +argumentForCoercion,
	            value = 0;
	
	        if (coercedNumber !== 0 && isFinite(coercedNumber)) {
	            value = absFloor(coercedNumber);
	        }
	
	        return value;
	    }
	
	    // compare two arrays, return the number of differences
	    function compareArrays(array1, array2, dontConvert) {
	        var len = Math.min(array1.length, array2.length),
	            lengthDiff = Math.abs(array1.length - array2.length),
	            diffs = 0,
	            i;
	        for (i = 0; i < len; i++) {
	            if ((dontConvert && array1[i] !== array2[i]) ||
	                (!dontConvert && toInt(array1[i]) !== toInt(array2[i]))) {
	                diffs++;
	            }
	        }
	        return diffs + lengthDiff;
	    }
	
	    function warn(msg) {
	        if (utils_hooks__hooks.suppressDeprecationWarnings === false &&
	                (typeof console !==  'undefined') && console.warn) {
	            console.warn('Deprecation warning: ' + msg);
	        }
	    }
	
	    function deprecate(msg, fn) {
	        var firstTime = true;
	
	        return extend(function () {
	            if (utils_hooks__hooks.deprecationHandler != null) {
	                utils_hooks__hooks.deprecationHandler(null, msg);
	            }
	            if (firstTime) {
	                var args = [];
	                var arg;
	                for (var i = 0; i < arguments.length; i++) {
	                    arg = '';
	                    if (typeof arguments[i] === 'object') {
	                        arg += '\n[' + i + '] ';
	                        for (var key in arguments[0]) {
	                            arg += key + ': ' + arguments[0][key] + ', ';
	                        }
	                        arg = arg.slice(0, -2); // Remove trailing comma and space
	                    } else {
	                        arg = arguments[i];
	                    }
	                    args.push(arg);
	                }
	                warn(msg + '\nArguments: ' + Array.prototype.slice.call(args).join('') + '\n' + (new Error()).stack);
	                firstTime = false;
	            }
	            return fn.apply(this, arguments);
	        }, fn);
	    }
	
	    var deprecations = {};
	
	    function deprecateSimple(name, msg) {
	        if (utils_hooks__hooks.deprecationHandler != null) {
	            utils_hooks__hooks.deprecationHandler(name, msg);
	        }
	        if (!deprecations[name]) {
	            warn(msg);
	            deprecations[name] = true;
	        }
	    }
	
	    utils_hooks__hooks.suppressDeprecationWarnings = false;
	    utils_hooks__hooks.deprecationHandler = null;
	
	    function isFunction(input) {
	        return input instanceof Function || Object.prototype.toString.call(input) === '[object Function]';
	    }
	
	    function locale_set__set (config) {
	        var prop, i;
	        for (i in config) {
	            prop = config[i];
	            if (isFunction(prop)) {
	                this[i] = prop;
	            } else {
	                this['_' + i] = prop;
	            }
	        }
	        this._config = config;
	        // Lenient ordinal parsing accepts just a number in addition to
	        // number + (possibly) stuff coming from _ordinalParseLenient.
	        this._ordinalParseLenient = new RegExp(this._ordinalParse.source + '|' + (/\d{1,2}/).source);
	    }
	
	    function mergeConfigs(parentConfig, childConfig) {
	        var res = extend({}, parentConfig), prop;
	        for (prop in childConfig) {
	            if (hasOwnProp(childConfig, prop)) {
	                if (isObject(parentConfig[prop]) && isObject(childConfig[prop])) {
	                    res[prop] = {};
	                    extend(res[prop], parentConfig[prop]);
	                    extend(res[prop], childConfig[prop]);
	                } else if (childConfig[prop] != null) {
	                    res[prop] = childConfig[prop];
	                } else {
	                    delete res[prop];
	                }
	            }
	        }
	        for (prop in parentConfig) {
	            if (hasOwnProp(parentConfig, prop) &&
	                    !hasOwnProp(childConfig, prop) &&
	                    isObject(parentConfig[prop])) {
	                // make sure changes to properties don't modify parent config
	                res[prop] = extend({}, res[prop]);
	            }
	        }
	        return res;
	    }
	
	    function Locale(config) {
	        if (config != null) {
	            this.set(config);
	        }
	    }
	
	    var keys;
	
	    if (Object.keys) {
	        keys = Object.keys;
	    } else {
	        keys = function (obj) {
	            var i, res = [];
	            for (i in obj) {
	                if (hasOwnProp(obj, i)) {
	                    res.push(i);
	                }
	            }
	            return res;
	        };
	    }
	
	    var defaultCalendar = {
	        sameDay : '[Today at] LT',
	        nextDay : '[Tomorrow at] LT',
	        nextWeek : 'dddd [at] LT',
	        lastDay : '[Yesterday at] LT',
	        lastWeek : '[Last] dddd [at] LT',
	        sameElse : 'L'
	    };
	
	    function locale_calendar__calendar (key, mom, now) {
	        var output = this._calendar[key] || this._calendar['sameElse'];
	        return isFunction(output) ? output.call(mom, now) : output;
	    }
	
	    var defaultLongDateFormat = {
	        LTS  : 'h:mm:ss A',
	        LT   : 'h:mm A',
	        L    : 'MM/DD/YYYY',
	        LL   : 'MMMM D, YYYY',
	        LLL  : 'MMMM D, YYYY h:mm A',
	        LLLL : 'dddd, MMMM D, YYYY h:mm A'
	    };
	
	    function longDateFormat (key) {
	        var format = this._longDateFormat[key],
	            formatUpper = this._longDateFormat[key.toUpperCase()];
	
	        if (format || !formatUpper) {
	            return format;
	        }
	
	        this._longDateFormat[key] = formatUpper.replace(/MMMM|MM|DD|dddd/g, function (val) {
	            return val.slice(1);
	        });
	
	        return this._longDateFormat[key];
	    }
	
	    var defaultInvalidDate = 'Invalid date';
	
	    function invalidDate () {
	        return this._invalidDate;
	    }
	
	    var defaultOrdinal = '%d';
	    var defaultOrdinalParse = /\d{1,2}/;
	
	    function ordinal (number) {
	        return this._ordinal.replace('%d', number);
	    }
	
	    var defaultRelativeTime = {
	        future : 'in %s',
	        past   : '%s ago',
	        s  : 'a few seconds',
	        m  : 'a minute',
	        mm : '%d minutes',
	        h  : 'an hour',
	        hh : '%d hours',
	        d  : 'a day',
	        dd : '%d days',
	        M  : 'a month',
	        MM : '%d months',
	        y  : 'a year',
	        yy : '%d years'
	    };
	
	    function relative__relativeTime (number, withoutSuffix, string, isFuture) {
	        var output = this._relativeTime[string];
	        return (isFunction(output)) ?
	            output(number, withoutSuffix, string, isFuture) :
	            output.replace(/%d/i, number);
	    }
	
	    function pastFuture (diff, output) {
	        var format = this._relativeTime[diff > 0 ? 'future' : 'past'];
	        return isFunction(format) ? format(output) : format.replace(/%s/i, output);
	    }
	
	    var aliases = {};
	
	    function addUnitAlias (unit, shorthand) {
	        var lowerCase = unit.toLowerCase();
	        aliases[lowerCase] = aliases[lowerCase + 's'] = aliases[shorthand] = unit;
	    }
	
	    function normalizeUnits(units) {
	        return typeof units === 'string' ? aliases[units] || aliases[units.toLowerCase()] : undefined;
	    }
	
	    function normalizeObjectUnits(inputObject) {
	        var normalizedInput = {},
	            normalizedProp,
	            prop;
	
	        for (prop in inputObject) {
	            if (hasOwnProp(inputObject, prop)) {
	                normalizedProp = normalizeUnits(prop);
	                if (normalizedProp) {
	                    normalizedInput[normalizedProp] = inputObject[prop];
	                }
	            }
	        }
	
	        return normalizedInput;
	    }
	
	    var priorities = {};
	
	    function addUnitPriority(unit, priority) {
	        priorities[unit] = priority;
	    }
	
	    function getPrioritizedUnits(unitsObj) {
	        var units = [];
	        for (var u in unitsObj) {
	            units.push({unit: u, priority: priorities[u]});
	        }
	        units.sort(function (a, b) {
	            return a.priority - b.priority;
	        });
	        return units;
	    }
	
	    function makeGetSet (unit, keepTime) {
	        return function (value) {
	            if (value != null) {
	                get_set__set(this, unit, value);
	                utils_hooks__hooks.updateOffset(this, keepTime);
	                return this;
	            } else {
	                return get_set__get(this, unit);
	            }
	        };
	    }
	
	    function get_set__get (mom, unit) {
	        return mom.isValid() ?
	            mom._d['get' + (mom._isUTC ? 'UTC' : '') + unit]() : NaN;
	    }
	
	    function get_set__set (mom, unit, value) {
	        if (mom.isValid()) {
	            mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](value);
	        }
	    }
	
	    // MOMENTS
	
	    function stringGet (units) {
	        units = normalizeUnits(units);
	        if (isFunction(this[units])) {
	            return this[units]();
	        }
	        return this;
	    }
	
	
	    function stringSet (units, value) {
	        if (typeof units === 'object') {
	            units = normalizeObjectUnits(units);
	            var prioritized = getPrioritizedUnits(units);
	            for (var i = 0; i < prioritized.length; i++) {
	                this[prioritized[i].unit](units[prioritized[i].unit]);
	            }
	        } else {
	            units = normalizeUnits(units);
	            if (isFunction(this[units])) {
	                return this[units](value);
	            }
	        }
	        return this;
	    }
	
	    function zeroFill(number, targetLength, forceSign) {
	        var absNumber = '' + Math.abs(number),
	            zerosToFill = targetLength - absNumber.length,
	            sign = number >= 0;
	        return (sign ? (forceSign ? '+' : '') : '-') +
	            Math.pow(10, Math.max(0, zerosToFill)).toString().substr(1) + absNumber;
	    }
	
	    var formattingTokens = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g;
	
	    var localFormattingTokens = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g;
	
	    var formatFunctions = {};
	
	    var formatTokenFunctions = {};
	
	    // token:    'M'
	    // padded:   ['MM', 2]
	    // ordinal:  'Mo'
	    // callback: function () { this.month() + 1 }
	    function addFormatToken (token, padded, ordinal, callback) {
	        var func = callback;
	        if (typeof callback === 'string') {
	            func = function () {
	                return this[callback]();
	            };
	        }
	        if (token) {
	            formatTokenFunctions[token] = func;
	        }
	        if (padded) {
	            formatTokenFunctions[padded[0]] = function () {
	                return zeroFill(func.apply(this, arguments), padded[1], padded[2]);
	            };
	        }
	        if (ordinal) {
	            formatTokenFunctions[ordinal] = function () {
	                return this.localeData().ordinal(func.apply(this, arguments), token);
	            };
	        }
	    }
	
	    function removeFormattingTokens(input) {
	        if (input.match(/\[[\s\S]/)) {
	            return input.replace(/^\[|\]$/g, '');
	        }
	        return input.replace(/\\/g, '');
	    }
	
	    function makeFormatFunction(format) {
	        var array = format.match(formattingTokens), i, length;
	
	        for (i = 0, length = array.length; i < length; i++) {
	            if (formatTokenFunctions[array[i]]) {
	                array[i] = formatTokenFunctions[array[i]];
	            } else {
	                array[i] = removeFormattingTokens(array[i]);
	            }
	        }
	
	        return function (mom) {
	            var output = '', i;
	            for (i = 0; i < length; i++) {
	                output += array[i] instanceof Function ? array[i].call(mom, format) : array[i];
	            }
	            return output;
	        };
	    }
	
	    // format date using native date object
	    function formatMoment(m, format) {
	        if (!m.isValid()) {
	            return m.localeData().invalidDate();
	        }
	
	        format = expandFormat(format, m.localeData());
	        formatFunctions[format] = formatFunctions[format] || makeFormatFunction(format);
	
	        return formatFunctions[format](m);
	    }
	
	    function expandFormat(format, locale) {
	        var i = 5;
	
	        function replaceLongDateFormatTokens(input) {
	            return locale.longDateFormat(input) || input;
	        }
	
	        localFormattingTokens.lastIndex = 0;
	        while (i >= 0 && localFormattingTokens.test(format)) {
	            format = format.replace(localFormattingTokens, replaceLongDateFormatTokens);
	            localFormattingTokens.lastIndex = 0;
	            i -= 1;
	        }
	
	        return format;
	    }
	
	    var match1         = /\d/;            //       0 - 9
	    var match2         = /\d\d/;          //      00 - 99
	    var match3         = /\d{3}/;         //     000 - 999
	    var match4         = /\d{4}/;         //    0000 - 9999
	    var match6         = /[+-]?\d{6}/;    // -999999 - 999999
	    var match1to2      = /\d\d?/;         //       0 - 99
	    var match3to4      = /\d\d\d\d?/;     //     999 - 9999
	    var match5to6      = /\d\d\d\d\d\d?/; //   99999 - 999999
	    var match1to3      = /\d{1,3}/;       //       0 - 999
	    var match1to4      = /\d{1,4}/;       //       0 - 9999
	    var match1to6      = /[+-]?\d{1,6}/;  // -999999 - 999999
	
	    var matchUnsigned  = /\d+/;           //       0 - inf
	    var matchSigned    = /[+-]?\d+/;      //    -inf - inf
	
	    var matchOffset    = /Z|[+-]\d\d:?\d\d/gi; // +00:00 -00:00 +0000 -0000 or Z
	    var matchShortOffset = /Z|[+-]\d\d(?::?\d\d)?/gi; // +00 -00 +00:00 -00:00 +0000 -0000 or Z
	
	    var matchTimestamp = /[+-]?\d+(\.\d{1,3})?/; // 123456789 123456789.123
	
	    // any word (or two) characters or numbers including two/three word month in arabic.
	    // includes scottish gaelic two word and hyphenated months
	    var matchWord = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i;
	
	
	    var regexes = {};
	
	    function addRegexToken (token, regex, strictRegex) {
	        regexes[token] = isFunction(regex) ? regex : function (isStrict, localeData) {
	            return (isStrict && strictRegex) ? strictRegex : regex;
	        };
	    }
	
	    function getParseRegexForToken (token, config) {
	        if (!hasOwnProp(regexes, token)) {
	            return new RegExp(unescapeFormat(token));
	        }
	
	        return regexes[token](config._strict, config._locale);
	    }
	
	    // Code from http://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript
	    function unescapeFormat(s) {
	        return regexEscape(s.replace('\\', '').replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function (matched, p1, p2, p3, p4) {
	            return p1 || p2 || p3 || p4;
	        }));
	    }
	
	    function regexEscape(s) {
	        return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
	    }
	
	    var tokens = {};
	
	    function addParseToken (token, callback) {
	        var i, func = callback;
	        if (typeof token === 'string') {
	            token = [token];
	        }
	        if (typeof callback === 'number') {
	            func = function (input, array) {
	                array[callback] = toInt(input);
	            };
	        }
	        for (i = 0; i < token.length; i++) {
	            tokens[token[i]] = func;
	        }
	    }
	
	    function addWeekParseToken (token, callback) {
	        addParseToken(token, function (input, array, config, token) {
	            config._w = config._w || {};
	            callback(input, config._w, config, token);
	        });
	    }
	
	    function addTimeToArrayFromToken(token, input, config) {
	        if (input != null && hasOwnProp(tokens, token)) {
	            tokens[token](input, config._a, config, token);
	        }
	    }
	
	    var YEAR = 0;
	    var MONTH = 1;
	    var DATE = 2;
	    var HOUR = 3;
	    var MINUTE = 4;
	    var SECOND = 5;
	    var MILLISECOND = 6;
	    var WEEK = 7;
	    var WEEKDAY = 8;
	
	    var indexOf;
	
	    if (Array.prototype.indexOf) {
	        indexOf = Array.prototype.indexOf;
	    } else {
	        indexOf = function (o) {
	            // I know
	            var i;
	            for (i = 0; i < this.length; ++i) {
	                if (this[i] === o) {
	                    return i;
	                }
	            }
	            return -1;
	        };
	    }
	
	    function daysInMonth(year, month) {
	        return new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
	    }
	
	    // FORMATTING
	
	    addFormatToken('M', ['MM', 2], 'Mo', function () {
	        return this.month() + 1;
	    });
	
	    addFormatToken('MMM', 0, 0, function (format) {
	        return this.localeData().monthsShort(this, format);
	    });
	
	    addFormatToken('MMMM', 0, 0, function (format) {
	        return this.localeData().months(this, format);
	    });
	
	    // ALIASES
	
	    addUnitAlias('month', 'M');
	
	    // PRIORITY
	
	    addUnitPriority('month', 8);
	
	    // PARSING
	
	    addRegexToken('M',    match1to2);
	    addRegexToken('MM',   match1to2, match2);
	    addRegexToken('MMM',  function (isStrict, locale) {
	        return locale.monthsShortRegex(isStrict);
	    });
	    addRegexToken('MMMM', function (isStrict, locale) {
	        return locale.monthsRegex(isStrict);
	    });
	
	    addParseToken(['M', 'MM'], function (input, array) {
	        array[MONTH] = toInt(input) - 1;
	    });
	
	    addParseToken(['MMM', 'MMMM'], function (input, array, config, token) {
	        var month = config._locale.monthsParse(input, token, config._strict);
	        // if we didn't find a month name, mark the date as invalid.
	        if (month != null) {
	            array[MONTH] = month;
	        } else {
	            getParsingFlags(config).invalidMonth = input;
	        }
	    });
	
	    // LOCALES
	
	    var MONTHS_IN_FORMAT = /D[oD]?(\[[^\[\]]*\]|\s+)+MMMM?/;
	    var defaultLocaleMonths = 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_');
	    function localeMonths (m, format) {
	        if (!m) {
	            return this._months;
	        }
	        return isArray(this._months) ? this._months[m.month()] :
	            this._months[(this._months.isFormat || MONTHS_IN_FORMAT).test(format) ? 'format' : 'standalone'][m.month()];
	    }
	
	    var defaultLocaleMonthsShort = 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_');
	    function localeMonthsShort (m, format) {
	        if (!m) {
	            return this._monthsShort;
	        }
	        return isArray(this._monthsShort) ? this._monthsShort[m.month()] :
	            this._monthsShort[MONTHS_IN_FORMAT.test(format) ? 'format' : 'standalone'][m.month()];
	    }
	
	    function units_month__handleStrictParse(monthName, format, strict) {
	        var i, ii, mom, llc = monthName.toLocaleLowerCase();
	        if (!this._monthsParse) {
	            // this is not used
	            this._monthsParse = [];
	            this._longMonthsParse = [];
	            this._shortMonthsParse = [];
	            for (i = 0; i < 12; ++i) {
	                mom = create_utc__createUTC([2000, i]);
	                this._shortMonthsParse[i] = this.monthsShort(mom, '').toLocaleLowerCase();
	                this._longMonthsParse[i] = this.months(mom, '').toLocaleLowerCase();
	            }
	        }
	
	        if (strict) {
	            if (format === 'MMM') {
	                ii = indexOf.call(this._shortMonthsParse, llc);
	                return ii !== -1 ? ii : null;
	            } else {
	                ii = indexOf.call(this._longMonthsParse, llc);
	                return ii !== -1 ? ii : null;
	            }
	        } else {
	            if (format === 'MMM') {
	                ii = indexOf.call(this._shortMonthsParse, llc);
	                if (ii !== -1) {
	                    return ii;
	                }
	                ii = indexOf.call(this._longMonthsParse, llc);
	                return ii !== -1 ? ii : null;
	            } else {
	                ii = indexOf.call(this._longMonthsParse, llc);
	                if (ii !== -1) {
	                    return ii;
	                }
	                ii = indexOf.call(this._shortMonthsParse, llc);
	                return ii !== -1 ? ii : null;
	            }
	        }
	    }
	
	    function localeMonthsParse (monthName, format, strict) {
	        var i, mom, regex;
	
	        if (this._monthsParseExact) {
	            return units_month__handleStrictParse.call(this, monthName, format, strict);
	        }
	
	        if (!this._monthsParse) {
	            this._monthsParse = [];
	            this._longMonthsParse = [];
	            this._shortMonthsParse = [];
	        }
	
	        // TODO: add sorting
	        // Sorting makes sure if one month (or abbr) is a prefix of another
	        // see sorting in computeMonthsParse
	        for (i = 0; i < 12; i++) {
	            // make the regex if we don't have it already
	            mom = create_utc__createUTC([2000, i]);
	            if (strict && !this._longMonthsParse[i]) {
	                this._longMonthsParse[i] = new RegExp('^' + this.months(mom, '').replace('.', '') + '$', 'i');
	                this._shortMonthsParse[i] = new RegExp('^' + this.monthsShort(mom, '').replace('.', '') + '$', 'i');
	            }
	            if (!strict && !this._monthsParse[i]) {
	                regex = '^' + this.months(mom, '') + '|^' + this.monthsShort(mom, '');
	                this._monthsParse[i] = new RegExp(regex.replace('.', ''), 'i');
	            }
	            // test the regex
	            if (strict && format === 'MMMM' && this._longMonthsParse[i].test(monthName)) {
	                return i;
	            } else if (strict && format === 'MMM' && this._shortMonthsParse[i].test(monthName)) {
	                return i;
	            } else if (!strict && this._monthsParse[i].test(monthName)) {
	                return i;
	            }
	        }
	    }
	
	    // MOMENTS
	
	    function setMonth (mom, value) {
	        var dayOfMonth;
	
	        if (!mom.isValid()) {
	            // No op
	            return mom;
	        }
	
	        if (typeof value === 'string') {
	            if (/^\d+$/.test(value)) {
	                value = toInt(value);
	            } else {
	                value = mom.localeData().monthsParse(value);
	                // TODO: Another silent failure?
	                if (typeof value !== 'number') {
	                    return mom;
	                }
	            }
	        }
	
	        dayOfMonth = Math.min(mom.date(), daysInMonth(mom.year(), value));
	        mom._d['set' + (mom._isUTC ? 'UTC' : '') + 'Month'](value, dayOfMonth);
	        return mom;
	    }
	
	    function getSetMonth (value) {
	        if (value != null) {
	            setMonth(this, value);
	            utils_hooks__hooks.updateOffset(this, true);
	            return this;
	        } else {
	            return get_set__get(this, 'Month');
	        }
	    }
	
	    function getDaysInMonth () {
	        return daysInMonth(this.year(), this.month());
	    }
	
	    var defaultMonthsShortRegex = matchWord;
	    function monthsShortRegex (isStrict) {
	        if (this._monthsParseExact) {
	            if (!hasOwnProp(this, '_monthsRegex')) {
	                computeMonthsParse.call(this);
	            }
	            if (isStrict) {
	                return this._monthsShortStrictRegex;
	            } else {
	                return this._monthsShortRegex;
	            }
	        } else {
	            if (!hasOwnProp(this, '_monthsShortRegex')) {
	                this._monthsShortRegex = defaultMonthsShortRegex;
	            }
	            return this._monthsShortStrictRegex && isStrict ?
	                this._monthsShortStrictRegex : this._monthsShortRegex;
	        }
	    }
	
	    var defaultMonthsRegex = matchWord;
	    function monthsRegex (isStrict) {
	        if (this._monthsParseExact) {
	            if (!hasOwnProp(this, '_monthsRegex')) {
	                computeMonthsParse.call(this);
	            }
	            if (isStrict) {
	                return this._monthsStrictRegex;
	            } else {
	                return this._monthsRegex;
	            }
	        } else {
	            if (!hasOwnProp(this, '_monthsRegex')) {
	                this._monthsRegex = defaultMonthsRegex;
	            }
	            return this._monthsStrictRegex && isStrict ?
	                this._monthsStrictRegex : this._monthsRegex;
	        }
	    }
	
	    function computeMonthsParse () {
	        function cmpLenRev(a, b) {
	            return b.length - a.length;
	        }
	
	        var shortPieces = [], longPieces = [], mixedPieces = [],
	            i, mom;
	        for (i = 0; i < 12; i++) {
	            // make the regex if we don't have it already
	            mom = create_utc__createUTC([2000, i]);
	            shortPieces.push(this.monthsShort(mom, ''));
	            longPieces.push(this.months(mom, ''));
	            mixedPieces.push(this.months(mom, ''));
	            mixedPieces.push(this.monthsShort(mom, ''));
	        }
	        // Sorting makes sure if one month (or abbr) is a prefix of another it
	        // will match the longer piece.
	        shortPieces.sort(cmpLenRev);
	        longPieces.sort(cmpLenRev);
	        mixedPieces.sort(cmpLenRev);
	        for (i = 0; i < 12; i++) {
	            shortPieces[i] = regexEscape(shortPieces[i]);
	            longPieces[i] = regexEscape(longPieces[i]);
	        }
	        for (i = 0; i < 24; i++) {
	            mixedPieces[i] = regexEscape(mixedPieces[i]);
	        }
	
	        this._monthsRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
	        this._monthsShortRegex = this._monthsRegex;
	        this._monthsStrictRegex = new RegExp('^(' + longPieces.join('|') + ')', 'i');
	        this._monthsShortStrictRegex = new RegExp('^(' + shortPieces.join('|') + ')', 'i');
	    }
	
	    // FORMATTING
	
	    addFormatToken('Y', 0, 0, function () {
	        var y = this.year();
	        return y <= 9999 ? '' + y : '+' + y;
	    });
	
	    addFormatToken(0, ['YY', 2], 0, function () {
	        return this.year() % 100;
	    });
	
	    addFormatToken(0, ['YYYY',   4],       0, 'year');
	    addFormatToken(0, ['YYYYY',  5],       0, 'year');
	    addFormatToken(0, ['YYYYYY', 6, true], 0, 'year');
	
	    // ALIASES
	
	    addUnitAlias('year', 'y');
	
	    // PRIORITIES
	
	    addUnitPriority('year', 1);
	
	    // PARSING
	
	    addRegexToken('Y',      matchSigned);
	    addRegexToken('YY',     match1to2, match2);
	    addRegexToken('YYYY',   match1to4, match4);
	    addRegexToken('YYYYY',  match1to6, match6);
	    addRegexToken('YYYYYY', match1to6, match6);
	
	    addParseToken(['YYYYY', 'YYYYYY'], YEAR);
	    addParseToken('YYYY', function (input, array) {
	        array[YEAR] = input.length === 2 ? utils_hooks__hooks.parseTwoDigitYear(input) : toInt(input);
	    });
	    addParseToken('YY', function (input, array) {
	        array[YEAR] = utils_hooks__hooks.parseTwoDigitYear(input);
	    });
	    addParseToken('Y', function (input, array) {
	        array[YEAR] = parseInt(input, 10);
	    });
	
	    // HELPERS
	
	    function daysInYear(year) {
	        return isLeapYear(year) ? 366 : 365;
	    }
	
	    function isLeapYear(year) {
	        return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
	    }
	
	    // HOOKS
	
	    utils_hooks__hooks.parseTwoDigitYear = function (input) {
	        return toInt(input) + (toInt(input) > 68 ? 1900 : 2000);
	    };
	
	    // MOMENTS
	
	    var getSetYear = makeGetSet('FullYear', true);
	
	    function getIsLeapYear () {
	        return isLeapYear(this.year());
	    }
	
	    function createDate (y, m, d, h, M, s, ms) {
	        //can't just apply() to create a date:
	        //http://stackoverflow.com/questions/181348/instantiating-a-javascript-object-by-calling-prototype-constructor-apply
	        var date = new Date(y, m, d, h, M, s, ms);
	
	        //the date constructor remaps years 0-99 to 1900-1999
	        if (y < 100 && y >= 0 && isFinite(date.getFullYear())) {
	            date.setFullYear(y);
	        }
	        return date;
	    }
	
	    function createUTCDate (y) {
	        var date = new Date(Date.UTC.apply(null, arguments));
	
	        //the Date.UTC function remaps years 0-99 to 1900-1999
	        if (y < 100 && y >= 0 && isFinite(date.getUTCFullYear())) {
	            date.setUTCFullYear(y);
	        }
	        return date;
	    }
	
	    // start-of-first-week - start-of-year
	    function firstWeekOffset(year, dow, doy) {
	        var // first-week day -- which january is always in the first week (4 for iso, 1 for other)
	            fwd = 7 + dow - doy,
	            // first-week day local weekday -- which local weekday is fwd
	            fwdlw = (7 + createUTCDate(year, 0, fwd).getUTCDay() - dow) % 7;
	
	        return -fwdlw + fwd - 1;
	    }
	
	    //http://en.wikipedia.org/wiki/ISO_week_date#Calculating_a_date_given_the_year.2C_week_number_and_weekday
	    function dayOfYearFromWeeks(year, week, weekday, dow, doy) {
	        var localWeekday = (7 + weekday - dow) % 7,
	            weekOffset = firstWeekOffset(year, dow, doy),
	            dayOfYear = 1 + 7 * (week - 1) + localWeekday + weekOffset,
	            resYear, resDayOfYear;
	
	        if (dayOfYear <= 0) {
	            resYear = year - 1;
	            resDayOfYear = daysInYear(resYear) + dayOfYear;
	        } else if (dayOfYear > daysInYear(year)) {
	            resYear = year + 1;
	            resDayOfYear = dayOfYear - daysInYear(year);
	        } else {
	            resYear = year;
	            resDayOfYear = dayOfYear;
	        }
	
	        return {
	            year: resYear,
	            dayOfYear: resDayOfYear
	        };
	    }
	
	    function weekOfYear(mom, dow, doy) {
	        var weekOffset = firstWeekOffset(mom.year(), dow, doy),
	            week = Math.floor((mom.dayOfYear() - weekOffset - 1) / 7) + 1,
	            resWeek, resYear;
	
	        if (week < 1) {
	            resYear = mom.year() - 1;
	            resWeek = week + weeksInYear(resYear, dow, doy);
	        } else if (week > weeksInYear(mom.year(), dow, doy)) {
	            resWeek = week - weeksInYear(mom.year(), dow, doy);
	            resYear = mom.year() + 1;
	        } else {
	            resYear = mom.year();
	            resWeek = week;
	        }
	
	        return {
	            week: resWeek,
	            year: resYear
	        };
	    }
	
	    function weeksInYear(year, dow, doy) {
	        var weekOffset = firstWeekOffset(year, dow, doy),
	            weekOffsetNext = firstWeekOffset(year + 1, dow, doy);
	        return (daysInYear(year) - weekOffset + weekOffsetNext) / 7;
	    }
	
	    // FORMATTING
	
	    addFormatToken('w', ['ww', 2], 'wo', 'week');
	    addFormatToken('W', ['WW', 2], 'Wo', 'isoWeek');
	
	    // ALIASES
	
	    addUnitAlias('week', 'w');
	    addUnitAlias('isoWeek', 'W');
	
	    // PRIORITIES
	
	    addUnitPriority('week', 5);
	    addUnitPriority('isoWeek', 5);
	
	    // PARSING
	
	    addRegexToken('w',  match1to2);
	    addRegexToken('ww', match1to2, match2);
	    addRegexToken('W',  match1to2);
	    addRegexToken('WW', match1to2, match2);
	
	    addWeekParseToken(['w', 'ww', 'W', 'WW'], function (input, week, config, token) {
	        week[token.substr(0, 1)] = toInt(input);
	    });
	
	    // HELPERS
	
	    // LOCALES
	
	    function localeWeek (mom) {
	        return weekOfYear(mom, this._week.dow, this._week.doy).week;
	    }
	
	    var defaultLocaleWeek = {
	        dow : 0, // Sunday is the first day of the week.
	        doy : 6  // The week that contains Jan 1st is the first week of the year.
	    };
	
	    function localeFirstDayOfWeek () {
	        return this._week.dow;
	    }
	
	    function localeFirstDayOfYear () {
	        return this._week.doy;
	    }
	
	    // MOMENTS
	
	    function getSetWeek (input) {
	        var week = this.localeData().week(this);
	        return input == null ? week : this.add((input - week) * 7, 'd');
	    }
	
	    function getSetISOWeek (input) {
	        var week = weekOfYear(this, 1, 4).week;
	        return input == null ? week : this.add((input - week) * 7, 'd');
	    }
	
	    // FORMATTING
	
	    addFormatToken('d', 0, 'do', 'day');
	
	    addFormatToken('dd', 0, 0, function (format) {
	        return this.localeData().weekdaysMin(this, format);
	    });
	
	    addFormatToken('ddd', 0, 0, function (format) {
	        return this.localeData().weekdaysShort(this, format);
	    });
	
	    addFormatToken('dddd', 0, 0, function (format) {
	        return this.localeData().weekdays(this, format);
	    });
	
	    addFormatToken('e', 0, 0, 'weekday');
	    addFormatToken('E', 0, 0, 'isoWeekday');
	
	    // ALIASES
	
	    addUnitAlias('day', 'd');
	    addUnitAlias('weekday', 'e');
	    addUnitAlias('isoWeekday', 'E');
	
	    // PRIORITY
	    addUnitPriority('day', 11);
	    addUnitPriority('weekday', 11);
	    addUnitPriority('isoWeekday', 11);
	
	    // PARSING
	
	    addRegexToken('d',    match1to2);
	    addRegexToken('e',    match1to2);
	    addRegexToken('E',    match1to2);
	    addRegexToken('dd',   function (isStrict, locale) {
	        return locale.weekdaysMinRegex(isStrict);
	    });
	    addRegexToken('ddd',   function (isStrict, locale) {
	        return locale.weekdaysShortRegex(isStrict);
	    });
	    addRegexToken('dddd',   function (isStrict, locale) {
	        return locale.weekdaysRegex(isStrict);
	    });
	
	    addWeekParseToken(['dd', 'ddd', 'dddd'], function (input, week, config, token) {
	        var weekday = config._locale.weekdaysParse(input, token, config._strict);
	        // if we didn't get a weekday name, mark the date as invalid
	        if (weekday != null) {
	            week.d = weekday;
	        } else {
	            getParsingFlags(config).invalidWeekday = input;
	        }
	    });
	
	    addWeekParseToken(['d', 'e', 'E'], function (input, week, config, token) {
	        week[token] = toInt(input);
	    });
	
	    // HELPERS
	
	    function parseWeekday(input, locale) {
	        if (typeof input !== 'string') {
	            return input;
	        }
	
	        if (!isNaN(input)) {
	            return parseInt(input, 10);
	        }
	
	        input = locale.weekdaysParse(input);
	        if (typeof input === 'number') {
	            return input;
	        }
	
	        return null;
	    }
	
	    function parseIsoWeekday(input, locale) {
	        if (typeof input === 'string') {
	            return locale.weekdaysParse(input) % 7 || 7;
	        }
	        return isNaN(input) ? null : input;
	    }
	
	    // LOCALES
	
	    var defaultLocaleWeekdays = 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_');
	    function localeWeekdays (m, format) {
	        if (!m) {
	            return this._weekdays;
	        }
	        return isArray(this._weekdays) ? this._weekdays[m.day()] :
	            this._weekdays[this._weekdays.isFormat.test(format) ? 'format' : 'standalone'][m.day()];
	    }
	
	    var defaultLocaleWeekdaysShort = 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_');
	    function localeWeekdaysShort (m) {
	        return (m) ? this._weekdaysShort[m.day()] : this._weekdaysShort;
	    }
	
	    var defaultLocaleWeekdaysMin = 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_');
	    function localeWeekdaysMin (m) {
	        return (m) ? this._weekdaysMin[m.day()] : this._weekdaysMin;
	    }
	
	    function day_of_week__handleStrictParse(weekdayName, format, strict) {
	        var i, ii, mom, llc = weekdayName.toLocaleLowerCase();
	        if (!this._weekdaysParse) {
	            this._weekdaysParse = [];
	            this._shortWeekdaysParse = [];
	            this._minWeekdaysParse = [];
	
	            for (i = 0; i < 7; ++i) {
	                mom = create_utc__createUTC([2000, 1]).day(i);
	                this._minWeekdaysParse[i] = this.weekdaysMin(mom, '').toLocaleLowerCase();
	                this._shortWeekdaysParse[i] = this.weekdaysShort(mom, '').toLocaleLowerCase();
	                this._weekdaysParse[i] = this.weekdays(mom, '').toLocaleLowerCase();
	            }
	        }
	
	        if (strict) {
	            if (format === 'dddd') {
	                ii = indexOf.call(this._weekdaysParse, llc);
	                return ii !== -1 ? ii : null;
	            } else if (format === 'ddd') {
	                ii = indexOf.call(this._shortWeekdaysParse, llc);
	                return ii !== -1 ? ii : null;
	            } else {
	                ii = indexOf.call(this._minWeekdaysParse, llc);
	                return ii !== -1 ? ii : null;
	            }
	        } else {
	            if (format === 'dddd') {
	                ii = indexOf.call(this._weekdaysParse, llc);
	                if (ii !== -1) {
	                    return ii;
	                }
	                ii = indexOf.call(this._shortWeekdaysParse, llc);
	                if (ii !== -1) {
	                    return ii;
	                }
	                ii = indexOf.call(this._minWeekdaysParse, llc);
	                return ii !== -1 ? ii : null;
	            } else if (format === 'ddd') {
	                ii = indexOf.call(this._shortWeekdaysParse, llc);
	                if (ii !== -1) {
	                    return ii;
	                }
	                ii = indexOf.call(this._weekdaysParse, llc);
	                if (ii !== -1) {
	                    return ii;
	                }
	                ii = indexOf.call(this._minWeekdaysParse, llc);
	                return ii !== -1 ? ii : null;
	            } else {
	                ii = indexOf.call(this._minWeekdaysParse, llc);
	                if (ii !== -1) {
	                    return ii;
	                }
	                ii = indexOf.call(this._weekdaysParse, llc);
	                if (ii !== -1) {
	                    return ii;
	                }
	                ii = indexOf.call(this._shortWeekdaysParse, llc);
	                return ii !== -1 ? ii : null;
	            }
	        }
	    }
	
	    function localeWeekdaysParse (weekdayName, format, strict) {
	        var i, mom, regex;
	
	        if (this._weekdaysParseExact) {
	            return day_of_week__handleStrictParse.call(this, weekdayName, format, strict);
	        }
	
	        if (!this._weekdaysParse) {
	            this._weekdaysParse = [];
	            this._minWeekdaysParse = [];
	            this._shortWeekdaysParse = [];
	            this._fullWeekdaysParse = [];
	        }
	
	        for (i = 0; i < 7; i++) {
	            // make the regex if we don't have it already
	
	            mom = create_utc__createUTC([2000, 1]).day(i);
	            if (strict && !this._fullWeekdaysParse[i]) {
	                this._fullWeekdaysParse[i] = new RegExp('^' + this.weekdays(mom, '').replace('.', '\.?') + '$', 'i');
	                this._shortWeekdaysParse[i] = new RegExp('^' + this.weekdaysShort(mom, '').replace('.', '\.?') + '$', 'i');
	                this._minWeekdaysParse[i] = new RegExp('^' + this.weekdaysMin(mom, '').replace('.', '\.?') + '$', 'i');
	            }
	            if (!this._weekdaysParse[i]) {
	                regex = '^' + this.weekdays(mom, '') + '|^' + this.weekdaysShort(mom, '') + '|^' + this.weekdaysMin(mom, '');
	                this._weekdaysParse[i] = new RegExp(regex.replace('.', ''), 'i');
	            }
	            // test the regex
	            if (strict && format === 'dddd' && this._fullWeekdaysParse[i].test(weekdayName)) {
	                return i;
	            } else if (strict && format === 'ddd' && this._shortWeekdaysParse[i].test(weekdayName)) {
	                return i;
	            } else if (strict && format === 'dd' && this._minWeekdaysParse[i].test(weekdayName)) {
	                return i;
	            } else if (!strict && this._weekdaysParse[i].test(weekdayName)) {
	                return i;
	            }
	        }
	    }
	
	    // MOMENTS
	
	    function getSetDayOfWeek (input) {
	        if (!this.isValid()) {
	            return input != null ? this : NaN;
	        }
	        var day = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
	        if (input != null) {
	            input = parseWeekday(input, this.localeData());
	            return this.add(input - day, 'd');
	        } else {
	            return day;
	        }
	    }
	
	    function getSetLocaleDayOfWeek (input) {
	        if (!this.isValid()) {
	            return input != null ? this : NaN;
	        }
	        var weekday = (this.day() + 7 - this.localeData()._week.dow) % 7;
	        return input == null ? weekday : this.add(input - weekday, 'd');
	    }
	
	    function getSetISODayOfWeek (input) {
	        if (!this.isValid()) {
	            return input != null ? this : NaN;
	        }
	
	        // behaves the same as moment#day except
	        // as a getter, returns 7 instead of 0 (1-7 range instead of 0-6)
	        // as a setter, sunday should belong to the previous week.
	
	        if (input != null) {
	            var weekday = parseIsoWeekday(input, this.localeData());
	            return this.day(this.day() % 7 ? weekday : weekday - 7);
	        } else {
	            return this.day() || 7;
	        }
	    }
	
	    var defaultWeekdaysRegex = matchWord;
	    function weekdaysRegex (isStrict) {
	        if (this._weekdaysParseExact) {
	            if (!hasOwnProp(this, '_weekdaysRegex')) {
	                computeWeekdaysParse.call(this);
	            }
	            if (isStrict) {
	                return this._weekdaysStrictRegex;
	            } else {
	                return this._weekdaysRegex;
	            }
	        } else {
	            if (!hasOwnProp(this, '_weekdaysRegex')) {
	                this._weekdaysRegex = defaultWeekdaysRegex;
	            }
	            return this._weekdaysStrictRegex && isStrict ?
	                this._weekdaysStrictRegex : this._weekdaysRegex;
	        }
	    }
	
	    var defaultWeekdaysShortRegex = matchWord;
	    function weekdaysShortRegex (isStrict) {
	        if (this._weekdaysParseExact) {
	            if (!hasOwnProp(this, '_weekdaysRegex')) {
	                computeWeekdaysParse.call(this);
	            }
	            if (isStrict) {
	                return this._weekdaysShortStrictRegex;
	            } else {
	                return this._weekdaysShortRegex;
	            }
	        } else {
	            if (!hasOwnProp(this, '_weekdaysShortRegex')) {
	                this._weekdaysShortRegex = defaultWeekdaysShortRegex;
	            }
	            return this._weekdaysShortStrictRegex && isStrict ?
	                this._weekdaysShortStrictRegex : this._weekdaysShortRegex;
	        }
	    }
	
	    var defaultWeekdaysMinRegex = matchWord;
	    function weekdaysMinRegex (isStrict) {
	        if (this._weekdaysParseExact) {
	            if (!hasOwnProp(this, '_weekdaysRegex')) {
	                computeWeekdaysParse.call(this);
	            }
	            if (isStrict) {
	                return this._weekdaysMinStrictRegex;
	            } else {
	                return this._weekdaysMinRegex;
	            }
	        } else {
	            if (!hasOwnProp(this, '_weekdaysMinRegex')) {
	                this._weekdaysMinRegex = defaultWeekdaysMinRegex;
	            }
	            return this._weekdaysMinStrictRegex && isStrict ?
	                this._weekdaysMinStrictRegex : this._weekdaysMinRegex;
	        }
	    }
	
	
	    function computeWeekdaysParse () {
	        function cmpLenRev(a, b) {
	            return b.length - a.length;
	        }
	
	        var minPieces = [], shortPieces = [], longPieces = [], mixedPieces = [],
	            i, mom, minp, shortp, longp;
	        for (i = 0; i < 7; i++) {
	            // make the regex if we don't have it already
	            mom = create_utc__createUTC([2000, 1]).day(i);
	            minp = this.weekdaysMin(mom, '');
	            shortp = this.weekdaysShort(mom, '');
	            longp = this.weekdays(mom, '');
	            minPieces.push(minp);
	            shortPieces.push(shortp);
	            longPieces.push(longp);
	            mixedPieces.push(minp);
	            mixedPieces.push(shortp);
	            mixedPieces.push(longp);
	        }
	        // Sorting makes sure if one weekday (or abbr) is a prefix of another it
	        // will match the longer piece.
	        minPieces.sort(cmpLenRev);
	        shortPieces.sort(cmpLenRev);
	        longPieces.sort(cmpLenRev);
	        mixedPieces.sort(cmpLenRev);
	        for (i = 0; i < 7; i++) {
	            shortPieces[i] = regexEscape(shortPieces[i]);
	            longPieces[i] = regexEscape(longPieces[i]);
	            mixedPieces[i] = regexEscape(mixedPieces[i]);
	        }
	
	        this._weekdaysRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
	        this._weekdaysShortRegex = this._weekdaysRegex;
	        this._weekdaysMinRegex = this._weekdaysRegex;
	
	        this._weekdaysStrictRegex = new RegExp('^(' + longPieces.join('|') + ')', 'i');
	        this._weekdaysShortStrictRegex = new RegExp('^(' + shortPieces.join('|') + ')', 'i');
	        this._weekdaysMinStrictRegex = new RegExp('^(' + minPieces.join('|') + ')', 'i');
	    }
	
	    // FORMATTING
	
	    function hFormat() {
	        return this.hours() % 12 || 12;
	    }
	
	    function kFormat() {
	        return this.hours() || 24;
	    }
	
	    addFormatToken('H', ['HH', 2], 0, 'hour');
	    addFormatToken('h', ['hh', 2], 0, hFormat);
	    addFormatToken('k', ['kk', 2], 0, kFormat);
	
	    addFormatToken('hmm', 0, 0, function () {
	        return '' + hFormat.apply(this) + zeroFill(this.minutes(), 2);
	    });
	
	    addFormatToken('hmmss', 0, 0, function () {
	        return '' + hFormat.apply(this) + zeroFill(this.minutes(), 2) +
	            zeroFill(this.seconds(), 2);
	    });
	
	    addFormatToken('Hmm', 0, 0, function () {
	        return '' + this.hours() + zeroFill(this.minutes(), 2);
	    });
	
	    addFormatToken('Hmmss', 0, 0, function () {
	        return '' + this.hours() + zeroFill(this.minutes(), 2) +
	            zeroFill(this.seconds(), 2);
	    });
	
	    function meridiem (token, lowercase) {
	        addFormatToken(token, 0, 0, function () {
	            return this.localeData().meridiem(this.hours(), this.minutes(), lowercase);
	        });
	    }
	
	    meridiem('a', true);
	    meridiem('A', false);
	
	    // ALIASES
	
	    addUnitAlias('hour', 'h');
	
	    // PRIORITY
	    addUnitPriority('hour', 13);
	
	    // PARSING
	
	    function matchMeridiem (isStrict, locale) {
	        return locale._meridiemParse;
	    }
	
	    addRegexToken('a',  matchMeridiem);
	    addRegexToken('A',  matchMeridiem);
	    addRegexToken('H',  match1to2);
	    addRegexToken('h',  match1to2);
	    addRegexToken('HH', match1to2, match2);
	    addRegexToken('hh', match1to2, match2);
	
	    addRegexToken('hmm', match3to4);
	    addRegexToken('hmmss', match5to6);
	    addRegexToken('Hmm', match3to4);
	    addRegexToken('Hmmss', match5to6);
	
	    addParseToken(['H', 'HH'], HOUR);
	    addParseToken(['a', 'A'], function (input, array, config) {
	        config._isPm = config._locale.isPM(input);
	        config._meridiem = input;
	    });
	    addParseToken(['h', 'hh'], function (input, array, config) {
	        array[HOUR] = toInt(input);
	        getParsingFlags(config).bigHour = true;
	    });
	    addParseToken('hmm', function (input, array, config) {
	        var pos = input.length - 2;
	        array[HOUR] = toInt(input.substr(0, pos));
	        array[MINUTE] = toInt(input.substr(pos));
	        getParsingFlags(config).bigHour = true;
	    });
	    addParseToken('hmmss', function (input, array, config) {
	        var pos1 = input.length - 4;
	        var pos2 = input.length - 2;
	        array[HOUR] = toInt(input.substr(0, pos1));
	        array[MINUTE] = toInt(input.substr(pos1, 2));
	        array[SECOND] = toInt(input.substr(pos2));
	        getParsingFlags(config).bigHour = true;
	    });
	    addParseToken('Hmm', function (input, array, config) {
	        var pos = input.length - 2;
	        array[HOUR] = toInt(input.substr(0, pos));
	        array[MINUTE] = toInt(input.substr(pos));
	    });
	    addParseToken('Hmmss', function (input, array, config) {
	        var pos1 = input.length - 4;
	        var pos2 = input.length - 2;
	        array[HOUR] = toInt(input.substr(0, pos1));
	        array[MINUTE] = toInt(input.substr(pos1, 2));
	        array[SECOND] = toInt(input.substr(pos2));
	    });
	
	    // LOCALES
	
	    function localeIsPM (input) {
	        // IE8 Quirks Mode & IE7 Standards Mode do not allow accessing strings like arrays
	        // Using charAt should be more compatible.
	        return ((input + '').toLowerCase().charAt(0) === 'p');
	    }
	
	    var defaultLocaleMeridiemParse = /[ap]\.?m?\.?/i;
	    function localeMeridiem (hours, minutes, isLower) {
	        if (hours > 11) {
	            return isLower ? 'pm' : 'PM';
	        } else {
	            return isLower ? 'am' : 'AM';
	        }
	    }
	
	
	    // MOMENTS
	
	    // Setting the hour should keep the time, because the user explicitly
	    // specified which hour he wants. So trying to maintain the same hour (in
	    // a new timezone) makes sense. Adding/subtracting hours does not follow
	    // this rule.
	    var getSetHour = makeGetSet('Hours', true);
	
	    var baseConfig = {
	        calendar: defaultCalendar,
	        longDateFormat: defaultLongDateFormat,
	        invalidDate: defaultInvalidDate,
	        ordinal: defaultOrdinal,
	        ordinalParse: defaultOrdinalParse,
	        relativeTime: defaultRelativeTime,
	
	        months: defaultLocaleMonths,
	        monthsShort: defaultLocaleMonthsShort,
	
	        week: defaultLocaleWeek,
	
	        weekdays: defaultLocaleWeekdays,
	        weekdaysMin: defaultLocaleWeekdaysMin,
	        weekdaysShort: defaultLocaleWeekdaysShort,
	
	        meridiemParse: defaultLocaleMeridiemParse
	    };
	
	    // internal storage for locale config files
	    var locales = {};
	    var globalLocale;
	
	    function normalizeLocale(key) {
	        return key ? key.toLowerCase().replace('_', '-') : key;
	    }
	
	    // pick the locale from the array
	    // try ['en-au', 'en-gb'] as 'en-au', 'en-gb', 'en', as in move through the list trying each
	    // substring from most specific to least, but move to the next array item if it's a more specific variant than the current root
	    function chooseLocale(names) {
	        var i = 0, j, next, locale, split;
	
	        while (i < names.length) {
	            split = normalizeLocale(names[i]).split('-');
	            j = split.length;
	            next = normalizeLocale(names[i + 1]);
	            next = next ? next.split('-') : null;
	            while (j > 0) {
	                locale = loadLocale(split.slice(0, j).join('-'));
	                if (locale) {
	                    return locale;
	                }
	                if (next && next.length >= j && compareArrays(split, next, true) >= j - 1) {
	                    //the next array item is better than a shallower substring of this one
	                    break;
	                }
	                j--;
	            }
	            i++;
	        }
	        return null;
	    }
	
	    function loadLocale(name) {
	        var oldLocale = null;
	        // TODO: Find a better way to register and load all the locales in Node
	        if (!locales[name] && (typeof module !== 'undefined') &&
	                module && module.require) {
	            try {
	                oldLocale = globalLocale._abbr;
	                module.require('./locale/' + name);
	                // because defineLocale currently also sets the global locale, we
	                // want to undo that for lazy loaded locales
	                locale_locales__getSetGlobalLocale(oldLocale);
	            } catch (e) { }
	        }
	        return locales[name];
	    }
	
	    // This function will load locale and then set the global locale.  If
	    // no arguments are passed in, it will simply return the current global
	    // locale key.
	    function locale_locales__getSetGlobalLocale (key, values) {
	        var data;
	        if (key) {
	            if (isUndefined(values)) {
	                data = locale_locales__getLocale(key);
	            }
	            else {
	                data = defineLocale(key, values);
	            }
	
	            if (data) {
	                // moment.duration._locale = moment._locale = data;
	                globalLocale = data;
	            }
	        }
	
	        return globalLocale._abbr;
	    }
	
	    function defineLocale (name, config) {
	        if (config !== null) {
	            var parentConfig = baseConfig;
	            config.abbr = name;
	            if (locales[name] != null) {
	                deprecateSimple('defineLocaleOverride',
	                        'use moment.updateLocale(localeName, config) to change ' +
	                        'an existing locale. moment.defineLocale(localeName, ' +
	                        'config) should only be used for creating a new locale ' +
	                        'See http://momentjs.com/guides/#/warnings/define-locale/ for more info.');
	                parentConfig = locales[name]._config;
	            } else if (config.parentLocale != null) {
	                if (locales[config.parentLocale] != null) {
	                    parentConfig = locales[config.parentLocale]._config;
	                } else {
	                    // treat as if there is no base config
	                    deprecateSimple('parentLocaleUndefined',
	                            'specified parentLocale is not defined yet. See http://momentjs.com/guides/#/warnings/parent-locale/');
	                }
	            }
	            locales[name] = new Locale(mergeConfigs(parentConfig, config));
	
	            // backwards compat for now: also set the locale
	            locale_locales__getSetGlobalLocale(name);
	
	            return locales[name];
	        } else {
	            // useful for testing
	            delete locales[name];
	            return null;
	        }
	    }
	
	    function updateLocale(name, config) {
	        if (config != null) {
	            var locale, parentConfig = baseConfig;
	            // MERGE
	            if (locales[name] != null) {
	                parentConfig = locales[name]._config;
	            }
	            config = mergeConfigs(parentConfig, config);
	            locale = new Locale(config);
	            locale.parentLocale = locales[name];
	            locales[name] = locale;
	
	            // backwards compat for now: also set the locale
	            locale_locales__getSetGlobalLocale(name);
	        } else {
	            // pass null for config to unupdate, useful for tests
	            if (locales[name] != null) {
	                if (locales[name].parentLocale != null) {
	                    locales[name] = locales[name].parentLocale;
	                } else if (locales[name] != null) {
	                    delete locales[name];
	                }
	            }
	        }
	        return locales[name];
	    }
	
	    // returns locale data
	    function locale_locales__getLocale (key) {
	        var locale;
	
	        if (key && key._locale && key._locale._abbr) {
	            key = key._locale._abbr;
	        }
	
	        if (!key) {
	            return globalLocale;
	        }
	
	        if (!isArray(key)) {
	            //short-circuit everything else
	            locale = loadLocale(key);
	            if (locale) {
	                return locale;
	            }
	            key = [key];
	        }
	
	        return chooseLocale(key);
	    }
	
	    function locale_locales__listLocales() {
	        return keys(locales);
	    }
	
	    function checkOverflow (m) {
	        var overflow;
	        var a = m._a;
	
	        if (a && getParsingFlags(m).overflow === -2) {
	            overflow =
	                a[MONTH]       < 0 || a[MONTH]       > 11  ? MONTH :
	                a[DATE]        < 1 || a[DATE]        > daysInMonth(a[YEAR], a[MONTH]) ? DATE :
	                a[HOUR]        < 0 || a[HOUR]        > 24 || (a[HOUR] === 24 && (a[MINUTE] !== 0 || a[SECOND] !== 0 || a[MILLISECOND] !== 0)) ? HOUR :
	                a[MINUTE]      < 0 || a[MINUTE]      > 59  ? MINUTE :
	                a[SECOND]      < 0 || a[SECOND]      > 59  ? SECOND :
	                a[MILLISECOND] < 0 || a[MILLISECOND] > 999 ? MILLISECOND :
	                -1;
	
	            if (getParsingFlags(m)._overflowDayOfYear && (overflow < YEAR || overflow > DATE)) {
	                overflow = DATE;
	            }
	            if (getParsingFlags(m)._overflowWeeks && overflow === -1) {
	                overflow = WEEK;
	            }
	            if (getParsingFlags(m)._overflowWeekday && overflow === -1) {
	                overflow = WEEKDAY;
	            }
	
	            getParsingFlags(m).overflow = overflow;
	        }
	
	        return m;
	    }
	
	    // iso 8601 regex
	    // 0000-00-00 0000-W00 or 0000-W00-0 + T + 00 or 00:00 or 00:00:00 or 00:00:00.000 + +00:00 or +0000 or +00)
	    var extendedIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?/;
	    var basicIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?/;
	
	    var tzRegex = /Z|[+-]\d\d(?::?\d\d)?/;
	
	    var isoDates = [
	        ['YYYYYY-MM-DD', /[+-]\d{6}-\d\d-\d\d/],
	        ['YYYY-MM-DD', /\d{4}-\d\d-\d\d/],
	        ['GGGG-[W]WW-E', /\d{4}-W\d\d-\d/],
	        ['GGGG-[W]WW', /\d{4}-W\d\d/, false],
	        ['YYYY-DDD', /\d{4}-\d{3}/],
	        ['YYYY-MM', /\d{4}-\d\d/, false],
	        ['YYYYYYMMDD', /[+-]\d{10}/],
	        ['YYYYMMDD', /\d{8}/],
	        // YYYYMM is NOT allowed by the standard
	        ['GGGG[W]WWE', /\d{4}W\d{3}/],
	        ['GGGG[W]WW', /\d{4}W\d{2}/, false],
	        ['YYYYDDD', /\d{7}/]
	    ];
	
	    // iso time formats and regexes
	    var isoTimes = [
	        ['HH:mm:ss.SSSS', /\d\d:\d\d:\d\d\.\d+/],
	        ['HH:mm:ss,SSSS', /\d\d:\d\d:\d\d,\d+/],
	        ['HH:mm:ss', /\d\d:\d\d:\d\d/],
	        ['HH:mm', /\d\d:\d\d/],
	        ['HHmmss.SSSS', /\d\d\d\d\d\d\.\d+/],
	        ['HHmmss,SSSS', /\d\d\d\d\d\d,\d+/],
	        ['HHmmss', /\d\d\d\d\d\d/],
	        ['HHmm', /\d\d\d\d/],
	        ['HH', /\d\d/]
	    ];
	
	    var aspNetJsonRegex = /^\/?Date\((\-?\d+)/i;
	
	    // date from iso format
	    function configFromISO(config) {
	        var i, l,
	            string = config._i,
	            match = extendedIsoRegex.exec(string) || basicIsoRegex.exec(string),
	            allowTime, dateFormat, timeFormat, tzFormat;
	
	        if (match) {
	            getParsingFlags(config).iso = true;
	
	            for (i = 0, l = isoDates.length; i < l; i++) {
	                if (isoDates[i][1].exec(match[1])) {
	                    dateFormat = isoDates[i][0];
	                    allowTime = isoDates[i][2] !== false;
	                    break;
	                }
	            }
	            if (dateFormat == null) {
	                config._isValid = false;
	                return;
	            }
	            if (match[3]) {
	                for (i = 0, l = isoTimes.length; i < l; i++) {
	                    if (isoTimes[i][1].exec(match[3])) {
	                        // match[2] should be 'T' or space
	                        timeFormat = (match[2] || ' ') + isoTimes[i][0];
	                        break;
	                    }
	                }
	                if (timeFormat == null) {
	                    config._isValid = false;
	                    return;
	                }
	            }
	            if (!allowTime && timeFormat != null) {
	                config._isValid = false;
	                return;
	            }
	            if (match[4]) {
	                if (tzRegex.exec(match[4])) {
	                    tzFormat = 'Z';
	                } else {
	                    config._isValid = false;
	                    return;
	                }
	            }
	            config._f = dateFormat + (timeFormat || '') + (tzFormat || '');
	            configFromStringAndFormat(config);
	        } else {
	            config._isValid = false;
	        }
	    }
	
	    // date from iso format or fallback
	    function configFromString(config) {
	        var matched = aspNetJsonRegex.exec(config._i);
	
	        if (matched !== null) {
	            config._d = new Date(+matched[1]);
	            return;
	        }
	
	        configFromISO(config);
	        if (config._isValid === false) {
	            delete config._isValid;
	            utils_hooks__hooks.createFromInputFallback(config);
	        }
	    }
	
	    utils_hooks__hooks.createFromInputFallback = deprecate(
	        'value provided is not in a recognized ISO format. moment construction falls back to js Date(), ' +
	        'which is not reliable across all browsers and versions. Non ISO date formats are ' +
	        'discouraged and will be removed in an upcoming major release. Please refer to ' +
	        'http://momentjs.com/guides/#/warnings/js-date/ for more info.',
	        function (config) {
	            config._d = new Date(config._i + (config._useUTC ? ' UTC' : ''));
	        }
	    );
	
	    // Pick the first defined of two or three arguments.
	    function defaults(a, b, c) {
	        if (a != null) {
	            return a;
	        }
	        if (b != null) {
	            return b;
	        }
	        return c;
	    }
	
	    function currentDateArray(config) {
	        // hooks is actually the exported moment object
	        var nowValue = new Date(utils_hooks__hooks.now());
	        if (config._useUTC) {
	            return [nowValue.getUTCFullYear(), nowValue.getUTCMonth(), nowValue.getUTCDate()];
	        }
	        return [nowValue.getFullYear(), nowValue.getMonth(), nowValue.getDate()];
	    }
	
	    // convert an array to a date.
	    // the array should mirror the parameters below
	    // note: all values past the year are optional and will default to the lowest possible value.
	    // [year, month, day , hour, minute, second, millisecond]
	    function configFromArray (config) {
	        var i, date, input = [], currentDate, yearToUse;
	
	        if (config._d) {
	            return;
	        }
	
	        currentDate = currentDateArray(config);
	
	        //compute day of the year from weeks and weekdays
	        if (config._w && config._a[DATE] == null && config._a[MONTH] == null) {
	            dayOfYearFromWeekInfo(config);
	        }
	
	        //if the day of the year is set, figure out what it is
	        if (config._dayOfYear) {
	            yearToUse = defaults(config._a[YEAR], currentDate[YEAR]);
	
	            if (config._dayOfYear > daysInYear(yearToUse)) {
	                getParsingFlags(config)._overflowDayOfYear = true;
	            }
	
	            date = createUTCDate(yearToUse, 0, config._dayOfYear);
	            config._a[MONTH] = date.getUTCMonth();
	            config._a[DATE] = date.getUTCDate();
	        }
	
	        // Default to current date.
	        // * if no year, month, day of month are given, default to today
	        // * if day of month is given, default month and year
	        // * if month is given, default only year
	        // * if year is given, don't default anything
	        for (i = 0; i < 3 && config._a[i] == null; ++i) {
	            config._a[i] = input[i] = currentDate[i];
	        }
	
	        // Zero out whatever was not defaulted, including time
	        for (; i < 7; i++) {
	            config._a[i] = input[i] = (config._a[i] == null) ? (i === 2 ? 1 : 0) : config._a[i];
	        }
	
	        // Check for 24:00:00.000
	        if (config._a[HOUR] === 24 &&
	                config._a[MINUTE] === 0 &&
	                config._a[SECOND] === 0 &&
	                config._a[MILLISECOND] === 0) {
	            config._nextDay = true;
	            config._a[HOUR] = 0;
	        }
	
	        config._d = (config._useUTC ? createUTCDate : createDate).apply(null, input);
	        // Apply timezone offset from input. The actual utcOffset can be changed
	        // with parseZone.
	        if (config._tzm != null) {
	            config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);
	        }
	
	        if (config._nextDay) {
	            config._a[HOUR] = 24;
	        }
	    }
	
	    function dayOfYearFromWeekInfo(config) {
	        var w, weekYear, week, weekday, dow, doy, temp, weekdayOverflow;
	
	        w = config._w;
	        if (w.GG != null || w.W != null || w.E != null) {
	            dow = 1;
	            doy = 4;
	
	            // TODO: We need to take the current isoWeekYear, but that depends on
	            // how we interpret now (local, utc, fixed offset). So create
	            // a now version of current config (take local/utc/offset flags, and
	            // create now).
	            weekYear = defaults(w.GG, config._a[YEAR], weekOfYear(local__createLocal(), 1, 4).year);
	            week = defaults(w.W, 1);
	            weekday = defaults(w.E, 1);
	            if (weekday < 1 || weekday > 7) {
	                weekdayOverflow = true;
	            }
	        } else {
	            dow = config._locale._week.dow;
	            doy = config._locale._week.doy;
	
	            weekYear = defaults(w.gg, config._a[YEAR], weekOfYear(local__createLocal(), dow, doy).year);
	            week = defaults(w.w, 1);
	
	            if (w.d != null) {
	                // weekday -- low day numbers are considered next week
	                weekday = w.d;
	                if (weekday < 0 || weekday > 6) {
	                    weekdayOverflow = true;
	                }
	            } else if (w.e != null) {
	                // local weekday -- counting starts from begining of week
	                weekday = w.e + dow;
	                if (w.e < 0 || w.e > 6) {
	                    weekdayOverflow = true;
	                }
	            } else {
	                // default to begining of week
	                weekday = dow;
	            }
	        }
	        if (week < 1 || week > weeksInYear(weekYear, dow, doy)) {
	            getParsingFlags(config)._overflowWeeks = true;
	        } else if (weekdayOverflow != null) {
	            getParsingFlags(config)._overflowWeekday = true;
	        } else {
	            temp = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy);
	            config._a[YEAR] = temp.year;
	            config._dayOfYear = temp.dayOfYear;
	        }
	    }
	
	    // constant that refers to the ISO standard
	    utils_hooks__hooks.ISO_8601 = function () {};
	
	    // date from string and format string
	    function configFromStringAndFormat(config) {
	        // TODO: Move this to another part of the creation flow to prevent circular deps
	        if (config._f === utils_hooks__hooks.ISO_8601) {
	            configFromISO(config);
	            return;
	        }
	
	        config._a = [];
	        getParsingFlags(config).empty = true;
	
	        // This array is used to make a Date, either with `new Date` or `Date.UTC`
	        var string = '' + config._i,
	            i, parsedInput, tokens, token, skipped,
	            stringLength = string.length,
	            totalParsedInputLength = 0;
	
	        tokens = expandFormat(config._f, config._locale).match(formattingTokens) || [];
	
	        for (i = 0; i < tokens.length; i++) {
	            token = tokens[i];
	            parsedInput = (string.match(getParseRegexForToken(token, config)) || [])[0];
	            // console.log('token', token, 'parsedInput', parsedInput,
	            //         'regex', getParseRegexForToken(token, config));
	            if (parsedInput) {
	                skipped = string.substr(0, string.indexOf(parsedInput));
	                if (skipped.length > 0) {
	                    getParsingFlags(config).unusedInput.push(skipped);
	                }
	                string = string.slice(string.indexOf(parsedInput) + parsedInput.length);
	                totalParsedInputLength += parsedInput.length;
	            }
	            // don't parse if it's not a known token
	            if (formatTokenFunctions[token]) {
	                if (parsedInput) {
	                    getParsingFlags(config).empty = false;
	                }
	                else {
	                    getParsingFlags(config).unusedTokens.push(token);
	                }
	                addTimeToArrayFromToken(token, parsedInput, config);
	            }
	            else if (config._strict && !parsedInput) {
	                getParsingFlags(config).unusedTokens.push(token);
	            }
	        }
	
	        // add remaining unparsed input length to the string
	        getParsingFlags(config).charsLeftOver = stringLength - totalParsedInputLength;
	        if (string.length > 0) {
	            getParsingFlags(config).unusedInput.push(string);
	        }
	
	        // clear _12h flag if hour is <= 12
	        if (config._a[HOUR] <= 12 &&
	            getParsingFlags(config).bigHour === true &&
	            config._a[HOUR] > 0) {
	            getParsingFlags(config).bigHour = undefined;
	        }
	
	        getParsingFlags(config).parsedDateParts = config._a.slice(0);
	        getParsingFlags(config).meridiem = config._meridiem;
	        // handle meridiem
	        config._a[HOUR] = meridiemFixWrap(config._locale, config._a[HOUR], config._meridiem);
	
	        configFromArray(config);
	        checkOverflow(config);
	    }
	
	
	    function meridiemFixWrap (locale, hour, meridiem) {
	        var isPm;
	
	        if (meridiem == null) {
	            // nothing to do
	            return hour;
	        }
	        if (locale.meridiemHour != null) {
	            return locale.meridiemHour(hour, meridiem);
	        } else if (locale.isPM != null) {
	            // Fallback
	            isPm = locale.isPM(meridiem);
	            if (isPm && hour < 12) {
	                hour += 12;
	            }
	            if (!isPm && hour === 12) {
	                hour = 0;
	            }
	            return hour;
	        } else {
	            // this is not supposed to happen
	            return hour;
	        }
	    }
	
	    // date from string and array of format strings
	    function configFromStringAndArray(config) {
	        var tempConfig,
	            bestMoment,
	
	            scoreToBeat,
	            i,
	            currentScore;
	
	        if (config._f.length === 0) {
	            getParsingFlags(config).invalidFormat = true;
	            config._d = new Date(NaN);
	            return;
	        }
	
	        for (i = 0; i < config._f.length; i++) {
	            currentScore = 0;
	            tempConfig = copyConfig({}, config);
	            if (config._useUTC != null) {
	                tempConfig._useUTC = config._useUTC;
	            }
	            tempConfig._f = config._f[i];
	            configFromStringAndFormat(tempConfig);
	
	            if (!valid__isValid(tempConfig)) {
	                continue;
	            }
	
	            // if there is any input that was not parsed add a penalty for that format
	            currentScore += getParsingFlags(tempConfig).charsLeftOver;
	
	            //or tokens
	            currentScore += getParsingFlags(tempConfig).unusedTokens.length * 10;
	
	            getParsingFlags(tempConfig).score = currentScore;
	
	            if (scoreToBeat == null || currentScore < scoreToBeat) {
	                scoreToBeat = currentScore;
	                bestMoment = tempConfig;
	            }
	        }
	
	        extend(config, bestMoment || tempConfig);
	    }
	
	    function configFromObject(config) {
	        if (config._d) {
	            return;
	        }
	
	        var i = normalizeObjectUnits(config._i);
	        config._a = map([i.year, i.month, i.day || i.date, i.hour, i.minute, i.second, i.millisecond], function (obj) {
	            return obj && parseInt(obj, 10);
	        });
	
	        configFromArray(config);
	    }
	
	    function createFromConfig (config) {
	        var res = new Moment(checkOverflow(prepareConfig(config)));
	        if (res._nextDay) {
	            // Adding is smart enough around DST
	            res.add(1, 'd');
	            res._nextDay = undefined;
	        }
	
	        return res;
	    }
	
	    function prepareConfig (config) {
	        var input = config._i,
	            format = config._f;
	
	        config._locale = config._locale || locale_locales__getLocale(config._l);
	
	        if (input === null || (format === undefined && input === '')) {
	            return valid__createInvalid({nullInput: true});
	        }
	
	        if (typeof input === 'string') {
	            config._i = input = config._locale.preparse(input);
	        }
	
	        if (isMoment(input)) {
	            return new Moment(checkOverflow(input));
	        } else if (isArray(format)) {
	            configFromStringAndArray(config);
	        } else if (isDate(input)) {
	            config._d = input;
	        } else if (format) {
	            configFromStringAndFormat(config);
	        }  else {
	            configFromInput(config);
	        }
	
	        if (!valid__isValid(config)) {
	            config._d = null;
	        }
	
	        return config;
	    }
	
	    function configFromInput(config) {
	        var input = config._i;
	        if (input === undefined) {
	            config._d = new Date(utils_hooks__hooks.now());
	        } else if (isDate(input)) {
	            config._d = new Date(input.valueOf());
	        } else if (typeof input === 'string') {
	            configFromString(config);
	        } else if (isArray(input)) {
	            config._a = map(input.slice(0), function (obj) {
	                return parseInt(obj, 10);
	            });
	            configFromArray(config);
	        } else if (typeof(input) === 'object') {
	            configFromObject(config);
	        } else if (typeof(input) === 'number') {
	            // from milliseconds
	            config._d = new Date(input);
	        } else {
	            utils_hooks__hooks.createFromInputFallback(config);
	        }
	    }
	
	    function createLocalOrUTC (input, format, locale, strict, isUTC) {
	        var c = {};
	
	        if (typeof(locale) === 'boolean') {
	            strict = locale;
	            locale = undefined;
	        }
	
	        if ((isObject(input) && isObjectEmpty(input)) ||
	                (isArray(input) && input.length === 0)) {
	            input = undefined;
	        }
	        // object construction must be done this way.
	        // https://github.com/moment/moment/issues/1423
	        c._isAMomentObject = true;
	        c._useUTC = c._isUTC = isUTC;
	        c._l = locale;
	        c._i = input;
	        c._f = format;
	        c._strict = strict;
	
	        return createFromConfig(c);
	    }
	
	    function local__createLocal (input, format, locale, strict) {
	        return createLocalOrUTC(input, format, locale, strict, false);
	    }
	
	    var prototypeMin = deprecate(
	        'moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/',
	        function () {
	            var other = local__createLocal.apply(null, arguments);
	            if (this.isValid() && other.isValid()) {
	                return other < this ? this : other;
	            } else {
	                return valid__createInvalid();
	            }
	        }
	    );
	
	    var prototypeMax = deprecate(
	        'moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/',
	        function () {
	            var other = local__createLocal.apply(null, arguments);
	            if (this.isValid() && other.isValid()) {
	                return other > this ? this : other;
	            } else {
	                return valid__createInvalid();
	            }
	        }
	    );
	
	    // Pick a moment m from moments so that m[fn](other) is true for all
	    // other. This relies on the function fn to be transitive.
	    //
	    // moments should either be an array of moment objects or an array, whose
	    // first element is an array of moment objects.
	    function pickBy(fn, moments) {
	        var res, i;
	        if (moments.length === 1 && isArray(moments[0])) {
	            moments = moments[0];
	        }
	        if (!moments.length) {
	            return local__createLocal();
	        }
	        res = moments[0];
	        for (i = 1; i < moments.length; ++i) {
	            if (!moments[i].isValid() || moments[i][fn](res)) {
	                res = moments[i];
	            }
	        }
	        return res;
	    }
	
	    // TODO: Use [].sort instead?
	    function min () {
	        var args = [].slice.call(arguments, 0);
	
	        return pickBy('isBefore', args);
	    }
	
	    function max () {
	        var args = [].slice.call(arguments, 0);
	
	        return pickBy('isAfter', args);
	    }
	
	    var now = function () {
	        return Date.now ? Date.now() : +(new Date());
	    };
	
	    function Duration (duration) {
	        var normalizedInput = normalizeObjectUnits(duration),
	            years = normalizedInput.year || 0,
	            quarters = normalizedInput.quarter || 0,
	            months = normalizedInput.month || 0,
	            weeks = normalizedInput.week || 0,
	            days = normalizedInput.day || 0,
	            hours = normalizedInput.hour || 0,
	            minutes = normalizedInput.minute || 0,
	            seconds = normalizedInput.second || 0,
	            milliseconds = normalizedInput.millisecond || 0;
	
	        // representation for dateAddRemove
	        this._milliseconds = +milliseconds +
	            seconds * 1e3 + // 1000
	            minutes * 6e4 + // 1000 * 60
	            hours * 1000 * 60 * 60; //using 1000 * 60 * 60 instead of 36e5 to avoid floating point rounding errors https://github.com/moment/moment/issues/2978
	        // Because of dateAddRemove treats 24 hours as different from a
	        // day when working around DST, we need to store them separately
	        this._days = +days +
	            weeks * 7;
	        // It is impossible translate months into days without knowing
	        // which months you are are talking about, so we have to store
	        // it separately.
	        this._months = +months +
	            quarters * 3 +
	            years * 12;
	
	        this._data = {};
	
	        this._locale = locale_locales__getLocale();
	
	        this._bubble();
	    }
	
	    function isDuration (obj) {
	        return obj instanceof Duration;
	    }
	
	    function absRound (number) {
	        if (number < 0) {
	            return Math.round(-1 * number) * -1;
	        } else {
	            return Math.round(number);
	        }
	    }
	
	    // FORMATTING
	
	    function offset (token, separator) {
	        addFormatToken(token, 0, 0, function () {
	            var offset = this.utcOffset();
	            var sign = '+';
	            if (offset < 0) {
	                offset = -offset;
	                sign = '-';
	            }
	            return sign + zeroFill(~~(offset / 60), 2) + separator + zeroFill(~~(offset) % 60, 2);
	        });
	    }
	
	    offset('Z', ':');
	    offset('ZZ', '');
	
	    // PARSING
	
	    addRegexToken('Z',  matchShortOffset);
	    addRegexToken('ZZ', matchShortOffset);
	    addParseToken(['Z', 'ZZ'], function (input, array, config) {
	        config._useUTC = true;
	        config._tzm = offsetFromString(matchShortOffset, input);
	    });
	
	    // HELPERS
	
	    // timezone chunker
	    // '+10:00' > ['10',  '00']
	    // '-1530'  > ['-15', '30']
	    var chunkOffset = /([\+\-]|\d\d)/gi;
	
	    function offsetFromString(matcher, string) {
	        var matches = ((string || '').match(matcher) || []);
	        var chunk   = matches[matches.length - 1] || [];
	        var parts   = (chunk + '').match(chunkOffset) || ['-', 0, 0];
	        var minutes = +(parts[1] * 60) + toInt(parts[2]);
	
	        return parts[0] === '+' ? minutes : -minutes;
	    }
	
	    // Return a moment from input, that is local/utc/zone equivalent to model.
	    function cloneWithOffset(input, model) {
	        var res, diff;
	        if (model._isUTC) {
	            res = model.clone();
	            diff = (isMoment(input) || isDate(input) ? input.valueOf() : local__createLocal(input).valueOf()) - res.valueOf();
	            // Use low-level api, because this fn is low-level api.
	            res._d.setTime(res._d.valueOf() + diff);
	            utils_hooks__hooks.updateOffset(res, false);
	            return res;
	        } else {
	            return local__createLocal(input).local();
	        }
	    }
	
	    function getDateOffset (m) {
	        // On Firefox.24 Date#getTimezoneOffset returns a floating point.
	        // https://github.com/moment/moment/pull/1871
	        return -Math.round(m._d.getTimezoneOffset() / 15) * 15;
	    }
	
	    // HOOKS
	
	    // This function will be called whenever a moment is mutated.
	    // It is intended to keep the offset in sync with the timezone.
	    utils_hooks__hooks.updateOffset = function () {};
	
	    // MOMENTS
	
	    // keepLocalTime = true means only change the timezone, without
	    // affecting the local hour. So 5:31:26 +0300 --[utcOffset(2, true)]-->
	    // 5:31:26 +0200 It is possible that 5:31:26 doesn't exist with offset
	    // +0200, so we adjust the time as needed, to be valid.
	    //
	    // Keeping the time actually adds/subtracts (one hour)
	    // from the actual represented time. That is why we call updateOffset
	    // a second time. In case it wants us to change the offset again
	    // _changeInProgress == true case, then we have to adjust, because
	    // there is no such time in the given timezone.
	    function getSetOffset (input, keepLocalTime) {
	        var offset = this._offset || 0,
	            localAdjust;
	        if (!this.isValid()) {
	            return input != null ? this : NaN;
	        }
	        if (input != null) {
	            if (typeof input === 'string') {
	                input = offsetFromString(matchShortOffset, input);
	            } else if (Math.abs(input) < 16) {
	                input = input * 60;
	            }
	            if (!this._isUTC && keepLocalTime) {
	                localAdjust = getDateOffset(this);
	            }
	            this._offset = input;
	            this._isUTC = true;
	            if (localAdjust != null) {
	                this.add(localAdjust, 'm');
	            }
	            if (offset !== input) {
	                if (!keepLocalTime || this._changeInProgress) {
	                    add_subtract__addSubtract(this, create__createDuration(input - offset, 'm'), 1, false);
	                } else if (!this._changeInProgress) {
	                    this._changeInProgress = true;
	                    utils_hooks__hooks.updateOffset(this, true);
	                    this._changeInProgress = null;
	                }
	            }
	            return this;
	        } else {
	            return this._isUTC ? offset : getDateOffset(this);
	        }
	    }
	
	    function getSetZone (input, keepLocalTime) {
	        if (input != null) {
	            if (typeof input !== 'string') {
	                input = -input;
	            }
	
	            this.utcOffset(input, keepLocalTime);
	
	            return this;
	        } else {
	            return -this.utcOffset();
	        }
	    }
	
	    function setOffsetToUTC (keepLocalTime) {
	        return this.utcOffset(0, keepLocalTime);
	    }
	
	    function setOffsetToLocal (keepLocalTime) {
	        if (this._isUTC) {
	            this.utcOffset(0, keepLocalTime);
	            this._isUTC = false;
	
	            if (keepLocalTime) {
	                this.subtract(getDateOffset(this), 'm');
	            }
	        }
	        return this;
	    }
	
	    function setOffsetToParsedOffset () {
	        if (this._tzm) {
	            this.utcOffset(this._tzm);
	        } else if (typeof this._i === 'string') {
	            var tZone = offsetFromString(matchOffset, this._i);
	
	            if (tZone === 0) {
	                this.utcOffset(0, true);
	            } else {
	                this.utcOffset(offsetFromString(matchOffset, this._i));
	            }
	        }
	        return this;
	    }
	
	    function hasAlignedHourOffset (input) {
	        if (!this.isValid()) {
	            return false;
	        }
	        input = input ? local__createLocal(input).utcOffset() : 0;
	
	        return (this.utcOffset() - input) % 60 === 0;
	    }
	
	    function isDaylightSavingTime () {
	        return (
	            this.utcOffset() > this.clone().month(0).utcOffset() ||
	            this.utcOffset() > this.clone().month(5).utcOffset()
	        );
	    }
	
	    function isDaylightSavingTimeShifted () {
	        if (!isUndefined(this._isDSTShifted)) {
	            return this._isDSTShifted;
	        }
	
	        var c = {};
	
	        copyConfig(c, this);
	        c = prepareConfig(c);
	
	        if (c._a) {
	            var other = c._isUTC ? create_utc__createUTC(c._a) : local__createLocal(c._a);
	            this._isDSTShifted = this.isValid() &&
	                compareArrays(c._a, other.toArray()) > 0;
	        } else {
	            this._isDSTShifted = false;
	        }
	
	        return this._isDSTShifted;
	    }
	
	    function isLocal () {
	        return this.isValid() ? !this._isUTC : false;
	    }
	
	    function isUtcOffset () {
	        return this.isValid() ? this._isUTC : false;
	    }
	
	    function isUtc () {
	        return this.isValid() ? this._isUTC && this._offset === 0 : false;
	    }
	
	    // ASP.NET json date format regex
	    var aspNetRegex = /^(\-)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)(\.\d*)?)?$/;
	
	    // from http://docs.closure-library.googlecode.com/git/closure_goog_date_date.js.source.html
	    // somewhat more in line with 4.4.3.2 2004 spec, but allows decimal anywhere
	    // and further modified to allow for strings containing both week and day
	    var isoRegex = /^(-)?P(?:(-?[0-9,.]*)Y)?(?:(-?[0-9,.]*)M)?(?:(-?[0-9,.]*)W)?(?:(-?[0-9,.]*)D)?(?:T(?:(-?[0-9,.]*)H)?(?:(-?[0-9,.]*)M)?(?:(-?[0-9,.]*)S)?)?$/;
	
	    function create__createDuration (input, key) {
	        var duration = input,
	            // matching against regexp is expensive, do it on demand
	            match = null,
	            sign,
	            ret,
	            diffRes;
	
	        if (isDuration(input)) {
	            duration = {
	                ms : input._milliseconds,
	                d  : input._days,
	                M  : input._months
	            };
	        } else if (typeof input === 'number') {
	            duration = {};
	            if (key) {
	                duration[key] = input;
	            } else {
	                duration.milliseconds = input;
	            }
	        } else if (!!(match = aspNetRegex.exec(input))) {
	            sign = (match[1] === '-') ? -1 : 1;
	            duration = {
	                y  : 0,
	                d  : toInt(match[DATE])                         * sign,
	                h  : toInt(match[HOUR])                         * sign,
	                m  : toInt(match[MINUTE])                       * sign,
	                s  : toInt(match[SECOND])                       * sign,
	                ms : toInt(absRound(match[MILLISECOND] * 1000)) * sign // the millisecond decimal point is included in the match
	            };
	        } else if (!!(match = isoRegex.exec(input))) {
	            sign = (match[1] === '-') ? -1 : 1;
	            duration = {
	                y : parseIso(match[2], sign),
	                M : parseIso(match[3], sign),
	                w : parseIso(match[4], sign),
	                d : parseIso(match[5], sign),
	                h : parseIso(match[6], sign),
	                m : parseIso(match[7], sign),
	                s : parseIso(match[8], sign)
	            };
	        } else if (duration == null) {// checks for null or undefined
	            duration = {};
	        } else if (typeof duration === 'object' && ('from' in duration || 'to' in duration)) {
	            diffRes = momentsDifference(local__createLocal(duration.from), local__createLocal(duration.to));
	
	            duration = {};
	            duration.ms = diffRes.milliseconds;
	            duration.M = diffRes.months;
	        }
	
	        ret = new Duration(duration);
	
	        if (isDuration(input) && hasOwnProp(input, '_locale')) {
	            ret._locale = input._locale;
	        }
	
	        return ret;
	    }
	
	    create__createDuration.fn = Duration.prototype;
	
	    function parseIso (inp, sign) {
	        // We'd normally use ~~inp for this, but unfortunately it also
	        // converts floats to ints.
	        // inp may be undefined, so careful calling replace on it.
	        var res = inp && parseFloat(inp.replace(',', '.'));
	        // apply sign while we're at it
	        return (isNaN(res) ? 0 : res) * sign;
	    }
	
	    function positiveMomentsDifference(base, other) {
	        var res = {milliseconds: 0, months: 0};
	
	        res.months = other.month() - base.month() +
	            (other.year() - base.year()) * 12;
	        if (base.clone().add(res.months, 'M').isAfter(other)) {
	            --res.months;
	        }
	
	        res.milliseconds = +other - +(base.clone().add(res.months, 'M'));
	
	        return res;
	    }
	
	    function momentsDifference(base, other) {
	        var res;
	        if (!(base.isValid() && other.isValid())) {
	            return {milliseconds: 0, months: 0};
	        }
	
	        other = cloneWithOffset(other, base);
	        if (base.isBefore(other)) {
	            res = positiveMomentsDifference(base, other);
	        } else {
	            res = positiveMomentsDifference(other, base);
	            res.milliseconds = -res.milliseconds;
	            res.months = -res.months;
	        }
	
	        return res;
	    }
	
	    // TODO: remove 'name' arg after deprecation is removed
	    function createAdder(direction, name) {
	        return function (val, period) {
	            var dur, tmp;
	            //invert the arguments, but complain about it
	            if (period !== null && !isNaN(+period)) {
	                deprecateSimple(name, 'moment().' + name  + '(period, number) is deprecated. Please use moment().' + name + '(number, period). ' +
	                'See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info.');
	                tmp = val; val = period; period = tmp;
	            }
	
	            val = typeof val === 'string' ? +val : val;
	            dur = create__createDuration(val, period);
	            add_subtract__addSubtract(this, dur, direction);
	            return this;
	        };
	    }
	
	    function add_subtract__addSubtract (mom, duration, isAdding, updateOffset) {
	        var milliseconds = duration._milliseconds,
	            days = absRound(duration._days),
	            months = absRound(duration._months);
	
	        if (!mom.isValid()) {
	            // No op
	            return;
	        }
	
	        updateOffset = updateOffset == null ? true : updateOffset;
	
	        if (milliseconds) {
	            mom._d.setTime(mom._d.valueOf() + milliseconds * isAdding);
	        }
	        if (days) {
	            get_set__set(mom, 'Date', get_set__get(mom, 'Date') + days * isAdding);
	        }
	        if (months) {
	            setMonth(mom, get_set__get(mom, 'Month') + months * isAdding);
	        }
	        if (updateOffset) {
	            utils_hooks__hooks.updateOffset(mom, days || months);
	        }
	    }
	
	    var add_subtract__add      = createAdder(1, 'add');
	    var add_subtract__subtract = createAdder(-1, 'subtract');
	
	    function getCalendarFormat(myMoment, now) {
	        var diff = myMoment.diff(now, 'days', true);
	        return diff < -6 ? 'sameElse' :
	                diff < -1 ? 'lastWeek' :
	                diff < 0 ? 'lastDay' :
	                diff < 1 ? 'sameDay' :
	                diff < 2 ? 'nextDay' :
	                diff < 7 ? 'nextWeek' : 'sameElse';
	    }
	
	    function moment_calendar__calendar (time, formats) {
	        // We want to compare the start of today, vs this.
	        // Getting start-of-today depends on whether we're local/utc/offset or not.
	        var now = time || local__createLocal(),
	            sod = cloneWithOffset(now, this).startOf('day'),
	            format = utils_hooks__hooks.calendarFormat(this, sod) || 'sameElse';
	
	        var output = formats && (isFunction(formats[format]) ? formats[format].call(this, now) : formats[format]);
	
	        return this.format(output || this.localeData().calendar(format, this, local__createLocal(now)));
	    }
	
	    function clone () {
	        return new Moment(this);
	    }
	
	    function isAfter (input, units) {
	        var localInput = isMoment(input) ? input : local__createLocal(input);
	        if (!(this.isValid() && localInput.isValid())) {
	            return false;
	        }
	        units = normalizeUnits(!isUndefined(units) ? units : 'millisecond');
	        if (units === 'millisecond') {
	            return this.valueOf() > localInput.valueOf();
	        } else {
	            return localInput.valueOf() < this.clone().startOf(units).valueOf();
	        }
	    }
	
	    function isBefore (input, units) {
	        var localInput = isMoment(input) ? input : local__createLocal(input);
	        if (!(this.isValid() && localInput.isValid())) {
	            return false;
	        }
	        units = normalizeUnits(!isUndefined(units) ? units : 'millisecond');
	        if (units === 'millisecond') {
	            return this.valueOf() < localInput.valueOf();
	        } else {
	            return this.clone().endOf(units).valueOf() < localInput.valueOf();
	        }
	    }
	
	    function isBetween (from, to, units, inclusivity) {
	        inclusivity = inclusivity || '()';
	        return (inclusivity[0] === '(' ? this.isAfter(from, units) : !this.isBefore(from, units)) &&
	            (inclusivity[1] === ')' ? this.isBefore(to, units) : !this.isAfter(to, units));
	    }
	
	    function isSame (input, units) {
	        var localInput = isMoment(input) ? input : local__createLocal(input),
	            inputMs;
	        if (!(this.isValid() && localInput.isValid())) {
	            return false;
	        }
	        units = normalizeUnits(units || 'millisecond');
	        if (units === 'millisecond') {
	            return this.valueOf() === localInput.valueOf();
	        } else {
	            inputMs = localInput.valueOf();
	            return this.clone().startOf(units).valueOf() <= inputMs && inputMs <= this.clone().endOf(units).valueOf();
	        }
	    }
	
	    function isSameOrAfter (input, units) {
	        return this.isSame(input, units) || this.isAfter(input,units);
	    }
	
	    function isSameOrBefore (input, units) {
	        return this.isSame(input, units) || this.isBefore(input,units);
	    }
	
	    function diff (input, units, asFloat) {
	        var that,
	            zoneDelta,
	            delta, output;
	
	        if (!this.isValid()) {
	            return NaN;
	        }
	
	        that = cloneWithOffset(input, this);
	
	        if (!that.isValid()) {
	            return NaN;
	        }
	
	        zoneDelta = (that.utcOffset() - this.utcOffset()) * 6e4;
	
	        units = normalizeUnits(units);
	
	        if (units === 'year' || units === 'month' || units === 'quarter') {
	            output = monthDiff(this, that);
	            if (units === 'quarter') {
	                output = output / 3;
	            } else if (units === 'year') {
	                output = output / 12;
	            }
	        } else {
	            delta = this - that;
	            output = units === 'second' ? delta / 1e3 : // 1000
	                units === 'minute' ? delta / 6e4 : // 1000 * 60
	                units === 'hour' ? delta / 36e5 : // 1000 * 60 * 60
	                units === 'day' ? (delta - zoneDelta) / 864e5 : // 1000 * 60 * 60 * 24, negate dst
	                units === 'week' ? (delta - zoneDelta) / 6048e5 : // 1000 * 60 * 60 * 24 * 7, negate dst
	                delta;
	        }
	        return asFloat ? output : absFloor(output);
	    }
	
	    function monthDiff (a, b) {
	        // difference in months
	        var wholeMonthDiff = ((b.year() - a.year()) * 12) + (b.month() - a.month()),
	            // b is in (anchor - 1 month, anchor + 1 month)
	            anchor = a.clone().add(wholeMonthDiff, 'months'),
	            anchor2, adjust;
	
	        if (b - anchor < 0) {
	            anchor2 = a.clone().add(wholeMonthDiff - 1, 'months');
	            // linear across the month
	            adjust = (b - anchor) / (anchor - anchor2);
	        } else {
	            anchor2 = a.clone().add(wholeMonthDiff + 1, 'months');
	            // linear across the month
	            adjust = (b - anchor) / (anchor2 - anchor);
	        }
	
	        //check for negative zero, return zero if negative zero
	        return -(wholeMonthDiff + adjust) || 0;
	    }
	
	    utils_hooks__hooks.defaultFormat = 'YYYY-MM-DDTHH:mm:ssZ';
	    utils_hooks__hooks.defaultFormatUtc = 'YYYY-MM-DDTHH:mm:ss[Z]';
	
	    function toString () {
	        return this.clone().locale('en').format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');
	    }
	
	    function moment_format__toISOString () {
	        var m = this.clone().utc();
	        if (0 < m.year() && m.year() <= 9999) {
	            if (isFunction(Date.prototype.toISOString)) {
	                // native implementation is ~50x faster, use it when we can
	                return this.toDate().toISOString();
	            } else {
	                return formatMoment(m, 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
	            }
	        } else {
	            return formatMoment(m, 'YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
	        }
	    }
	
	    function format (inputString) {
	        if (!inputString) {
	            inputString = this.isUtc() ? utils_hooks__hooks.defaultFormatUtc : utils_hooks__hooks.defaultFormat;
	        }
	        var output = formatMoment(this, inputString);
	        return this.localeData().postformat(output);
	    }
	
	    function from (time, withoutSuffix) {
	        if (this.isValid() &&
	                ((isMoment(time) && time.isValid()) ||
	                 local__createLocal(time).isValid())) {
	            return create__createDuration({to: this, from: time}).locale(this.locale()).humanize(!withoutSuffix);
	        } else {
	            return this.localeData().invalidDate();
	        }
	    }
	
	    function fromNow (withoutSuffix) {
	        return this.from(local__createLocal(), withoutSuffix);
	    }
	
	    function to (time, withoutSuffix) {
	        if (this.isValid() &&
	                ((isMoment(time) && time.isValid()) ||
	                 local__createLocal(time).isValid())) {
	            return create__createDuration({from: this, to: time}).locale(this.locale()).humanize(!withoutSuffix);
	        } else {
	            return this.localeData().invalidDate();
	        }
	    }
	
	    function toNow (withoutSuffix) {
	        return this.to(local__createLocal(), withoutSuffix);
	    }
	
	    // If passed a locale key, it will set the locale for this
	    // instance.  Otherwise, it will return the locale configuration
	    // variables for this instance.
	    function locale (key) {
	        var newLocaleData;
	
	        if (key === undefined) {
	            return this._locale._abbr;
	        } else {
	            newLocaleData = locale_locales__getLocale(key);
	            if (newLocaleData != null) {
	                this._locale = newLocaleData;
	            }
	            return this;
	        }
	    }
	
	    var lang = deprecate(
	        'moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.',
	        function (key) {
	            if (key === undefined) {
	                return this.localeData();
	            } else {
	                return this.locale(key);
	            }
	        }
	    );
	
	    function localeData () {
	        return this._locale;
	    }
	
	    function startOf (units) {
	        units = normalizeUnits(units);
	        // the following switch intentionally omits break keywords
	        // to utilize falling through the cases.
	        switch (units) {
	            case 'year':
	                this.month(0);
	                /* falls through */
	            case 'quarter':
	            case 'month':
	                this.date(1);
	                /* falls through */
	            case 'week':
	            case 'isoWeek':
	            case 'day':
	            case 'date':
	                this.hours(0);
	                /* falls through */
	            case 'hour':
	                this.minutes(0);
	                /* falls through */
	            case 'minute':
	                this.seconds(0);
	                /* falls through */
	            case 'second':
	                this.milliseconds(0);
	        }
	
	        // weeks are a special case
	        if (units === 'week') {
	            this.weekday(0);
	        }
	        if (units === 'isoWeek') {
	            this.isoWeekday(1);
	        }
	
	        // quarters are also special
	        if (units === 'quarter') {
	            this.month(Math.floor(this.month() / 3) * 3);
	        }
	
	        return this;
	    }
	
	    function endOf (units) {
	        units = normalizeUnits(units);
	        if (units === undefined || units === 'millisecond') {
	            return this;
	        }
	
	        // 'date' is an alias for 'day', so it should be considered as such.
	        if (units === 'date') {
	            units = 'day';
	        }
	
	        return this.startOf(units).add(1, (units === 'isoWeek' ? 'week' : units)).subtract(1, 'ms');
	    }
	
	    function to_type__valueOf () {
	        return this._d.valueOf() - ((this._offset || 0) * 60000);
	    }
	
	    function unix () {
	        return Math.floor(this.valueOf() / 1000);
	    }
	
	    function toDate () {
	        return new Date(this.valueOf());
	    }
	
	    function toArray () {
	        var m = this;
	        return [m.year(), m.month(), m.date(), m.hour(), m.minute(), m.second(), m.millisecond()];
	    }
	
	    function toObject () {
	        var m = this;
	        return {
	            years: m.year(),
	            months: m.month(),
	            date: m.date(),
	            hours: m.hours(),
	            minutes: m.minutes(),
	            seconds: m.seconds(),
	            milliseconds: m.milliseconds()
	        };
	    }
	
	    function toJSON () {
	        // new Date(NaN).toJSON() === null
	        return this.isValid() ? this.toISOString() : null;
	    }
	
	    function moment_valid__isValid () {
	        return valid__isValid(this);
	    }
	
	    function parsingFlags () {
	        return extend({}, getParsingFlags(this));
	    }
	
	    function invalidAt () {
	        return getParsingFlags(this).overflow;
	    }
	
	    function creationData() {
	        return {
	            input: this._i,
	            format: this._f,
	            locale: this._locale,
	            isUTC: this._isUTC,
	            strict: this._strict
	        };
	    }
	
	    // FORMATTING
	
	    addFormatToken(0, ['gg', 2], 0, function () {
	        return this.weekYear() % 100;
	    });
	
	    addFormatToken(0, ['GG', 2], 0, function () {
	        return this.isoWeekYear() % 100;
	    });
	
	    function addWeekYearFormatToken (token, getter) {
	        addFormatToken(0, [token, token.length], 0, getter);
	    }
	
	    addWeekYearFormatToken('gggg',     'weekYear');
	    addWeekYearFormatToken('ggggg',    'weekYear');
	    addWeekYearFormatToken('GGGG',  'isoWeekYear');
	    addWeekYearFormatToken('GGGGG', 'isoWeekYear');
	
	    // ALIASES
	
	    addUnitAlias('weekYear', 'gg');
	    addUnitAlias('isoWeekYear', 'GG');
	
	    // PRIORITY
	
	    addUnitPriority('weekYear', 1);
	    addUnitPriority('isoWeekYear', 1);
	
	
	    // PARSING
	
	    addRegexToken('G',      matchSigned);
	    addRegexToken('g',      matchSigned);
	    addRegexToken('GG',     match1to2, match2);
	    addRegexToken('gg',     match1to2, match2);
	    addRegexToken('GGGG',   match1to4, match4);
	    addRegexToken('gggg',   match1to4, match4);
	    addRegexToken('GGGGG',  match1to6, match6);
	    addRegexToken('ggggg',  match1to6, match6);
	
	    addWeekParseToken(['gggg', 'ggggg', 'GGGG', 'GGGGG'], function (input, week, config, token) {
	        week[token.substr(0, 2)] = toInt(input);
	    });
	
	    addWeekParseToken(['gg', 'GG'], function (input, week, config, token) {
	        week[token] = utils_hooks__hooks.parseTwoDigitYear(input);
	    });
	
	    // MOMENTS
	
	    function getSetWeekYear (input) {
	        return getSetWeekYearHelper.call(this,
	                input,
	                this.week(),
	                this.weekday(),
	                this.localeData()._week.dow,
	                this.localeData()._week.doy);
	    }
	
	    function getSetISOWeekYear (input) {
	        return getSetWeekYearHelper.call(this,
	                input, this.isoWeek(), this.isoWeekday(), 1, 4);
	    }
	
	    function getISOWeeksInYear () {
	        return weeksInYear(this.year(), 1, 4);
	    }
	
	    function getWeeksInYear () {
	        var weekInfo = this.localeData()._week;
	        return weeksInYear(this.year(), weekInfo.dow, weekInfo.doy);
	    }
	
	    function getSetWeekYearHelper(input, week, weekday, dow, doy) {
	        var weeksTarget;
	        if (input == null) {
	            return weekOfYear(this, dow, doy).year;
	        } else {
	            weeksTarget = weeksInYear(input, dow, doy);
	            if (week > weeksTarget) {
	                week = weeksTarget;
	            }
	            return setWeekAll.call(this, input, week, weekday, dow, doy);
	        }
	    }
	
	    function setWeekAll(weekYear, week, weekday, dow, doy) {
	        var dayOfYearData = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy),
	            date = createUTCDate(dayOfYearData.year, 0, dayOfYearData.dayOfYear);
	
	        this.year(date.getUTCFullYear());
	        this.month(date.getUTCMonth());
	        this.date(date.getUTCDate());
	        return this;
	    }
	
	    // FORMATTING
	
	    addFormatToken('Q', 0, 'Qo', 'quarter');
	
	    // ALIASES
	
	    addUnitAlias('quarter', 'Q');
	
	    // PRIORITY
	
	    addUnitPriority('quarter', 7);
	
	    // PARSING
	
	    addRegexToken('Q', match1);
	    addParseToken('Q', function (input, array) {
	        array[MONTH] = (toInt(input) - 1) * 3;
	    });
	
	    // MOMENTS
	
	    function getSetQuarter (input) {
	        return input == null ? Math.ceil((this.month() + 1) / 3) : this.month((input - 1) * 3 + this.month() % 3);
	    }
	
	    // FORMATTING
	
	    addFormatToken('D', ['DD', 2], 'Do', 'date');
	
	    // ALIASES
	
	    addUnitAlias('date', 'D');
	
	    // PRIOROITY
	    addUnitPriority('date', 9);
	
	    // PARSING
	
	    addRegexToken('D',  match1to2);
	    addRegexToken('DD', match1to2, match2);
	    addRegexToken('Do', function (isStrict, locale) {
	        return isStrict ? locale._ordinalParse : locale._ordinalParseLenient;
	    });
	
	    addParseToken(['D', 'DD'], DATE);
	    addParseToken('Do', function (input, array) {
	        array[DATE] = toInt(input.match(match1to2)[0], 10);
	    });
	
	    // MOMENTS
	
	    var getSetDayOfMonth = makeGetSet('Date', true);
	
	    // FORMATTING
	
	    addFormatToken('DDD', ['DDDD', 3], 'DDDo', 'dayOfYear');
	
	    // ALIASES
	
	    addUnitAlias('dayOfYear', 'DDD');
	
	    // PRIORITY
	    addUnitPriority('dayOfYear', 4);
	
	    // PARSING
	
	    addRegexToken('DDD',  match1to3);
	    addRegexToken('DDDD', match3);
	    addParseToken(['DDD', 'DDDD'], function (input, array, config) {
	        config._dayOfYear = toInt(input);
	    });
	
	    // HELPERS
	
	    // MOMENTS
	
	    function getSetDayOfYear (input) {
	        var dayOfYear = Math.round((this.clone().startOf('day') - this.clone().startOf('year')) / 864e5) + 1;
	        return input == null ? dayOfYear : this.add((input - dayOfYear), 'd');
	    }
	
	    // FORMATTING
	
	    addFormatToken('m', ['mm', 2], 0, 'minute');
	
	    // ALIASES
	
	    addUnitAlias('minute', 'm');
	
	    // PRIORITY
	
	    addUnitPriority('minute', 14);
	
	    // PARSING
	
	    addRegexToken('m',  match1to2);
	    addRegexToken('mm', match1to2, match2);
	    addParseToken(['m', 'mm'], MINUTE);
	
	    // MOMENTS
	
	    var getSetMinute = makeGetSet('Minutes', false);
	
	    // FORMATTING
	
	    addFormatToken('s', ['ss', 2], 0, 'second');
	
	    // ALIASES
	
	    addUnitAlias('second', 's');
	
	    // PRIORITY
	
	    addUnitPriority('second', 15);
	
	    // PARSING
	
	    addRegexToken('s',  match1to2);
	    addRegexToken('ss', match1to2, match2);
	    addParseToken(['s', 'ss'], SECOND);
	
	    // MOMENTS
	
	    var getSetSecond = makeGetSet('Seconds', false);
	
	    // FORMATTING
	
	    addFormatToken('S', 0, 0, function () {
	        return ~~(this.millisecond() / 100);
	    });
	
	    addFormatToken(0, ['SS', 2], 0, function () {
	        return ~~(this.millisecond() / 10);
	    });
	
	    addFormatToken(0, ['SSS', 3], 0, 'millisecond');
	    addFormatToken(0, ['SSSS', 4], 0, function () {
	        return this.millisecond() * 10;
	    });
	    addFormatToken(0, ['SSSSS', 5], 0, function () {
	        return this.millisecond() * 100;
	    });
	    addFormatToken(0, ['SSSSSS', 6], 0, function () {
	        return this.millisecond() * 1000;
	    });
	    addFormatToken(0, ['SSSSSSS', 7], 0, function () {
	        return this.millisecond() * 10000;
	    });
	    addFormatToken(0, ['SSSSSSSS', 8], 0, function () {
	        return this.millisecond() * 100000;
	    });
	    addFormatToken(0, ['SSSSSSSSS', 9], 0, function () {
	        return this.millisecond() * 1000000;
	    });
	
	
	    // ALIASES
	
	    addUnitAlias('millisecond', 'ms');
	
	    // PRIORITY
	
	    addUnitPriority('millisecond', 16);
	
	    // PARSING
	
	    addRegexToken('S',    match1to3, match1);
	    addRegexToken('SS',   match1to3, match2);
	    addRegexToken('SSS',  match1to3, match3);
	
	    var token;
	    for (token = 'SSSS'; token.length <= 9; token += 'S') {
	        addRegexToken(token, matchUnsigned);
	    }
	
	    function parseMs(input, array) {
	        array[MILLISECOND] = toInt(('0.' + input) * 1000);
	    }
	
	    for (token = 'S'; token.length <= 9; token += 'S') {
	        addParseToken(token, parseMs);
	    }
	    // MOMENTS
	
	    var getSetMillisecond = makeGetSet('Milliseconds', false);
	
	    // FORMATTING
	
	    addFormatToken('z',  0, 0, 'zoneAbbr');
	    addFormatToken('zz', 0, 0, 'zoneName');
	
	    // MOMENTS
	
	    function getZoneAbbr () {
	        return this._isUTC ? 'UTC' : '';
	    }
	
	    function getZoneName () {
	        return this._isUTC ? 'Coordinated Universal Time' : '';
	    }
	
	    var momentPrototype__proto = Moment.prototype;
	
	    momentPrototype__proto.add               = add_subtract__add;
	    momentPrototype__proto.calendar          = moment_calendar__calendar;
	    momentPrototype__proto.clone             = clone;
	    momentPrototype__proto.diff              = diff;
	    momentPrototype__proto.endOf             = endOf;
	    momentPrototype__proto.format            = format;
	    momentPrototype__proto.from              = from;
	    momentPrototype__proto.fromNow           = fromNow;
	    momentPrototype__proto.to                = to;
	    momentPrototype__proto.toNow             = toNow;
	    momentPrototype__proto.get               = stringGet;
	    momentPrototype__proto.invalidAt         = invalidAt;
	    momentPrototype__proto.isAfter           = isAfter;
	    momentPrototype__proto.isBefore          = isBefore;
	    momentPrototype__proto.isBetween         = isBetween;
	    momentPrototype__proto.isSame            = isSame;
	    momentPrototype__proto.isSameOrAfter     = isSameOrAfter;
	    momentPrototype__proto.isSameOrBefore    = isSameOrBefore;
	    momentPrototype__proto.isValid           = moment_valid__isValid;
	    momentPrototype__proto.lang              = lang;
	    momentPrototype__proto.locale            = locale;
	    momentPrototype__proto.localeData        = localeData;
	    momentPrototype__proto.max               = prototypeMax;
	    momentPrototype__proto.min               = prototypeMin;
	    momentPrototype__proto.parsingFlags      = parsingFlags;
	    momentPrototype__proto.set               = stringSet;
	    momentPrototype__proto.startOf           = startOf;
	    momentPrototype__proto.subtract          = add_subtract__subtract;
	    momentPrototype__proto.toArray           = toArray;
	    momentPrototype__proto.toObject          = toObject;
	    momentPrototype__proto.toDate            = toDate;
	    momentPrototype__proto.toISOString       = moment_format__toISOString;
	    momentPrototype__proto.toJSON            = toJSON;
	    momentPrototype__proto.toString          = toString;
	    momentPrototype__proto.unix              = unix;
	    momentPrototype__proto.valueOf           = to_type__valueOf;
	    momentPrototype__proto.creationData      = creationData;
	
	    // Year
	    momentPrototype__proto.year       = getSetYear;
	    momentPrototype__proto.isLeapYear = getIsLeapYear;
	
	    // Week Year
	    momentPrototype__proto.weekYear    = getSetWeekYear;
	    momentPrototype__proto.isoWeekYear = getSetISOWeekYear;
	
	    // Quarter
	    momentPrototype__proto.quarter = momentPrototype__proto.quarters = getSetQuarter;
	
	    // Month
	    momentPrototype__proto.month       = getSetMonth;
	    momentPrototype__proto.daysInMonth = getDaysInMonth;
	
	    // Week
	    momentPrototype__proto.week           = momentPrototype__proto.weeks        = getSetWeek;
	    momentPrototype__proto.isoWeek        = momentPrototype__proto.isoWeeks     = getSetISOWeek;
	    momentPrototype__proto.weeksInYear    = getWeeksInYear;
	    momentPrototype__proto.isoWeeksInYear = getISOWeeksInYear;
	
	    // Day
	    momentPrototype__proto.date       = getSetDayOfMonth;
	    momentPrototype__proto.day        = momentPrototype__proto.days             = getSetDayOfWeek;
	    momentPrototype__proto.weekday    = getSetLocaleDayOfWeek;
	    momentPrototype__proto.isoWeekday = getSetISODayOfWeek;
	    momentPrototype__proto.dayOfYear  = getSetDayOfYear;
	
	    // Hour
	    momentPrototype__proto.hour = momentPrototype__proto.hours = getSetHour;
	
	    // Minute
	    momentPrototype__proto.minute = momentPrototype__proto.minutes = getSetMinute;
	
	    // Second
	    momentPrototype__proto.second = momentPrototype__proto.seconds = getSetSecond;
	
	    // Millisecond
	    momentPrototype__proto.millisecond = momentPrototype__proto.milliseconds = getSetMillisecond;
	
	    // Offset
	    momentPrototype__proto.utcOffset            = getSetOffset;
	    momentPrototype__proto.utc                  = setOffsetToUTC;
	    momentPrototype__proto.local                = setOffsetToLocal;
	    momentPrototype__proto.parseZone            = setOffsetToParsedOffset;
	    momentPrototype__proto.hasAlignedHourOffset = hasAlignedHourOffset;
	    momentPrototype__proto.isDST                = isDaylightSavingTime;
	    momentPrototype__proto.isLocal              = isLocal;
	    momentPrototype__proto.isUtcOffset          = isUtcOffset;
	    momentPrototype__proto.isUtc                = isUtc;
	    momentPrototype__proto.isUTC                = isUtc;
	
	    // Timezone
	    momentPrototype__proto.zoneAbbr = getZoneAbbr;
	    momentPrototype__proto.zoneName = getZoneName;
	
	    // Deprecations
	    momentPrototype__proto.dates  = deprecate('dates accessor is deprecated. Use date instead.', getSetDayOfMonth);
	    momentPrototype__proto.months = deprecate('months accessor is deprecated. Use month instead', getSetMonth);
	    momentPrototype__proto.years  = deprecate('years accessor is deprecated. Use year instead', getSetYear);
	    momentPrototype__proto.zone   = deprecate('moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/', getSetZone);
	    momentPrototype__proto.isDSTShifted = deprecate('isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information', isDaylightSavingTimeShifted);
	
	    var momentPrototype = momentPrototype__proto;
	
	    function moment__createUnix (input) {
	        return local__createLocal(input * 1000);
	    }
	
	    function moment__createInZone () {
	        return local__createLocal.apply(null, arguments).parseZone();
	    }
	
	    function preParsePostFormat (string) {
	        return string;
	    }
	
	    var prototype__proto = Locale.prototype;
	
	    prototype__proto.calendar        = locale_calendar__calendar;
	    prototype__proto.longDateFormat  = longDateFormat;
	    prototype__proto.invalidDate     = invalidDate;
	    prototype__proto.ordinal         = ordinal;
	    prototype__proto.preparse        = preParsePostFormat;
	    prototype__proto.postformat      = preParsePostFormat;
	    prototype__proto.relativeTime    = relative__relativeTime;
	    prototype__proto.pastFuture      = pastFuture;
	    prototype__proto.set             = locale_set__set;
	
	    // Month
	    prototype__proto.months            =        localeMonths;
	    prototype__proto.monthsShort       =        localeMonthsShort;
	    prototype__proto.monthsParse       =        localeMonthsParse;
	    prototype__proto.monthsRegex       = monthsRegex;
	    prototype__proto.monthsShortRegex  = monthsShortRegex;
	
	    // Week
	    prototype__proto.week = localeWeek;
	    prototype__proto.firstDayOfYear = localeFirstDayOfYear;
	    prototype__proto.firstDayOfWeek = localeFirstDayOfWeek;
	
	    // Day of Week
	    prototype__proto.weekdays       =        localeWeekdays;
	    prototype__proto.weekdaysMin    =        localeWeekdaysMin;
	    prototype__proto.weekdaysShort  =        localeWeekdaysShort;
	    prototype__proto.weekdaysParse  =        localeWeekdaysParse;
	
	    prototype__proto.weekdaysRegex       =        weekdaysRegex;
	    prototype__proto.weekdaysShortRegex  =        weekdaysShortRegex;
	    prototype__proto.weekdaysMinRegex    =        weekdaysMinRegex;
	
	    // Hours
	    prototype__proto.isPM = localeIsPM;
	    prototype__proto.meridiem = localeMeridiem;
	
	    function lists__get (format, index, field, setter) {
	        var locale = locale_locales__getLocale();
	        var utc = create_utc__createUTC().set(setter, index);
	        return locale[field](utc, format);
	    }
	
	    function listMonthsImpl (format, index, field) {
	        if (typeof format === 'number') {
	            index = format;
	            format = undefined;
	        }
	
	        format = format || '';
	
	        if (index != null) {
	            return lists__get(format, index, field, 'month');
	        }
	
	        var i;
	        var out = [];
	        for (i = 0; i < 12; i++) {
	            out[i] = lists__get(format, i, field, 'month');
	        }
	        return out;
	    }
	
	    // ()
	    // (5)
	    // (fmt, 5)
	    // (fmt)
	    // (true)
	    // (true, 5)
	    // (true, fmt, 5)
	    // (true, fmt)
	    function listWeekdaysImpl (localeSorted, format, index, field) {
	        if (typeof localeSorted === 'boolean') {
	            if (typeof format === 'number') {
	                index = format;
	                format = undefined;
	            }
	
	            format = format || '';
	        } else {
	            format = localeSorted;
	            index = format;
	            localeSorted = false;
	
	            if (typeof format === 'number') {
	                index = format;
	                format = undefined;
	            }
	
	            format = format || '';
	        }
	
	        var locale = locale_locales__getLocale(),
	            shift = localeSorted ? locale._week.dow : 0;
	
	        if (index != null) {
	            return lists__get(format, (index + shift) % 7, field, 'day');
	        }
	
	        var i;
	        var out = [];
	        for (i = 0; i < 7; i++) {
	            out[i] = lists__get(format, (i + shift) % 7, field, 'day');
	        }
	        return out;
	    }
	
	    function lists__listMonths (format, index) {
	        return listMonthsImpl(format, index, 'months');
	    }
	
	    function lists__listMonthsShort (format, index) {
	        return listMonthsImpl(format, index, 'monthsShort');
	    }
	
	    function lists__listWeekdays (localeSorted, format, index) {
	        return listWeekdaysImpl(localeSorted, format, index, 'weekdays');
	    }
	
	    function lists__listWeekdaysShort (localeSorted, format, index) {
	        return listWeekdaysImpl(localeSorted, format, index, 'weekdaysShort');
	    }
	
	    function lists__listWeekdaysMin (localeSorted, format, index) {
	        return listWeekdaysImpl(localeSorted, format, index, 'weekdaysMin');
	    }
	
	    locale_locales__getSetGlobalLocale('en', {
	        ordinalParse: /\d{1,2}(th|st|nd|rd)/,
	        ordinal : function (number) {
	            var b = number % 10,
	                output = (toInt(number % 100 / 10) === 1) ? 'th' :
	                (b === 1) ? 'st' :
	                (b === 2) ? 'nd' :
	                (b === 3) ? 'rd' : 'th';
	            return number + output;
	        }
	    });
	
	    // Side effect imports
	    utils_hooks__hooks.lang = deprecate('moment.lang is deprecated. Use moment.locale instead.', locale_locales__getSetGlobalLocale);
	    utils_hooks__hooks.langData = deprecate('moment.langData is deprecated. Use moment.localeData instead.', locale_locales__getLocale);
	
	    var mathAbs = Math.abs;
	
	    function duration_abs__abs () {
	        var data           = this._data;
	
	        this._milliseconds = mathAbs(this._milliseconds);
	        this._days         = mathAbs(this._days);
	        this._months       = mathAbs(this._months);
	
	        data.milliseconds  = mathAbs(data.milliseconds);
	        data.seconds       = mathAbs(data.seconds);
	        data.minutes       = mathAbs(data.minutes);
	        data.hours         = mathAbs(data.hours);
	        data.months        = mathAbs(data.months);
	        data.years         = mathAbs(data.years);
	
	        return this;
	    }
	
	    function duration_add_subtract__addSubtract (duration, input, value, direction) {
	        var other = create__createDuration(input, value);
	
	        duration._milliseconds += direction * other._milliseconds;
	        duration._days         += direction * other._days;
	        duration._months       += direction * other._months;
	
	        return duration._bubble();
	    }
	
	    // supports only 2.0-style add(1, 's') or add(duration)
	    function duration_add_subtract__add (input, value) {
	        return duration_add_subtract__addSubtract(this, input, value, 1);
	    }
	
	    // supports only 2.0-style subtract(1, 's') or subtract(duration)
	    function duration_add_subtract__subtract (input, value) {
	        return duration_add_subtract__addSubtract(this, input, value, -1);
	    }
	
	    function absCeil (number) {
	        if (number < 0) {
	            return Math.floor(number);
	        } else {
	            return Math.ceil(number);
	        }
	    }
	
	    function bubble () {
	        var milliseconds = this._milliseconds;
	        var days         = this._days;
	        var months       = this._months;
	        var data         = this._data;
	        var seconds, minutes, hours, years, monthsFromDays;
	
	        // if we have a mix of positive and negative values, bubble down first
	        // check: https://github.com/moment/moment/issues/2166
	        if (!((milliseconds >= 0 && days >= 0 && months >= 0) ||
	                (milliseconds <= 0 && days <= 0 && months <= 0))) {
	            milliseconds += absCeil(monthsToDays(months) + days) * 864e5;
	            days = 0;
	            months = 0;
	        }
	
	        // The following code bubbles up values, see the tests for
	        // examples of what that means.
	        data.milliseconds = milliseconds % 1000;
	
	        seconds           = absFloor(milliseconds / 1000);
	        data.seconds      = seconds % 60;
	
	        minutes           = absFloor(seconds / 60);
	        data.minutes      = minutes % 60;
	
	        hours             = absFloor(minutes / 60);
	        data.hours        = hours % 24;
	
	        days += absFloor(hours / 24);
	
	        // convert days to months
	        monthsFromDays = absFloor(daysToMonths(days));
	        months += monthsFromDays;
	        days -= absCeil(monthsToDays(monthsFromDays));
	
	        // 12 months -> 1 year
	        years = absFloor(months / 12);
	        months %= 12;
	
	        data.days   = days;
	        data.months = months;
	        data.years  = years;
	
	        return this;
	    }
	
	    function daysToMonths (days) {
	        // 400 years have 146097 days (taking into account leap year rules)
	        // 400 years have 12 months === 4800
	        return days * 4800 / 146097;
	    }
	
	    function monthsToDays (months) {
	        // the reverse of daysToMonths
	        return months * 146097 / 4800;
	    }
	
	    function as (units) {
	        var days;
	        var months;
	        var milliseconds = this._milliseconds;
	
	        units = normalizeUnits(units);
	
	        if (units === 'month' || units === 'year') {
	            days   = this._days   + milliseconds / 864e5;
	            months = this._months + daysToMonths(days);
	            return units === 'month' ? months : months / 12;
	        } else {
	            // handle milliseconds separately because of floating point math errors (issue #1867)
	            days = this._days + Math.round(monthsToDays(this._months));
	            switch (units) {
	                case 'week'   : return days / 7     + milliseconds / 6048e5;
	                case 'day'    : return days         + milliseconds / 864e5;
	                case 'hour'   : return days * 24    + milliseconds / 36e5;
	                case 'minute' : return days * 1440  + milliseconds / 6e4;
	                case 'second' : return days * 86400 + milliseconds / 1000;
	                // Math.floor prevents floating point math errors here
	                case 'millisecond': return Math.floor(days * 864e5) + milliseconds;
	                default: throw new Error('Unknown unit ' + units);
	            }
	        }
	    }
	
	    // TODO: Use this.as('ms')?
	    function duration_as__valueOf () {
	        return (
	            this._milliseconds +
	            this._days * 864e5 +
	            (this._months % 12) * 2592e6 +
	            toInt(this._months / 12) * 31536e6
	        );
	    }
	
	    function makeAs (alias) {
	        return function () {
	            return this.as(alias);
	        };
	    }
	
	    var asMilliseconds = makeAs('ms');
	    var asSeconds      = makeAs('s');
	    var asMinutes      = makeAs('m');
	    var asHours        = makeAs('h');
	    var asDays         = makeAs('d');
	    var asWeeks        = makeAs('w');
	    var asMonths       = makeAs('M');
	    var asYears        = makeAs('y');
	
	    function duration_get__get (units) {
	        units = normalizeUnits(units);
	        return this[units + 's']();
	    }
	
	    function makeGetter(name) {
	        return function () {
	            return this._data[name];
	        };
	    }
	
	    var milliseconds = makeGetter('milliseconds');
	    var seconds      = makeGetter('seconds');
	    var minutes      = makeGetter('minutes');
	    var hours        = makeGetter('hours');
	    var days         = makeGetter('days');
	    var months       = makeGetter('months');
	    var years        = makeGetter('years');
	
	    function weeks () {
	        return absFloor(this.days() / 7);
	    }
	
	    var round = Math.round;
	    var thresholds = {
	        s: 45,  // seconds to minute
	        m: 45,  // minutes to hour
	        h: 22,  // hours to day
	        d: 26,  // days to month
	        M: 11   // months to year
	    };
	
	    // helper function for moment.fn.from, moment.fn.fromNow, and moment.duration.fn.humanize
	    function substituteTimeAgo(string, number, withoutSuffix, isFuture, locale) {
	        return locale.relativeTime(number || 1, !!withoutSuffix, string, isFuture);
	    }
	
	    function duration_humanize__relativeTime (posNegDuration, withoutSuffix, locale) {
	        var duration = create__createDuration(posNegDuration).abs();
	        var seconds  = round(duration.as('s'));
	        var minutes  = round(duration.as('m'));
	        var hours    = round(duration.as('h'));
	        var days     = round(duration.as('d'));
	        var months   = round(duration.as('M'));
	        var years    = round(duration.as('y'));
	
	        var a = seconds < thresholds.s && ['s', seconds]  ||
	                minutes <= 1           && ['m']           ||
	                minutes < thresholds.m && ['mm', minutes] ||
	                hours   <= 1           && ['h']           ||
	                hours   < thresholds.h && ['hh', hours]   ||
	                days    <= 1           && ['d']           ||
	                days    < thresholds.d && ['dd', days]    ||
	                months  <= 1           && ['M']           ||
	                months  < thresholds.M && ['MM', months]  ||
	                years   <= 1           && ['y']           || ['yy', years];
	
	        a[2] = withoutSuffix;
	        a[3] = +posNegDuration > 0;
	        a[4] = locale;
	        return substituteTimeAgo.apply(null, a);
	    }
	
	    // This function allows you to set the rounding function for relative time strings
	    function duration_humanize__getSetRelativeTimeRounding (roundingFunction) {
	        if (roundingFunction === undefined) {
	            return round;
	        }
	        if (typeof(roundingFunction) === 'function') {
	            round = roundingFunction;
	            return true;
	        }
	        return false;
	    }
	
	    // This function allows you to set a threshold for relative time strings
	    function duration_humanize__getSetRelativeTimeThreshold (threshold, limit) {
	        if (thresholds[threshold] === undefined) {
	            return false;
	        }
	        if (limit === undefined) {
	            return thresholds[threshold];
	        }
	        thresholds[threshold] = limit;
	        return true;
	    }
	
	    function humanize (withSuffix) {
	        var locale = this.localeData();
	        var output = duration_humanize__relativeTime(this, !withSuffix, locale);
	
	        if (withSuffix) {
	            output = locale.pastFuture(+this, output);
	        }
	
	        return locale.postformat(output);
	    }
	
	    var iso_string__abs = Math.abs;
	
	    function iso_string__toISOString() {
	        // for ISO strings we do not use the normal bubbling rules:
	        //  * milliseconds bubble up until they become hours
	        //  * days do not bubble at all
	        //  * months bubble up until they become years
	        // This is because there is no context-free conversion between hours and days
	        // (think of clock changes)
	        // and also not between days and months (28-31 days per month)
	        var seconds = iso_string__abs(this._milliseconds) / 1000;
	        var days         = iso_string__abs(this._days);
	        var months       = iso_string__abs(this._months);
	        var minutes, hours, years;
	
	        // 3600 seconds -> 60 minutes -> 1 hour
	        minutes           = absFloor(seconds / 60);
	        hours             = absFloor(minutes / 60);
	        seconds %= 60;
	        minutes %= 60;
	
	        // 12 months -> 1 year
	        years  = absFloor(months / 12);
	        months %= 12;
	
	
	        // inspired by https://github.com/dordille/moment-isoduration/blob/master/moment.isoduration.js
	        var Y = years;
	        var M = months;
	        var D = days;
	        var h = hours;
	        var m = minutes;
	        var s = seconds;
	        var total = this.asSeconds();
	
	        if (!total) {
	            // this is the same as C#'s (Noda) and python (isodate)...
	            // but not other JS (goog.date)
	            return 'P0D';
	        }
	
	        return (total < 0 ? '-' : '') +
	            'P' +
	            (Y ? Y + 'Y' : '') +
	            (M ? M + 'M' : '') +
	            (D ? D + 'D' : '') +
	            ((h || m || s) ? 'T' : '') +
	            (h ? h + 'H' : '') +
	            (m ? m + 'M' : '') +
	            (s ? s + 'S' : '');
	    }
	
	    var duration_prototype__proto = Duration.prototype;
	
	    duration_prototype__proto.abs            = duration_abs__abs;
	    duration_prototype__proto.add            = duration_add_subtract__add;
	    duration_prototype__proto.subtract       = duration_add_subtract__subtract;
	    duration_prototype__proto.as             = as;
	    duration_prototype__proto.asMilliseconds = asMilliseconds;
	    duration_prototype__proto.asSeconds      = asSeconds;
	    duration_prototype__proto.asMinutes      = asMinutes;
	    duration_prototype__proto.asHours        = asHours;
	    duration_prototype__proto.asDays         = asDays;
	    duration_prototype__proto.asWeeks        = asWeeks;
	    duration_prototype__proto.asMonths       = asMonths;
	    duration_prototype__proto.asYears        = asYears;
	    duration_prototype__proto.valueOf        = duration_as__valueOf;
	    duration_prototype__proto._bubble        = bubble;
	    duration_prototype__proto.get            = duration_get__get;
	    duration_prototype__proto.milliseconds   = milliseconds;
	    duration_prototype__proto.seconds        = seconds;
	    duration_prototype__proto.minutes        = minutes;
	    duration_prototype__proto.hours          = hours;
	    duration_prototype__proto.days           = days;
	    duration_prototype__proto.weeks          = weeks;
	    duration_prototype__proto.months         = months;
	    duration_prototype__proto.years          = years;
	    duration_prototype__proto.humanize       = humanize;
	    duration_prototype__proto.toISOString    = iso_string__toISOString;
	    duration_prototype__proto.toString       = iso_string__toISOString;
	    duration_prototype__proto.toJSON         = iso_string__toISOString;
	    duration_prototype__proto.locale         = locale;
	    duration_prototype__proto.localeData     = localeData;
	
	    // Deprecations
	    duration_prototype__proto.toIsoString = deprecate('toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)', iso_string__toISOString);
	    duration_prototype__proto.lang = lang;
	
	    // Side effect imports
	
	    // FORMATTING
	
	    addFormatToken('X', 0, 0, 'unix');
	    addFormatToken('x', 0, 0, 'valueOf');
	
	    // PARSING
	
	    addRegexToken('x', matchSigned);
	    addRegexToken('X', matchTimestamp);
	    addParseToken('X', function (input, array, config) {
	        config._d = new Date(parseFloat(input, 10) * 1000);
	    });
	    addParseToken('x', function (input, array, config) {
	        config._d = new Date(toInt(input));
	    });
	
	    // Side effect imports
	
	
	    utils_hooks__hooks.version = '2.15.0';
	
	    setHookCallback(local__createLocal);
	
	    utils_hooks__hooks.fn                    = momentPrototype;
	    utils_hooks__hooks.min                   = min;
	    utils_hooks__hooks.max                   = max;
	    utils_hooks__hooks.now                   = now;
	    utils_hooks__hooks.utc                   = create_utc__createUTC;
	    utils_hooks__hooks.unix                  = moment__createUnix;
	    utils_hooks__hooks.months                = lists__listMonths;
	    utils_hooks__hooks.isDate                = isDate;
	    utils_hooks__hooks.locale                = locale_locales__getSetGlobalLocale;
	    utils_hooks__hooks.invalid               = valid__createInvalid;
	    utils_hooks__hooks.duration              = create__createDuration;
	    utils_hooks__hooks.isMoment              = isMoment;
	    utils_hooks__hooks.weekdays              = lists__listWeekdays;
	    utils_hooks__hooks.parseZone             = moment__createInZone;
	    utils_hooks__hooks.localeData            = locale_locales__getLocale;
	    utils_hooks__hooks.isDuration            = isDuration;
	    utils_hooks__hooks.monthsShort           = lists__listMonthsShort;
	    utils_hooks__hooks.weekdaysMin           = lists__listWeekdaysMin;
	    utils_hooks__hooks.defineLocale          = defineLocale;
	    utils_hooks__hooks.updateLocale          = updateLocale;
	    utils_hooks__hooks.locales               = locale_locales__listLocales;
	    utils_hooks__hooks.weekdaysShort         = lists__listWeekdaysShort;
	    utils_hooks__hooks.normalizeUnits        = normalizeUnits;
	    utils_hooks__hooks.relativeTimeRounding = duration_humanize__getSetRelativeTimeRounding;
	    utils_hooks__hooks.relativeTimeThreshold = duration_humanize__getSetRelativeTimeThreshold;
	    utils_hooks__hooks.calendarFormat        = getCalendarFormat;
	    utils_hooks__hooks.prototype             = momentPrototype;
	
	    var _moment = utils_hooks__hooks;
	
	    return _moment;
	
	}));
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(60)(module)))

/***/ },
/* 60 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 61 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	exports['default'] = function (nga, admin) {
	    return nga.menu().addChild(nga.menu(admin.getEntity('categories')).title('Rubros')).addChild(nga.menu(admin.getEntity('entities')).title('Comercios').icon('<span class="glyphicon glyphicon-file"></span>')).addChild(nga.menu(admin.getEntity('adverts')).title('Promos').icon('<span class="glyphicon glyphicon-th-large"></span>')).addChild(nga.menu(admin.getEntity('tags')).title('Tags').icon('<span class="glyphicon glyphicon-tags"></span>')).addChild(nga.menu(admin.getEntity('cities')).title('Ciudades').icon('<span class="glyphicon glyphicon-map-marker"></span>')).addChild(nga.menu(admin.getEntity('usuarios')).title('Usuarios').icon('<span class="glyphicon glyphicon-user"></span>')).addChild(nga.menu(admin.getEntity('chatrooms')).title('Mensajes').icon('<span class="glyphicon glyphicon-inbox"></span>'));
	};
	
	module.exports = exports['default'];

/***/ },
/* 62 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	function requestInterceptor(RestangularProvider) {
	  RestangularProvider.addFullRequestInterceptor(function (element, operation, what, url, headers, params, httpConfig) {
	
	    if (what == "clients" && operation == "get") {
	      if (!params.filter) {
	        params['filter'] = {};
	      }
	      params.filter['include'] = ["usuario"];
	    }
	
	    return { params: params };
	  });
	}
	
	exports["default"] = { requestInterceptor: requestInterceptor };
	module.exports = exports["default"];

/***/ },
/* 63 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	exports['default'] = function (nga, admin) {
	
	  var Categories = nga.entity('categories');
	  var Cities = nga.entity('cities');
	  var Tags = nga.entity('tags');
	
	  var entityId = JSON.parse(localStorage.getItem('az_admin_user')).entityId;
	
	  // Definiendo la entidad como perfil de este usuario Owner
	  var Entity = admin.getEntity('entities').url(function (entityName, viewType, identifierValue, identifierName) {
	    return 'entities/' + entityId;
	  });
	
	  Entity.editionView().fields([nga.field('submit', 'template').template('<input class="btn btn-info button-submit-form" type="submit" value="Guardar cambios" ng-click="formController.submitEdition($event)">', true), nga.field('dummy').label('').template('<h3>Información básica:</h3>'), nga.field('name').label('Nombre'), nga.field('description', 'text').label('Quiénes somos'), nga.field('shortTimeDesc').attributes({ placeholder: 'Máximo 40 caractéres' }).validation({ maxlength: 40 }).label('Dirección específica'), nga.field('dummy').label('').template('* agregar N º de local, esquina, piso, km de ser necesario'),
	  // nga.field('shortTimeDesc').label('Descripción breve del horario (máximo 40 caractéres)'),
	  // nga.field('dummy').label('').template('<h3>Ubicación en la app:</h3>'),
	  // nga.field('dummy').label('').template('Seleccione los rubros correspondientes a su negocio.'),
	  // nga.field('belongsToCategory', 'reference_many')
	  // .label("Rubros")
	  // .targetEntity(Categories)
	  // .permanentFilters({ "has_entities": true })
	  // .targetField(nga.field('name')),
	
	  // nga.field('dummy').label('').template('<h3>Tags</h3>'),
	  // nga.field('dummy').label('').template('Los Tags son palabras claves que sirven para que los usuarios encuentren tu negocio en una búsqueda específica. Elegí entre las existentes clickeando en el cuadro de abajo o crea vos mismo tus Tags.<br><br>Recomendación: Agrega tu barrio, calle, actividad y productos principales (recorda que deben ser sin símbolos, acentos o mayúsculas)'),
	  //
	  // nga.field('hasTags', 'reference_many')
	  // .label("")
	  // .perPage(10000)
	  // .targetEntity(Tags)
	  // .targetField(nga.field('name')),
	  //
	  // nga.field('tags', 'embedded_list') // Define a 1-N relationship with the (embedded) comment entity
	  // .targetFields([ // which comment fields to display in the datagrid / form
	  //     nga.field('name')
	  // ]),
	  //
	  // nga.field('hasTags').label('').template('<add-new-tag entry="entry" datastore="datastore"></add-new-tag>'),
	
	  nga.field('dummy').label('').template('<h3>Datos de contacto:</h3>'), nga.field('address').label('Ubicación por GPS'), nga.field('dummy').label('').template('Carga tu dirección o ubiacion geografica sin abreviaturas ni especificaciones para geolocalizar en google maps'), nga.field('cityId', 'reference').label('Ciudad').targetEntity(Cities).targetField(nga.field('name')), nga.field('geoLocation', 'template').label('Obtener Geo localización').template('<geo></geo>'), nga.field('phone').label('Teléfono Fijo'), nga.field('mobile').label('Teléfono Celular'), nga.field('email').label('E-mail'), nga.field('website').label('Página Web'), nga.field('facebook').label('Facebook'), nga.field('twitter').label('Twitter'), nga.field('whatsapp').label('Whatsapp'), nga.field('instagram').label('Instagram'), nga.field('dummy').label('').template('<h3>Información Comercial:</h3>'), nga.field('dummy').label('Servicios').template('<services></services>'), nga.field('services', 'wysiwyg').stripTags(true).label(''), nga.field('dummy').label('').template('Elegí el tamaño, tipo y alineación del texto y personalizálo a tu manera'), nga.field('timeSheet', 'wysiwyg').label('Horarios'), nga.field('dummy').label('').template('Elegí el tamaño, tipo y alineación del texto y personalizálo a tu manera'), nga.field('productSheet', 'wysiwyg').label('Productos'), nga.field('dummy').label('Formas de pago').template('<payment></payment>'), nga.field('paymentSheet', 'wysiwyg').label(''), nga.field('dummy').label('').template('<h3>Imagenes:</h3>'), nga.field('dummy').label('').template('Consejo: las imágenes “logo de tu comercio” e “imagen de fondo APP” deben ser de baja resolución'), nga.field('logo', 'template').label('Logo de tu comercio').template('<entity-image target="logo"></entity-image>'), nga.field('cover', 'template').label('Imagen de fondo APP').template('<entity-image target="cover"></entity-image>'), nga.field('webcover', 'template').label('Fondo de tu pagina web').template('<entity-image target="webcover"></entity-image>'), nga.field('photos', 'template').label('Fotos').template('<entity-image target="photo" multi="true"></entity-image>'), nga.field('qrcode', 'template').label('Codigo QR AFIP').template('<entity-image target="qrcode"></entity-image>'), nga.field('dummy').label('').template('<h3>Datos de Sistema:</h3>'), nga.field('subdomain.name').label('Tu dominio .arg.az').editable(false), nga.field('template', 'choice').defaultValue("uno").attributes({ placeholder: 'Plantilla' }).choices([{ value: 'uno', label: 'Plantilla 1' }, { value: 'dos', label: 'Plantilla 2' }, { value: 'tres', label: 'Plantilla 3' }]).label('Diseño de pagina web')]).actions([]).title('Información de tu perfil');
	
	  return Entity;
	};
	
	module.exports = exports['default'];

/***/ },
/* 64 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	exports['default'] = function (nga, admin) {
	
	  var Categories = nga.entity('categories');
	  var Cities = nga.entity('cities');
	  var Tags = nga.entity('tags');
	
	  var entityId = JSON.parse(localStorage.getItem('az_admin_user')).entityId;
	
	  // Definiendo la entidad como perfil de este usuario Owner
	  var EntityTags = admin.getEntity('entities').url(function (entityName, viewType, identifierValue, identifierName) {
	    return 'entities/' + entityId;
	  });
	
	  EntityTags.editionView().fields([nga.field('dummy').label('').template('<h3>Tags</h3>'), nga.field('dummy').label('').template('Los Tags son palabras claves que sirven para que los usuarios encuentren tu negocio en una búsqueda específica. Elegí entre las existentes clickeando en el cuadro de abajo o crea vos mismo tus Tags.<br><br>Recomendación: Agrega tu barrio, calle, actividad y productos principales (recorda que deben ser sin símbolos, acentos o mayúsculas)'), nga.field('hasTags', 'reference_many').label("").perPage(10000).targetEntity(Tags).targetField(nga.field('name')), nga.field('tags', 'embedded_list') // Define a 1-N relationship with the (embedded) comment entity
	  .targetFields([// which comment fields to display in the datagrid / form
	  nga.field('name')]), nga.field('hasTags').label('').template('<add-new-tag entry="entry" datastore="datastore"></add-new-tag>')]).actions([]).title('Tus tags');
	
	  return EntityTags;
	};
	
	module.exports = exports['default'];

/***/ },
/* 65 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	exports['default'] = function (nga, admin) {
	
	  var Adverts = admin.getEntity('adverts');
	
	  var entityId = JSON.parse(localStorage.getItem('az_admin_user')).entityId;
	
	  Adverts.listView().permanentFilters({
	    entityId: entityId
	  }).fields([nga.field('title').isDetailLink(true).detailLinkRoute("show").label('Título'), nga.field('description', 'text').label('Descripción'), nga.field('creation_date', 'date').label('Creado el día'), nga.field('facebook', 'template').label('Facebook').template('<publish-facebook></publish-facebook>')]).filters([nga.field('title', 'template').label('Título').pinned(true).template('<search placeholder="filtrar"></search>'), nga.field('description', 'template').label('Descripción').pinned(true).template('<search placeholder="filtrar"></search>')]).actions(['batch', '<ma-create-button entity="::entity" label="Nueva"></ma-create-button>']).listActions(['<ma-edit-button size="xs" entry="entry" entity="entity" label="Editar"></ma-edit-button>', '<ma-delete-button size="xs" entry="entry" entity="entity" label="Borrar"></ma-delete-button>']).title('Promociones');
	
	  Adverts.creationView().fields([nga.field('dummy').label('').template('Completa los campos de texto, guarda la promo o destacado para luego editarlo y poder agregar la imagen que quieras. Compartila automáticamente en Facebook'), nga.field('banner', 'choice').defaultValue(false).attributes({ placeholder: 'Tipo' }).choices([{ value: false, label: 'Texto' }, { value: true, label: 'Banner' }]).label('Tipo de Promoción'), nga.field('title').label('Título').validation({ required: true }), nga.field('subtitle', 'text').label('Subtítulo'), nga.field('description', 'text').label('Descripción').validation({ required: true }), nga.field('date_description', 'text').label('Descripción de fecha'), nga.field('entityId').defaultValue(entityId).label('').cssClasses(function (entry) {
	    return 'hidden';
	  })]).actions(['<ma-list-button entry="entry" entity="entity" label="Lista"></ma-list-button>']).title('Crear nueva Promoción');
	
	  Adverts.editionView().fields([nga.field('banner', 'choice').defaultValue(false).attributes({ placeholder: 'Tipo' }).choices([{ value: false, label: 'Texto' }, { value: true, label: 'Banner' }]).label('Tipo de Promoción'), nga.field('cover', 'template').label('Banner').template('<img src="57d072f3fbb500131180dc70"></img>'), nga.field('title').label('Título'), nga.field('subtitle', 'text').label('Subtítulo'), nga.field('description', 'text').label('Descripción'), nga.field('date_description', 'text').label('Descripción de fecha')]).title('Editar Promoción').actions(['<ma-list-button entry="entry" entity="entity" label="Lista"></ma-list-button>', '<ma-delete-button entry="entry" entity="entity" label="Borrar"></ma-delete-button>']);
	
	  Adverts.showView().fields([nga.field('banner').label('Tipo de Promoción').map(function (value) {
	    return value ? 'Banner' : 'Texto';
	  }), nga.field('cover', 'template').label('Imagen').template('<entity-image target="advert" view="show"></entity-image>'), nga.field('title').label('Título'), nga.field('description', 'text').label('Descripción'), nga.field('creation_date', 'date').label('Creado el día').format('dd/MM/yyyy'),
	
	  // nga.field('facebookPostId', 'template').label('Facebook')
	  // .template('<publish-facebook ng-if="!value"></publish-facebook><a ng-if="value" ng-href="https://www.facebook.com/{{value}}" target="_blank">https://www.facebook.com/{{value}}</a>'),
	
	  nga.field('facebookPostId', 'template').label('Facebook').template('<publish-facebook></publish-facebook>')]).title('Promociones');
	
	  Adverts.deletionView().fields(nga.field('title').label('Titulo')).actions(['<ma-list-button entry="entry" entity="entity" label="Lista"></ma-list-button>']).title('Borrar "{{ entry.values.title }}"');
	
	  return Adverts;
	};
	
	module.exports = exports['default'];

/***/ },
/* 66 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	exports['default'] = function (nga, admin) {
	
	  var userId = JSON.parse(localStorage.getItem('az_admin_user')).id;
	
	  // Los datos de este user para que cambie su información como usuario en el sistema
	  var Usuario = admin.getEntity('usuarios').url(function (entityName, viewType, identifierValue, identifierName) {
	    return 'usuarios/' + userId;
	  });
	
	  Usuario.editionView().fields([nga.field('username').isDetailLink(true).detailLinkRoute("show").label('Username'), nga.field('name', 'text').label('Nombre'), nga.field('email', 'text').label('Email'), nga.field('password', 'text').label('Contraseña')]).actions([]).title('Información de tu Usuario AZ');
	
	  return Usuario;
	};
	
	module.exports = exports['default'];

/***/ },
/* 67 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	exports['default'] = function (nga, admin) {
	
	  var Chatrooms = admin.getEntity('chatrooms');
	  var userId = JSON.parse(localStorage.getItem('az_admin_user')).id;
	
	  Chatrooms.listView().url(function () {
	    return 'usuarios/' + userId + "/chatrooms";
	  }).actions([]).sortField("last_activity").fields([nga.field('users', 'template').label('Desde user').template('<user></user>'), nga.field('type').label('Tipo').map(function (value) {
	    return (value = 'suggestion') ? 'Sugerencia' : 'Mensaje';
	  }), nga.field('last_activity', 'date').label('Ultima actividad').map(function (value) {
	    return moment(value).format('D [del] M [de] YYYY, h:mm a');
	  })]).listActions(['<messages></messages>', '<ma-delete-button entry="entry" entity="entity" entity-name="chatrooms" label="Ocultar chat" size="xs"></ma-delete-button>', '<add-client></add-client>']).title('Conversaciones');
	
	  Chatrooms.deletionView().fields(nga.field('name').label('Chat')).actions(['<ma-list-button entry="entry" entity="entity" label="Lista"></ma-list-button>']).title('¿Estás seguro de continuar?').description('Ésta acción eliminará el chat completo con todos sus mensajes, para vos y para el usuario con el que estás conversando (los usuarios de la aplicación sólamente pueden ver los mensajes de chat. Las sugerencias de locales permanecerán ocultas para ellos).');
	
	  return Chatrooms;
	};
	
	module.exports = exports['default'];

/***/ },
/* 68 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	exports['default'] = function (nga, admin) {
	
	  var Clients = admin.getEntity('clients');
	
	  var entityId = JSON.parse(localStorage.getItem('az_admin_user')).entityId;
	
	  Clients.listView().permanentFilters({
	    entityId: entityId,
	    include: 'usuario'
	  }).fields([nga.field('usuario').label('Nombre').map(function (value, entry) {
	    var name = '';
	    if (entry['usuario.name'] && entry['usuario.name'] != '') {
	      name = entry['usuario.name'];
	    } else if (entry['usuario.username'] && entry['usuario.username'] != '') {
	      name = entry['usuario.username'];
	    } else {
	      name = entry['usuario.email'];
	    }
	    return name;
	  }), nga.field('since', 'date').label('Desde el día').format('dd/MM/yyyy'), nga.field('chatroomId', 'template').label('Mandar Mensaje').template('<a class="btn btn-default btn-xs" value="{{value}}" href="#/rooms/{{value}}/chat"><span class="glyphicon glyphicon-pencil"></span>&nbsp;Escribir</a>')]).listActions(['<ma-delete-button size="xs" entry="entry" entity="entity" label="Borrar"></ma-delete-button>']).actions(['batch']).title('Clientes Favoritos');
	
	  Clients.deletionView().actions(['<ma-list-button entry="entry" entity="entity" label="Volver"></ma-list-button>']).title('Borrar cliente favorito? {{ entry.values.usuario.name }}');
	
	  return Clients;
	};
	
	module.exports = exports['default'];

/***/ },
/* 69 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	exports["default"] = function (nga, admin) {
	    return nga.dashboard().template("\n      <div class=\"wrapper\" style=\"text-align: center; padding: 20px;\">\n          <h1 style=\"text-align: center\">Bienvenido a tu administrador de AZ Club!</h1>\n          <div class=\"row\" style=\"overflow: hidden;\">\n              <div class=\"col-md-6 merquita\" style=\"position: relative;\">\n                  <h2>¿Como cargo por primera vez los datos de mi negocio ?</h2>\n                  <h4>En este video podras ver de manera muy sencilla como completar los datos de tu negocio para mostrarlos en tu perfil Premium y en tu propia pagina web AZ Club</h4>\n                  <div style=\"position: absolute; top: 200px; width: 100%; height: auto\">\n                      <iframe width=\"90%\" height=\"350\" src=\"https://www.youtube.com/embed/jwPO1SJnG-E?autoplay=0\">\n                      </iframe>\n                  </div>\n              </div>\n              <div class=\"col-md-6 merquita\" style=\"position: relative;\">\n                  <h2>¿Como crear promociones y destacados de mi negocio?</h2>\n                  <h4>Aquí encontraras como crear o subir banner con novedades para toda la comunidad de AZ Club y redes sociales.\n      ¿no tenes un diseñador para crear promociones ? NO IMPORTA! AZ Club lo hace por vos <strong>GRATIS</strong>.</h4>\n                  <div style=\"position: absolute; top: 200px; width: 100%; height: auto\">\n                      <iframe width=\"90%\" height=\"350\" src=\"https://www.youtube.com/embed/PqTu_pFbAOE?autoplay=0\">\n                      </iframe>\n                  </div>\n              </div>\n              <div class=\"col-md-6 merquita\"position: relative;\">\n                  <h2>¿Como elijo y personalizo mi propia pagina web ? ¿Y en la APP?</h2>\n                  <h4>Mira en este video lo facil que es cambiar las imagenes y fotos de tu trabajo, el logo de tu empresa o el diseño de tu pagina web. Recorda que podes cambiar todas la veces que quieras el formato de tu pagina web sin costos adicionales. Y tranquilo ! todo se replica automaticamente en la APP</h4>\n                  <div style=\"position: absolute; top: 200px; width: 100%; height: auto\">\n                      <iframe width=\"90%\" height=\"350\" src=\"https://www.youtube.com/embed/AqgayvBWxqo?autoplay=0\">\n                      </iframe>\n                  </div>\n              </div>\n              <div class=\"col-md-6 merquita\"position: relative;\">\n                  <h2>¿Como hago para que encuentren mi negocio por cercania?</h2>\n                  <h4>Este paso es tan importante como sensillo. Aqui podras ver como Geolocalizar tu local y permitir que los clientes te encuentren por cercania. Deberas introducir una direccion real, sin abreviaturas ni simbolos. MIRA!</h4>\n                  <div style=\"position: absolute; top: 200px; width: 100%; height: auto\">\n                      <iframe width=\"90%\" height=\"350\" src=\"https://www.youtube.com/embed/b_vFbP0QnHw?autoplay=0\">\n                      </iframe>\n                  </div>\n              </div>\n              <div class=\"col-md-6 merquita\"position: relative;\">\n                  <h2>¿Como usar la mensajeria ? ¿Que son los clientes favoritos?</h2>\n                  <h4>En este video podras ver como utilizar la mensajeria directa con tus clientes y proveedores, Selecciona tus clientes favoritos para poder destacarlos y listarlos, para luego poder enviar promociones especiales o tomar pedidos de confianza.\n      </h4>\n                  <div style=\"position: absolute; top: 200px; width: 100%; height: auto\">\n                      <iframe width=\"90%\" height=\"350\" src=\"https://www.youtube.com/embed/3R4vtNyz96M?autoplay=0\">\n                      </iframe>\n                  </div>\n              </div>\n              <div class=\"col-md-6 merquita\"position: relative;\">\n                  <h2>¿Como funciona AZ Club para mi negocio?</h2>\n                  <h4>Descubri las ventajas que AZ Club tiene para vos ! No te quedes afuera, el futuro nos espera\n      </h4>\n                  <div style=\"position: absolute; top: 200px; width: 100%; height: auto\">\n                      <iframe width=\"90%\" height=\"350\" src=\"https://www.youtube.com/embed/ZJ0e-Pe4kaM?autoplay=0\">\n                      </iframe>\n                  </div>\n              </div>\n\n          </div>\n      </div>\n      ");
	};
	
	module.exports = exports["default"];

/***/ },
/* 70 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	exports['default'] = function (nga, admin) {
	  return nga.menu().addChild(nga.menu().link('/usuarios/edit/' + JSON.parse(localStorage.getItem('az_admin_user')).userId).title('Usuario').icon('<img src="images/usuario-01.png" width="30"></img>')).addChild(nga.menu().title('Perfil').icon('<img src="images/perfil-01.png" width="30"></img>').addChild(nga.menu().link('/entities/edit/' + JSON.parse(localStorage.getItem('az_admin_user')).entityId).title('General').icon('')).addChild(nga.menu().link('/tags').title('Tags').icon('<span class="glyphicon glyphicon-tags"></span>')).addChild(nga.menu().link('/images').title('Imagenes').icon('<span class="glyphicon glyphicon-picture"></span>')).addChild(nga.menu().link('/hours').title('Información comercial').icon('<span class="glyphicon glyphicon-picture"></span>'))).addChild(nga.menu().link('/adverts/list').title('Publicaciones').icon('<img src="images/publicaciones-01.png" width="35"></img>')).addChild(nga.menu(admin.getEntity('chatrooms')).title('Mensajes').icon('<img src="images/mensajes-01.png" width="30"></img>')).addChild(nga.menu(admin.getEntity('clients')).title('Clientes favoritos').icon('<img src="images/clientesfav-01.png" width="30"></img>'));
	};
	
	module.exports = exports['default'];

/***/ },
/* 71 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }
/******/ ]);
//# sourceMappingURL=main.js.map