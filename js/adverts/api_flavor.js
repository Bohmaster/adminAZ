function requestInterceptor(RestangularProvider) {
  RestangularProvider.addFullRequestInterceptor(
    function(element, operation, what, url, headers, params, httpConfig) {

      if(what=="adverts" && (operation=='get' || operation == 'getList') ) {

        if(!params.filter) {
          params['filter'] = {};
        }

        params.filter['include'] = ["city"];
      }

      return { params: params };
    });
}

export default { requestInterceptor }
