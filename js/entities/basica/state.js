import template from './template.html';

export default function ($stateProvider) {
  $stateProvider.state('infoBasica', {
    parent: 'main',
    url: '/basica',
    params: { id: null },
    template: template,
    controller: 'infoBasicaController',
  });
};
