import template from './template.html';

export default function ($stateProvider) {
  $stateProvider.state('advertDetail', {
    parent: 'main',
    url: '/adverts/create-adv',
    params: { id: null },
    template: template,
    controller: 'detailAdvertController',
    data: {
      subscriptions: [
        'plata',
        'oro'
      ],
      limited: true,
      limit_type: 'advert'
    }
  });
};
