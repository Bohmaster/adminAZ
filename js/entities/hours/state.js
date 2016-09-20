import template from './template.html';

export default function ($stateProvider) {
  $stateProvider.state('entityHours', {
    parent: 'main',
    url: '/hours',
    params: { id: null },
    template: template,
    controller: 'entityHoursController',
  });
};
