import template from './template.html';

export default function ($stateProvider) {
  $stateProvider.state('entityTags', {
    parent: 'main',
    url: '/tags',
    params: { id: null },
    template: template,
    controller: 'entityTagsController',
    data: {
      subscriptions: [
        'plata',
        'oro'
      ]
    }
  });
};
