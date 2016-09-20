function requestInterceptor(RestangularProvider) {
  RestangularProvider.addFullRequestInterceptor(
    function(element, operation, what, url, headers, params, httpConfig) {

      if(what=="categories") {
        if(!params.filter) {
          params['filter'] = {};
        }

        params.filter['include'] = ["cities"];
      }

      return { params: params };
    });
}

function responseInterceptor(RestangularProvider) {
    RestangularProvider.addResponseInterceptor(function(data, operation, what, url, response) {
      if (operation == "get" && what=="categories") {
        data.belongsToCity = [];
        for (var i = 0; i < data.cities.length; i++) {
          data.belongsToCity.push(data.cities[i].id);
        }
      }
      return data;
    });
}

export default { requestInterceptor, responseInterceptor }
