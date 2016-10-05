import template from './template.html';

export default function ($stateProvider) {
  $stateProvider.state('productDetail', {
    parent: 'main',
    url: '/products/create-prod',
    params: { id: null },
    template: template,
    controller: 'detailProductController',
  });
};
