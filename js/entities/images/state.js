import template from './template.html';

export default function ($stateProvider) {
  $stateProvider.state('entityImages', {
    parent: 'main',
    url: '/images',
    params: { id: null },
    template: template,
    controller: 'entityImagesController',
  });
};
