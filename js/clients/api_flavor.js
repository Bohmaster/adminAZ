function requestInterceptor(RestangularProvider) {
  RestangularProvider.addFullRequestInterceptor(
    function(element, operation, what, url, headers, params, httpConfig) {

      if(what=="clients" && operation=="get") {
        if(!params.filter) {
          params['filter'] = {};
        }
        params.filter['include'] = ["usuario"];
      }

      return { params: params };
    });
}

export default { requestInterceptor }
