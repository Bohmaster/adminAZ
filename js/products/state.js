import template from './template.html';

export default function ($stateProvider) {
  $stateProvider.state('productDetail', {
    parent: 'main',
    url: '/productDetail',
    params: { id: null },
    template: template,
    controller: 'detailProductController',
  });
};
