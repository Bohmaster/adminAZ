function requestInterceptor(RestangularProvider) {
  RestangularProvider.addFullRequestInterceptor(
    function(element, operation, what, url, headers, params, httpConfig) {

      if(what=="tags" && operation == 'get') {

        if(!params.filter) {
          params['filter'] = {};
        }

        params.filter['include'] = ["entities"];
      }

      return { params: params };
    });
}

function responseInterceptor(RestangularProvider) {
    RestangularProvider.addResponseInterceptor(function(data, operation, what, url, response) {
      if (operation == "get" && what=="tags") {
        data.hasEntities = [];
        for (var i = 0; i < data.entities.length; i++) {
          data.hasEntities.push(data.entities[i].id);
        }
      }
      return data;
    });
}

export default { requestInterceptor, responseInterceptor }
