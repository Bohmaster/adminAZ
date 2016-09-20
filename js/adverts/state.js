import template from './template.html';

export default function ($stateProvider) {
  $stateProvider.state('advertDetail', {
    parent: 'main',
    url: '/advertDetail',
    params: { id: null },
    template: template,
    controller: 'detailAdvertController',
  });
};
